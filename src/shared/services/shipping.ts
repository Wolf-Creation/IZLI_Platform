import { api } from './api'

export interface ShippingSettings {
  carrierName: string
  deliveryFee: number
  currency: string
  configured: boolean
}

export function getShippingSettings() {
  return api.get<ShippingSettings>('/shipping/settings')
}

export function updateShippingSettings(settings: Pick<ShippingSettings, 'carrierName' | 'deliveryFee' | 'currency'>) {
  return api.put<ShippingSettings>('/shipping/settings', settings)
}
