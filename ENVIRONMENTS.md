# Environnements IZLI

La configuration frontend se trouve dans `src/environments` :

- `environment.test.ts` utilise l'API locale `http://localhost:5000/api`.
- `environment.prod.ts` utilise l'API Render `https://izli-platform.onrender.com/api`.
- `index.ts` sélectionne automatiquement la configuration de production lorsque Vite est lancé avec `--mode production`.

## Local

L'API locale tourne sur `http://localhost:5000`.

- Website avec API locale : `pnpm dev:website` puis `http://localhost:8443`
- Admin avec API locale : `pnpm dev:admin` puis `http://localhost:8444`
- Website avec API Render : `pnpm dev:website:render` puis `http://localhost:8445`
- Admin avec API Render : `pnpm dev:admin:render` puis `http://localhost:8446`

Le proxy Vite pointe vers `http://localhost:5000` en mode test.

## Render

Le fichier `render.yaml` definit trois services :

- `izli-api` : API Express, actuellement accessible via `https://izli-platform.onrender.com`
- `izli-website` : frontend public, build avec `pnpm build:website`
- `izli-admin` : frontend Admin, build avec `pnpm build:admin`

Variables privees API a saisir dans Render :

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- variables Cloudinary si necessaires
- `CLIENT_URLS=https://www.izli.tn`
- `QR_BASE_URL=https://www.izli.tn/p/`

Les noms de domaines dans `render.yaml` sont des valeurs par defaut. Si Render attribue une autre URL a l'API, mettre a jour `apiURL` dans `src/environments/environment.prod.ts` et `CLIENT_URLS` dans le service API.
