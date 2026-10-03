import { GlobalSetting } from '../admin/model.js';
import { successResponse } from '../../utils/apiResponse.js';
import { HOME_PAGE_CONFIG_KEY, DEFAULT_HOME_PAGE_CONFIG, normalizeHomePageConfig } from './homePageConfig.js';

export const homePageController = {
  get: async (_request, response) => {
    const setting = await GlobalSetting.findOne({ key: HOME_PAGE_CONFIG_KEY }).lean();
    const data = normalizeHomePageConfig(setting?.value ?? DEFAULT_HOME_PAGE_CONFIG);
    return response.status(200).json(successResponse('Home page configuration retrieved', data));
  },

  save: async (request, response) => {
    const config = normalizeHomePageConfig(request.body);
    const setting = await GlobalSetting.findOneAndUpdate(
      { key: HOME_PAGE_CONFIG_KEY },
      {
        $set: {
          value: config,
          group: 'website-builder',
          description: 'Home page section order, visibility, and content',
          updatedBy: request.user?.sub,
        },
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    ).lean();
    return response.status(200).json(successResponse('Home page configuration saved', setting.value));
  },
};