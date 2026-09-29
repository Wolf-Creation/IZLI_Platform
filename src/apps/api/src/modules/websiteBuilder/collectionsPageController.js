import { GlobalSetting } from '../admin/model.js';
import { successResponse } from '../../utils/apiResponse.js';
import { AppError } from '../../utils/AppError.js';
import { COLLECTIONS_PAGE_CONFIG_KEY, DEFAULT_COLLECTIONS_PAGE_CONFIG, normalizeCollectionsPageConfig } from './collectionsPageConfig.js';

export const collectionsPageController = {
  get: async (_request, response) => {
    const setting = await GlobalSetting.findOne({ key: COLLECTIONS_PAGE_CONFIG_KEY }).lean();
    const data = normalizeCollectionsPageConfig(setting?.value ?? DEFAULT_COLLECTIONS_PAGE_CONFIG);
    return response.status(200).json(successResponse('Collections page configuration retrieved', data));
  },

  save: async (request, response) => {
    const config = normalizeCollectionsPageConfig(request.body);
    if (!config.title || !config.sectionTitle || config.descriptions.some(line => !line)) {
      throw new AppError('Page title, section title, and description lines are required', 400);
    }
    const setting = await GlobalSetting.findOneAndUpdate(
      { key: COLLECTIONS_PAGE_CONFIG_KEY },
      {
        $set: {
          value: config,
          group: 'website-builder',
          description: 'Collections index page content and section display configuration',
          updatedBy: request.user?.sub,
        },
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    ).lean();
    return response.status(200).json(successResponse('Collections page configuration saved', setting.value));
  },
};