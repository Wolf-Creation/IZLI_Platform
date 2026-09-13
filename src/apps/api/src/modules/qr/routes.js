import { Router } from 'express';
import { qrController } from './controller.js';

export const qrRouter = Router();

qrRouter.get('/series', qrController.listSeries);
qrRouter.get('/codes', qrController.listQrs);
qrRouter.post('/series', qrController.generate);
qrRouter.delete('/series/:seriesId', qrController.deleteSeries);
qrRouter.post('/assign', qrController.assign);
qrRouter.patch('/codes/:qrNumber/assignment', qrController.updateAssignment);
qrRouter.get('/public/:qrNumber', qrController.publicDetails);
