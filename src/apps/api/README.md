# IZLI API

Backend Node.js + Express.js for the IZLI platform.

## Structure

- `src/app.js` - application entry point
- `src/config/` - environment, database, cloudinary, cors configuration
- `src/middlewares/` - auth, role, error, upload middlewares
- `src/modules/` - feature modules with controller/service/repository/model/routes/validator/index
- `src/routes/` - route composition
- `src/utils/` - shared backend utilities
