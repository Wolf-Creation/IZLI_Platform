import { Counter, QRCode, QRCodeSeries, QRAssignmentHistory } from './model.js';
import { Product } from '../products/model.js';
import crypto from 'node:crypto';
import { env } from '../../config/env.js';

const QR_BASE_URL = process.env.QR_BASE_URL || 'https://izli.tn/p/';
const QR_URL_SECRET = process.env.QR_URL_SECRET || env.jwtSecret;

function encryptionKey() {
  if (!QR_URL_SECRET) throw new Error('QR_URL_SECRET or JWT_SECRET must be configured');
  return crypto.createHash('sha256').update(QR_URL_SECRET).digest();
}

export function encryptQrPath(serialNumber) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(serialNumber, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), encrypted].map(value => value.toString('base64url')).join('.');
}

function decryptQrPath(token) {
  try {
    const [ivValue, tagValue, encryptedValue] = String(token).split('.');
    if (!ivValue || !tagValue || !encryptedValue) return null;
    const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey(), Buffer.from(ivValue, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagValue, 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(encryptedValue, 'base64url')), decipher.final()]).toString('utf8');
  } catch {
    return null;
  }
}

export function formatQrNumber(sequenceNumber) {
  return `IZLI-${String(sequenceNumber).padStart(6, '0')}`;
}

export function generateSerialNumber({ qrNumber, productId, releaseNumber, releaseProductNumber, size, colorCode }) {
  return ['IZLI', productId, `R${releaseNumber}`, `P${releaseProductNumber}`, size, colorCode].map(value => String(value).trim().toUpperCase()).join('-');
}

function normalizeQrNumber(value) {
  const rawValue = String(value || '').trim();
  const candidate = rawValue.split('/').filter(Boolean).pop() || rawValue;
  return candidate.toUpperCase();
}

async function reserveSequence(quantity) {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'qrCode' },
    { $inc: { sequence: quantity } },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  );
  const endSequence = counter.sequence;
  return { startSequence: endSequence - quantity + 1, endSequence };
}

export async function generateSeries({ quantity, name, createdBy, format = 'svg' }) {
  const requestedQuantity = Number(quantity);
  if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1 || requestedQuantity > 5000) {
    const error = new Error('Quantity must be an integer between 1 and 5000');
    error.statusCode = 400;
    throw error;
  }

  const { startSequence, endSequence } = await reserveSequence(requestedQuantity);
  const startQrNumber = formatQrNumber(startSequence);
  const endQrNumber = formatQrNumber(endSequence);
  const series = await QRCodeSeries.create({ name: name || `Series ${startSequence}-${endSequence}`, startSequence, endSequence, startQrNumber, endQrNumber, quantity: requestedQuantity, format, createdBy: createdBy || 'admin' });
  const qrDocuments = Array.from({ length: requestedQuantity }, (_, index) => {
    const sequenceNumber = startSequence + index;
    const qrNumber = formatQrNumber(sequenceNumber);
    return { qrNumber, sequenceNumber, seriesId: series._id, url: `${QR_BASE_URL}${qrNumber}`, status: 'unassigned' };
  });

  try {
    await QRCode.insertMany(qrDocuments, { ordered: true });
  } catch (error) {
    await QRCodeSeries.findByIdAndDelete(series._id);
    throw error;
  }

  return { series: { ...series.toObject(), id: String(series._id) }, codes: qrDocuments };
}

async function getProductOrThrow(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
}

function validateSize(product, size) {
  if (!size) return;
  if (Array.isArray(product.sizes) && product.sizes.length > 0 && !product.sizes.some(item => item.size === size)) {
    const error = new Error('Invalid product size');
    error.statusCode = 400;
    throw error;
  }
}

function validateAssignment(product, { size, color, colorCode, releaseNumber, releaseProductNumber }) {
  if (!size || !color || !colorCode || !releaseNumber || !releaseProductNumber) {
    const error = new Error('Size, color, color code, release number and release product number are required');
    error.statusCode = 400;
    throw error;
  }
  validateSize(product, size);
  if (!product.releaseNumber || String(product.releaseNumber) !== String(releaseNumber)) {
    const error = new Error('Release number does not match the product release');
    error.statusCode = 400;
    throw error;
  }
  if (!/^\d+$/.test(String(releaseProductNumber))) {
    const error = new Error('Invalid product number in release');
    error.statusCode = 400;
    throw error;
  }
}

