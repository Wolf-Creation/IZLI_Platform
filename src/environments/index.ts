import { environment as testEnvironment } from './environment.test'
import { environment as productionEnvironment } from './environment.prod'

export const environment = import.meta.env.MODE === 'production' ? productionEnvironment : testEnvironment
