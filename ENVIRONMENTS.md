# Environnements IZLI

## Local

L'API locale tourne sur `http://localhost:5000`.

- Website avec API locale : `pnpm dev:website` puis `http://localhost:8443`
- Admin avec API locale : `pnpm dev:admin` puis `http://localhost:8444`
- Website avec API Render : `pnpm dev:website:render` puis `http://localhost:8445`
- Admin avec API Render : `pnpm dev:admin:render` puis `http://localhost:8446`

Les fichiers `.env.website.local` et `.env.admin.local` utilisent `/api`, proxifie vers `http://localhost:5000`.
Les fichiers `.env.website-render.local` et `.env.admin-render.local` utilisent directement l'API Render.
Ces fichiers locaux sont ignores par Git.

## Render

Le fichier `render.yaml` definit trois services :

- `izli-api` : API Express, actuellement accessible via `https://izli-platform.onrender.com`
- `izli-website` : frontend public, build avec `pnpm build:website`
- `izli-admin` : frontend Admin, build avec `pnpm build:admin`

Variables frontend :

- `VITE_API_BASE_URL=https://izli-platform.onrender.com/api`

Variables privees API a saisir dans Render :

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- variables Cloudinary si necessaires
- `CLIENT_URLS=https://www.izli.tn`
- `QR_BASE_URL=https://www.izli.tn/p/`

Les noms de domaines dans `render.yaml` sont des valeurs par defaut. Si Render attribue d'autres URLs, mettre a jour `VITE_API_BASE_URL` dans les deux services frontend et `CLIENT_URLS` dans le service API.
