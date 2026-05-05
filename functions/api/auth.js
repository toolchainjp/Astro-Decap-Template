export async function onRequestGet({ request, env }) {
  const clientId = env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response('Missing GITHUB_CLIENT_ID environment variable', { status: 500 });
  }

  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
    state,
  });

  const response = Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
    302
  );

  // Store state in a short-lived cookie for CSRF validation in the callback
  const headers = new Headers(response.headers);
  headers.set(
    'Set-Cookie',
    `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`
  );

  return new Response(null, { status: 302, headers });
}
