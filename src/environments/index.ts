import { environment as testEnvironment } from './environment.test'
import { environment as productionEnvironment } from './environment.prod'

const configuredApiUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
const isProductionEnvironment = import.meta.env.PROD || ['production', 'website-render', 'admin-render'].includes(import.meta.env.MODE)

export const environment = configuredApiUrl
	? { production: isProductionEnvironment, apiURL: configuredApiUrl }
	: isProductionEnvironment
		? productionEnvironment
		: testEnvironment
