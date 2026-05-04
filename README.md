# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## CMS (Decap CMS)

This project uses [Decap CMS](https://decapcms.org/) for content management, backed by GitHub and deployed on Cloudflare Pages.

The CMS admin panel is available at `/admin/index.html`.

### Local Development

Run the Decap local proxy and the Astro dev server in two separate terminals:

```sh
# Terminal 1 — start the Decap local backend proxy
npx decap-server

# Terminal 2 — start the Astro dev server
npm run dev
```

Then enable the local backend in `public/admin/config.yml` by adding this line at the top:

```yaml
local_backend: true
```

Open `http://localhost:4321/admin/index.html` in your browser. Content edits will write files directly to `src/content/blog/` on disk — no GitHub auth required.

> **Important:** Remove `local_backend: true` before deploying to production.

### Production (Cloudflare Pages)

#### 1. Connect the repo

In the [Cloudflare Pages dashboard](https://dash.cloudflare.com/), create a new project and connect your GitHub repository.

Use these build settings:

| Setting          | Value         |
| :--------------- | :------------ |
| Build command    | `npm run build` |
| Output directory | `dist`        |

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

Decap CMS requires an OAuth proxy for GitHub authentication. Deploy the [`decap-cms-github-oauth-provider`](https://github.com/vencax/netlify-cms-github-oauth-provider) (or equivalent) as a Cloudflare Worker, then set its URL as `base_url` in `config.yml`.

Steps:
1. Register a [GitHub OAuth App](https://github.com/settings/developers)
   - Homepage URL: your Cloudflare Pages URL
   - Callback URL: `https://your-oauth-proxy.example.com/callback`
2. Deploy the OAuth proxy worker with your GitHub App credentials
3. Set `base_url` in `config.yml` to the worker URL

#### 4. Deploy

Push to the `main` branch — Cloudflare Pages will build and deploy automatically. The CMS will be live at `https://your-site.pages.dev/admin/index.html`.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
