# Environnements IZLI

## Local

L'API locale tourne sur `http://localhost:5000`.

- Website : `pnpm dev:website` puis `http://localhost:8443`
- Admin : `pnpm dev:admin` puis `http://localhost:8444`

Les fichiers `.env.website.local` et `.env.admin.local` configurent les deux profils. Ils sont ignores par Git.

## Render

Le fichier `render.yaml` definit trois services :

- `izli-api` : API Express
- `izli-website` : frontend public, build avec `pnpm build:website`
- `izli-admin` : frontend Admin, build avec `pnpm build:admin`

Variables frontend :

- `VITE_API_BASE_URL=https://izli-api.onrender.com/api`

Variables privees API a saisir dans Render :

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- variables Cloudinary si necessaires
- `CLIENT_URLS=https://izli-website.onrender.com,https://izli-admin.onrender.com`

Les noms de domaines dans `render.yaml` sont des valeurs par defaut. Si Render attribue d'autres URLs, mettre a jour `VITE_API_BASE_URL` dans les deux services frontend et `CLIENT_URLS` dans le service API.
