# IZLI API

Backend Node.js + Express.js for the IZLI platform.

## Structure

- `src/app.js` - application entry point
- `src/config/` - environment, database, cloudinary, cors configuration
- `src/middlewares/` - auth, role, error, upload middlewares
- `src/modules/` - feature modules with controller/service/repository/model/routes/validator/index
- `src/routes/` - route composition
- `src/utils/` - shared backend utilities

## Collections

The four official collection documents are stored in the single MongoDB `collections` collection. Synchronize them safely with:

```sh
npm run seed:collections
```

The seed upserts by slug, preserves administrator-assigned cover and hero images, and migrates legacy seasonal collection references to the official collection documents.

Public endpoints:

- `GET /api/collections`
- `GET /api/collections/:slug` (includes published products)

Staff endpoints (owner, admin, or editor token required):

- `GET /api/admin/collections`
- `POST /api/admin/collections`
- `PUT /api/admin/collections/:id`
- `DELETE /api/admin/collections/:id`

Collection image uploads use the existing Cloudinary uploader at `POST /api/uploads/collections` and require staff access.
