import { asyncHandler } from '../../utils/asyncHandler.js';
import { successResponse } from '../../utils/apiResponse.js';
import { assignQr, deleteSeries, generateSeries, getPublicQr, listQrs, listSeries } from './service.js';

export const qrController = {
  listSeries: asyncHandler(async (request, response) => {
    const series = await listSeries();
    return response.status(200).json(successResponse('QR series retrieved successfully', series));
  }),

  listQrs: asyncHandler(async (request, response) => {
    const qrs = await listQrs(request.query);
    return response.status(200).json(successResponse('QR codes retrieved successfully', qrs));
  }),

  generate: asyncHandler(async (request, response) => {
    const result = await generateSeries(request.body);
    return response.status(201).json(successResponse('QR series generated successfully', result));
  }),

  deleteSeries: asyncHandler(async (request, response) => {
    const result = await deleteSeries(request.params.seriesId);
    return response.status(200).json(successResponse('QR series deleted successfully', result));
  }),

  assign: asyncHandler(async (request, response) => {
    const qr = await assignQr({ ...request.body, changedBy: request.body.changedBy || 'admin' });
    return response.status(200).json(successResponse('QR code assigned successfully', qr));
  }),

  updateAssignment: asyncHandler(async (request, response) => {
    const qr = await assignQr({ ...request.body, qrNumber: request.params.qrNumber, allowUpdate: true, changedBy: request.body.changedBy || 'admin' });
    return response.status(200).json(successResponse('QR assignment updated successfully', qr));
  }),

  publicDetails: asyncHandler(async (request, response) => {
    const qr = await getPublicQr(request.params.qrNumber);
    return response.status(200).json(successResponse('QR details retrieved successfully', qr));
  }),
};
