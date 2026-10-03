import { successResponse } from '../../utils/apiResponse.js';
import { getShippingSettings, saveShippingSettings } from './service.js';

export async function readShippingSettings(_request, response) {
  const settings = await getShippingSettings();
  return response.json(successResponse('Shipping settings retrieved successfully.', settings));
}

export async function updateShippingSettings(request, response) {
  const settings = await saveShippingSettings(request.body, request.user?.userId);
  return response.json(successResponse('Shipping settings saved successfully.', settings));
}