export async function assignQr({ qrNumber, productId, size, color, colorCode, releaseId, releaseNumber, releaseProductNumber, changedBy, allowUpdate = false }) {
  if (!qrNumber || !productId) {
    const error = new Error('QR number and product are required');
    error.statusCode = 400;
    throw error;
  }
  const decryptedSerial = decryptQrPath(String(qrNumber));
  const normalizedQrNumber = normalizeQrNumber(decryptedSerial || qrNumber);
  const qr = await QRCode.findOne(decryptedSerial ? { serialNumber: normalizedQrNumber } : { qrNumber: normalizedQrNumber });
  if (!qr) {
    const error = new Error('QR code not found');
    error.statusCode = 404;
    throw error;
  }
  if (qr.status !== 'unassigned' && !allowUpdate) {
    const error = new Error('QR code is already assigned');
    error.statusCode = 409;
    throw error;
  }

  const product = await getProductOrThrow(productId);
  validateAssignment(product, { size, color, colorCode, releaseNumber, releaseProductNumber });
  const productCode = product.sku || product.name;
  const serialNumber = generateSerialNumber({ qrNumber: qr.qrNumber, productId: productCode, releaseNumber, releaseProductNumber, size, colorCode });
  const duplicate = await QRCode.findOne({ serialNumber, _id: { $ne: qr._id } });
  if (duplicate) {
    const error = new Error('Serial number already exists');
    error.statusCode = 409;
    throw error;
  }

  const previous = qr.toObject();
  qr.status = 'assigned';
  qr.productId = product._id;
  qr.productCode = productCode;
  qr.size = size || null;
  qr.color = color || null;
  qr.colorCode = colorCode || null;
  qr.releaseId = releaseId || product._id;
  qr.releaseNumber = releaseNumber || null;
  qr.releaseProductNumber = releaseProductNumber || null;
  qr.serialNumber = serialNumber;
  qr.url = `${QR_BASE_URL}${encryptQrPath(serialNumber)}`;
  qr.assignedAt = new Date();
  qr.assignedBy = changedBy || 'admin';
  await qr.save();
  await QRAssignmentHistory.create({
    qrId: qr._id,
    previousProductId: previous.productId,
    newProductId: qr.productId,
    previousSize: previous.size,
    newSize: qr.size,
    previousColor: previous.color,
    newColor: qr.color,
    previousReleaseId: previous.releaseId,
    newReleaseId: qr.releaseId,
    action: allowUpdate ? 'updated' : 'assigned',
    changedBy: changedBy || 'admin',
  });
  return qr;
}

export async function listSeries() {
  const series = await QRCodeSeries.find().sort({ createdAt: -1 }).lean();
  const stats = await QRCode.aggregate([
    { $group: { _id: '$seriesId', totalCount: { $sum: 1 }, blankCount: { $sum: { $cond: [{ $eq: ['$status', 'unassigned'] }, 1, 0] } }, usedCount: { $sum: { $cond: [{ $ne: ['$status', 'unassigned'] }, 1, 0] } } } },
  ]);
  const statsBySeries = new Map(stats.map(item => [String(item._id), item]));
  return series.map(item => ({ ...item, id: String(item._id), ...(statsBySeries.get(String(item._id)) || { totalCount: 0, blankCount: 0, usedCount: 0 }) }));
}

export async function deleteSeries(seriesId) {
  const series = await QRCodeSeries.findById(seriesId);
  if (!series) {
    const error = new Error('QR series not found');
    error.statusCode = 404;
    throw error;
  }

  const assignedCount = await QRCode.countDocuments({ seriesId: series._id, status: { $ne: 'unassigned' } });
  if (assignedCount > 0) {
    const error = new Error('Cannot delete a series containing assigned QR codes');
    error.statusCode = 409;
    throw error;
  }

  await QRCode.deleteMany({ seriesId: series._id });
  await QRCodeSeries.deleteOne({ _id: series._id });
  return { id: String(series._id) };
}

export async function listQrs(query = {}) {
  const filter = {};
  for (const key of ['status', 'productId', 'releaseId', 'size', 'color', 'seriesId']) if (query[key]) filter[key] = query[key];
  if (query.search) filter.$or = [{ qrNumber: new RegExp(String(query.search), 'i') }, { serialNumber: new RegExp(String(query.search), 'i') }];
  return QRCode.find(filter).sort({ sequenceNumber: 1 }).populate('productId', 'name sku').lean();
}

export async function getPublicQr(qrNumber) {
  const rawValue = String(qrNumber || '').trim();
  const decryptedSerial = decryptQrPath(rawValue);
  const normalizedValue = normalizeQrNumber(decryptedSerial || rawValue);
  const query = decryptedSerial
    ? { serialNumber: normalizedValue }
    : { qrNumber: normalizedValue };
  const qr = await QRCode.findOne(query).populate('productId').lean();
  if (!qr) {
    const error = new Error('QR code not found');
    error.statusCode = 404;
    throw error;
  }
  return qr;
}
