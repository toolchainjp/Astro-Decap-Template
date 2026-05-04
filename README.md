# Astro + Decap CMS + Cloudflare Pages Template

A blog template built with [Astro](https://astro.build), managed via [Decap CMS](https://decapcms.org/), and deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Project Structure

```text
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

Decap CMS requires an OAuth proxy for GitHub authentication. Deploy the [`decap-cms-github-oauth-provider`](https://github.com/vencax/netlify-cms-github-oauth-provider) as a Cloudflare Worker, then set its URL as `base_url` in `config.yml`.

Steps:
1. Register a [GitHub OAuth App](https://github.com/settings/developers)
   - Homepage URL: your Cloudflare Pages URL
   - Callback URL: `https://your-oauth-proxy.example.com/callback`
2. Deploy the OAuth proxy worker with your GitHub App credentials
3. Set `base_url` in `config.yml` to the worker URL

#### 4. Deploy

Push to the `main` branch — Cloudflare Pages will build and deploy automatically.

The CMS will be live at `https://your-site.pages.dev/admin/index.html`.
