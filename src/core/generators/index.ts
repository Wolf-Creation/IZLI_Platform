type ID = string

export interface IProductIdentifierGenerator {
  generate(productId: ID): string
}

export interface IQRGenerator {
  generate(passportId: ID, landingUrl: string): { svgData: string; code: string }
}

export interface IReferralGenerator {
  generate(keeperId: ID, keeperName: string): string
}

export interface IBadgeGenerator {
  generate(badgeType: string, keeperName: string): { svgData: string; label: string }
}

export interface IPassportGenerator {
  generate(productId: ID, productName: string): { passportId: ID; identifier: string; qrCode: string }
}

class ProductIdentifierGeneratorImpl implements IProductIdentifierGenerator {
  generate(productId: ID): string {
    const year = new Date().getFullYear()
    const seq = parseInt(productId.replace(/\D/g, '').slice(-6) || '1', 10)
    return `IZLI-${year}-${seq.toString().padStart(6, '0')}`
  }
}

class QRGeneratorImpl implements IQRGenerator {
  generate(passportId: ID, _landingUrl: string) {
    return {
      svgData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="white"/><text x="50" y="55" textAnchor="middle" fontSize="8" fill="#1E2F44">QR:${passportId}</text></svg>`,
      code: `IZLI-QR-${passportId.toUpperCase()}`,
    }
  }
}

class ReferralGeneratorImpl implements IReferralGenerator {
  generate(keeperId: ID, keeperName: string): string {
    const namePart = keeperName.split(' ')[0].toUpperCase().slice(0, 3)
    const suffix = keeperId.slice(-3).toUpperCase()
    return `IZLI-${namePart}-${suffix}`
  }
}

class BadgeGeneratorImpl implements IBadgeGenerator {
  generate(badgeType: string, _keeperName: string) {
    return {
      svgData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#1E2F44"/><text x="50" y="55" textAnchor="middle" fontSize="24" fill="#E7DFD2">◈</text></svg>`,
      label: badgeType,
    }
  }
}

class PassportGeneratorImpl implements IPassportGenerator {
  generate(productId: ID, _productName: string) {
    const year = new Date().getFullYear()
    const seq = Math.floor(Math.random() * 999999).toString().padStart(6, '0')
    const identifier = `IZLI-${year}-${seq}`
    return {
      passportId: `PASS-${productId}`,
      identifier,
      qrCode: `IZLI-QR-${identifier}`,
    }
  }
}

export const ProductIdentifierGenerator: IProductIdentifierGenerator = new ProductIdentifierGeneratorImpl()
export const QRGenerator: IQRGenerator = new QRGeneratorImpl()
export const ReferralGenerator: IReferralGenerator = new ReferralGeneratorImpl()
export const BadgeGenerator: IBadgeGenerator = new BadgeGeneratorImpl()
export const PassportGenerator: IPassportGenerator = new PassportGeneratorImpl()
