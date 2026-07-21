type ID = string

export interface IQREngine {
  generateQR(passportId: ID, productId: ID): Promise<{ qrDataUrl: string; qrCode: string; landingUrl: string }>
  getPassport(id: ID): Promise<{ id: ID; productId: ID; qrCode: string; scanCount: number; status: string } | null>
  listPassports(filters?: { status?: string }): Promise<Array<{ id: ID; productId: ID; scanCount: number }>>
  recordScan(passportId: ID, context?: { device?: string; location?: string; referrer?: string }): Promise<{ scanId: ID; scanCount: number }>
  getAnalytics(passportId: ID): Promise<{ totalScans: number; uniqueScanners: number; topLocations: string[] }>
}

class QREngineImpl implements IQREngine {
  async generateQR(passportId: ID, productId: ID) {
    const code = `IZLI-${passportId}-${productId}`.toUpperCase()
    return {
      qrDataUrl: `data:image/png;base64,mockQRDataFor${passportId}`,
      qrCode: code,
      landingUrl: `https://izli.co/p/${productId}?passport=${passportId}`,
    }
  }

  async getPassport(id: ID) {
    return { id, productId: 'prod-1', qrCode: `IZLI-${id}`.toUpperCase(), scanCount: 14, status: 'active' }
  }

  async listPassports(_filters?: { status?: string }) {
    return [
      { id: 'passport-1', productId: 'prod-1', scanCount: 14 },
      { id: 'passport-2', productId: 'prod-2', scanCount: 7 },
    ]
  }

  async recordScan(_passportId: ID, _context?: { device?: string; location?: string; referrer?: string }) {
    return { scanId: `scan-${Date.now()}`, scanCount: 15 }
  }

  async getAnalytics(_passportId: ID) {
    return { totalScans: 14, uniqueScanners: 11, topLocations: ['Paris', 'London', 'New York'] }
  }
}

export const QREngine: IQREngine = new QREngineImpl()
