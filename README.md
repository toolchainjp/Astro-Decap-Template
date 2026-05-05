# Astro + Decap CMS + Cloudflare Pages Template

A blog template built with [Astro](https://astro.build), managed via [Decap CMS](https://decapcms.org/), and deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Project Structure

```text
├── functions/
│   └── api/
│       ├── auth.js      # GitHub OAuth initiation (Cloudflare Pages Function)
│       └── callback.js  # GitHub OAuth callback (Cloudflare Pages Function)
├── public/
│   ├── admin/
│   │   ├── config.yml   # Decap CMS configuration
│   │   └── index.html   # CMS admin entry point
│   └── uploads/         # Media uploaded via CMS
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   └── blog/        # Markdown blog posts
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Commands

All commands are run from the project root:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Install dependencies                        |
| `npm run dev`   | Start Astro dev server at `localhost:4321`  |
| `npm run cms`   | Start Decap local proxy at `localhost:8081` |
| `npm run build` | Build production site to `./dist/`          |
| `npm run preview` | Preview production build locally          |

## CMS (Decap CMS)

The CMS admin panel is available at `/admin/index.html`.

### Local Development

Run both servers in separate terminals:

```sh
# Terminal 1 — Decap local backend proxy
npm run cms

# Terminal 2 — Astro dev server
npm run dev
```

Then uncomment `local_backend: true` at the top of `public/admin/config.yml`:

```yaml
# Uncomment for local development, comment out before deploying to production
local_backend: true
```

Open `http://localhost:4321/admin/index.html` and click **"Use Local Backend"** on the login screen.

Content edits write files directly to `src/content/blog/` on disk — no GitHub auth required.

> **Important:** Comment out `local_backend: true` before deploying to production.

### Production (Cloudflare Pages)

#### 1. Connect the repo

In the [Cloudflare Pages dashboard](https://dash.cloudflare.com/), create a new project and connect your GitHub repository.

Build settings:

| Setting          | Value           |
| :--------------- | :-------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |

#### 2. Configure the CMS backend

Update `public/admin/config.yml` with your actual values:

```yaml
backend:
  name: github
  repo: your-github-username/your-repo-name
  branch: main
  base_url: https://your-oauth-proxy.example.com
```

#### 3. Set up GitHub OAuth

GitHub OAuth is handled by built-in Cloudflare Pages Functions at `functions/api/auth.js` and `functions/api/callback.js`. No external OAuth proxy is needed.

**Register a GitHub OAuth App** at [github.com/settings/developers](https://github.com/settings/developers):

| Field | Value |
| :---- | :---- |
| Homepage URL | `https://your-site.pages.dev` |
| Authorization callback URL | `https://your-site.pages.dev/api/callback` |

**Add environment variables** in the Cloudflare Pages dashboard under **Settings > Environment variables**:

| Variable | Value |
| :------------------- | :--------------------------------- |
| `GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth App Client Secret |

**Update `base_url`** in `public/admin/config.yml` to your Cloudflare Pages URL:

```yaml
backend:
  name: github
  repo: your-github-username/your-repo-name
  branch: main
  base_url: https://your-site.pages.dev
```

#### 4. Deploy

Push to the `main` branch — Cloudflare Pages will build and deploy automatically.

The CMS will be live at `https://your-site.pages.dev/admin/index.html`.
