import mongoose from 'mongoose';

const productSizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  availability: { type: String, enum: ['available', 'low', 'sold-out'], default: 'available' },
  stock: { type: Number, default: 0, min: 0 },
  colorStocks: { type: Map, of: Number, default: {} },
}, { _id: false });

const productColorwaySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  colorCode: { type: String, required: true, uppercase: true, trim: true },
  hex: { type: String, default: '#D8D0C4' },
  images: [{ type: String, default: [] }],
  sizeStocks: { type: Map, of: Number, default: {} },
}, { _id: false });

const productVariantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sku: { type: String, required: true },
  colorName: { type: String, required: true },
  colorCode: { type: String, required: true, uppercase: true, trim: true },
  size: { type: String, required: true },
  hex: { type: String, required: true },
  image: { type: String, default: '' },
}, { _id: false });

const inventoryPieceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  variantId: { type: String, required: true },
  status: { type: String, enum: ['available', 'reserved', 'sold', 'returned', 'damaged', 'lost'], required: true },
  reason: { type: String, default: '' },
  notes: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
}, { _id: false });

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
  legacy: { type: String, trim: true, default: '' },
  shortDescription: { type: String, maxlength: 500, default: '' },
  fullDescription: { type: String, default: '' },
  characteristics: {
    fit: { type: String, default: '' },
    fabric: { type: String, default: '' },
    composition: { type: String, default: '' },
    weight: { type: String, default: '' },
    finish: { type: String, default: '' },
    collar: { type: String, default: '' },
    sleeve: { type: String, default: '' },
    bottomHem: { type: String, default: '' },
    sleeveHem: { type: String, default: '' },
  },
  productType: { type: String, enum: ['Tops', 'Bottoms', 'Oversized T-Shirt', 'Heritage Jersey', 'Heavy T-Shirt', 'Hoodie', 'Shirt'] },
  universe: {
    type: String,
    enum: ['Heritage', 'Essentials', 'Studio', 'Community Lab'],
    required: true,
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived', 'out-of-stock'],
    default: 'draft',
  },
  releaseNumber: { type: String, trim: true },
  quantity: { type: Number, min: 0 },
  launchDate: { type: Date },
  releaseStatus: {
    type: String,
    enum: ['draft', 'ready', 'production', 'upcoming', 'live', 'sold-out', 'archived'],
    default: 'draft',
  },
  releaseSettings: {
    name: { type: String, default: '' },
    date: { type: Date },
    price: { type: Number, min: 0 },
    status: { type: String, enum: ['draft', 'upcoming', 'early-access', 'live', 'sold-out', 'closed'], default: 'draft' },
    earlyAccess: { type: Boolean, default: false },
    earlyAccessDuration: { type: Number, min: 0, default: 0 },
    earlyAccessUnit: { type: String, enum: ['hours', 'days'], default: 'hours' },
    keeperPoints: { type: Number, min: 0, default: 0 },
    keeperExclusive: { type: Boolean, default: false },
  },
  qrExperienceUrl: { type: String },
  productPassportId: { type: String, trim: true },
  archiveTitle: { type: String, trim: true },
  storyTitle: { type: String, trim: true },
  productionNotes: { type: String, default: '' },
  price: { type: Number, min: 0 },
  currency: { type: String, enum: ['TND', 'EUR', 'USD', 'MAD', 'DZD'], default: 'TND' },
  description: { type: String, default: '' },
  coverImageUrl: { type: String, default: '' },
  images: [{ type: String }],
  sizes: [productSizeSchema],
  colorways: [productColorwaySchema],
  variants: [productVariantSchema],
  inventoryPieces: { type: [inventoryPieceSchema], default: [] },
  materials: [{ type: String }],
  fit: [{ type: String }],
  careInstructions: [{ type: String }],
  sizeGuideIncluded: { type: Boolean, default: false },
  relatedStoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
  relatedChallengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  collectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', index: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  publishedAt: { type: Date },
  design: {
    designName: { type: String, default: '' },
    tifinaghText: { type: String, default: '' },
    meaning: { type: String, default: '' },
    inspiration: { type: String, default: '' },
    heritageTheme: { type: String, default: '' },
    motif: { type: String, default: '' },
    motifMeaning: { type: String, default: '' },
    designStory: { type: String, default: '' },
    heritageStory: { type: String, default: '' },
    decorationTechnique: { type: String, default: '' },
    decorationPosition: { type: String, default: '' },
    customPosition: { type: String, default: '' },
    threadColor: { type: String, default: '' },
    threadColorHex: { type: String, default: '' },
    version: { type: String, default: 'v1.0' },
  },
  pricing: {
    compareAtPrice: { type: Number, min: 0 },
    fabricCost: { type: Number, min: 0, default: 0 },
    sewingCost: { type: Number, min: 0, default: 0 },
    embroideryCost: { type: Number, min: 0, default: 0 },
    washingCost: { type: Number, min: 0, default: 0 },
    packagingCost: { type: Number, min: 0, default: 0 },
    otherCost: { type: Number, min: 0, default: 0 },
  },
  media: {
    mainImage: { type: String, default: '' },
    gallery: [{ type: String }],
    detailImages: [{ type: String }],
    front: [{ type: String }],
    back: [{ type: String }],
    sleeve: [{ type: String }],
    embroidery: [{ type: String }],
    modelImages: [{ type: String }],
    campaignVideo: { type: String, default: '' },
    lifestyleImages: [{ type: String }],
    packagingImage: { type: String, default: '' },
    ogImage: { type: String, default: '' },
  },
  story: {
    shortStory: { type: String, default: '' },
    fullStory: { type: String, default: '' },
    heritageStory: { type: String, default: '' },
    designStory: { type: String, default: '' },
    craftsmanshipStory: { type: String, default: '' },
    productMeaning: { type: String, default: '' },
  },
  seo: {
    slug: { type: String, trim: true, lowercase: true, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    keywords: [{ type: String }],
    ogImage: { type: String, default: '' },
  },
}, { timestamps: true });

productSchema.index({ status: 1 });
productSchema.index({ universe: 1 });
productSchema.index({ collectionIds: 1 });
productSchema.index({ categoryIds: 1 });

export const Product = mongoose.model('Product', productSchema);

