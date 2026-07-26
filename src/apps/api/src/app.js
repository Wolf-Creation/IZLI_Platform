import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './config/cors.js';
import { connectDatabase } from './config/database.js';
import { notFoundMiddleware, errorMiddleware } from './middlewares/error.middleware.js';
import { apiRouter } from './routes/index.js';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/health', (_request, response) => {
  response.status(200).json({
    success: true,
    message: 'IZLI API is running',
    data: { status: 'ok' },
  });
});

app.use('/api', apiRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = Number(process.env.PORT || 5000);

const startServer = async () => {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`IZLI API listening on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start IZLI API:', error);
  process.exit(1);
});
