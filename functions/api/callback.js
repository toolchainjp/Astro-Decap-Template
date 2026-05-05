export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const errorParam = url.searchParams.get('error');

  if (errorParam) {
    return oauthErrorPage(errorParam);
  }

  if (!code || !state) {
    return oauthErrorPage('Missing code or state parameter');
  }

  // Validate state to prevent CSRF
  const cookies = parseCookies(request.headers.get('Cookie') || '');
  const expectedState = cookies['oauth_state'];

  if (!expectedState || expectedState !== state) {
    return oauthErrorPage('Invalid state parameter');
  }

  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return oauthErrorPage('OAuth is not configured on the server');
  }

  // Exchange code for access token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  if (!tokenResponse.ok) {
    return oauthErrorPage('Failed to reach GitHub token endpoint');
  }

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return oauthErrorPage(tokenData.error_description || tokenData.error);
  }

  if (!tokenData.access_token) {
    return oauthErrorPage('No access token returned from GitHub');
  }

  return oauthSuccessPage(tokenData.access_token);
}

function oauthSuccessPage(token) {
  const payload = JSON.stringify({ token, provider: 'github' });
  return htmlPage(`
    <p>Authorizing, please wait...</p>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${escapeForJs(payload)}',
            e.origin
          );
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  `);
}

function oauthErrorPage(message) {
  const payload = JSON.stringify({ message });
  return htmlPage(`
    <p>Authorization failed: ${escapeHtml(message)}</p>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:error:${escapeForJs(payload)}',
            e.origin
          );
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  `);
}

function htmlPage(body) {
  return new Response(
    `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${body}</body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

function parseCookies(cookieHeader) {
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [key, ...rest] = c.trim().split('=');
      return [key, rest.join('=')];
    })
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeForJs(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
