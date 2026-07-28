import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

import '../src/modules/auth/model.js';
import '../src/modules/users/model.js';
import '../src/modules/customers/model.js';
import '../src/modules/products/model.js';
import '../src/modules/collections/model.js';
import '../src/modules/stories/model.js';
import '../src/modules/community/model.js';
import '../src/modules/events/model.js';
import '../src/modules/notifications/model.js';
import '../src/modules/analytics/model.js';
import '../src/modules/search/model.js';
import '../src/modules/admin/model.js';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const replaceMany = async (Model, items) => {
  await Model.deleteMany({});
  if (items.length > 0) {
    await Model.create(items);
  }
};

await mongoose.connect(uri);

const User = mongoose.model('User');
const Customer = mongoose.model('Customer');
const Product = mongoose.model('Product');
const Collection = mongoose.model('Collection');
const Story = mongoose.model('Story');
const CommunityMember = mongoose.model('CommunityMember');
const Contribution = mongoose.model('Contribution');
const Challenge = mongoose.model('Challenge');
const Submission = mongoose.model('Submission');
const Event = mongoose.model('Event');
const LabProject = mongoose.model('LabProject');
const OpenCall = mongoose.model('OpenCall');
const Notification = mongoose.model('Notification');
const GlobalSetting = mongoose.model('GlobalSetting');

await replaceMany(User, [
  { email: 'admin@izli.com', password: 'Admin1234!', displayName: 'IZLI Admin', role: 'admin', status: 'active' },
  { email: 'editor@izli.com', password: 'Editor1234!', displayName: 'IZLI Editor', role: 'editor', status: 'active' },
  { email: 'moderator@izli.com', password: 'Moderator1234!', displayName: 'IZLI Moderator', role: 'moderator', status: 'active' },
]);

await replaceMany(Customer, [
  { email: 'amayas.berber@example.com', password: 'Customer1234!', firstName: 'Amayas', lastName: 'Berber', segment: 'vip', ordersCount: 7, totalSpend: 1243, currency: 'EUR', wishlistIds: ['prod-002', 'prod-004'], tags: [], status: 'active', emailVerified: true },
  { email: 'kader.tamazight@example.com', password: 'Customer1234!', firstName: 'Kader', lastName: 'Tamazight', segment: 'returning', ordersCount: 3, totalSpend: 487, currency: 'EUR', wishlistIds: ['prod-001'], tags: [], status: 'active', emailVerified: true },
  { email: 'syphax.bellal@example.com', password: 'Customer1234!', firstName: 'Syphax', lastName: 'Bellal', segment: 'vip', ordersCount: 12, totalSpend: 2890, currency: 'EUR', wishlistIds: ['prod-003', 'prod-005', 'prod-006'], tags: [], status: 'active', emailVerified: true },
  { email: 'nadia.oulhadj@example.com', password: 'Customer1234!', firstName: 'Nadia', lastName: 'Oulhadj', segment: 'new', ordersCount: 1, totalSpend: 217, currency: 'EUR', wishlistIds: [], tags: [], status: 'active', emailVerified: true },
]);

await replaceMany(Product, [
  { sku: 'IZL-HRT-TEE-001', name: 'Tifinagh Frame Tee', universe: 'Heritage', status: 'published', releaseNumber: '01', quantity: 150, launchDate: '2026-03-15T09:00:00Z', releaseStatus: 'live', qrExperienceUrl: '/qr/tifinagh-frame-tee', productPassportId: 'PP-2026-000125', archiveTitle: 'Echoes of Stone', storyTitle: 'The Geometry of Tifinagh', productionNotes: 'Live release. QR, passport, labels, and packaging generated.', price: 89, currency: 'EUR', description: 'A heavyweight organic cotton tee with Tifinagh inspiration.', coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&auto=format', images: [], sizes: [], materials: [], careInstructions: [], relatedStoryId: null, relatedChallengeId: null, collectionIds: [], tags: [], createdAt: new Date().toISOString() },
  { sku: 'IZL-HRT-OVR-001', name: 'Woven Sahara Overshirt', universe: 'Heritage', status: 'published', releaseNumber: '02', quantity: 250, launchDate: '2026-04-08T09:00:00Z', releaseStatus: 'live', qrExperienceUrl: '/qr/woven-sahara-overshirt', productPassportId: 'PP-2026-000126', archiveTitle: 'Indigo Memory', storyTitle: 'Weaving the Sahara', productionNotes: 'Community-backed release with archival story pairing.', price: 195, currency: 'EUR', description: 'Hand-loomed Saharan wool overshirt.', coverImageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&auto=format', images: [], sizes: [], materials: [], careInstructions: [], relatedStoryId: null, relatedChallengeId: null, collectionIds: [], tags: [], createdAt: new Date().toISOString() },
  { sku: 'IZL-ESS-TEE-001', name: 'Atlas Symbol Boxy Tee', universe: 'Essentials', status: 'published', releaseNumber: '01', quantity: 300, launchDate: '2026-04-22T09:00:00Z', releaseStatus: 'upcoming', qrExperienceUrl: '/qr/atlas-symbol-boxy-tee', productPassportId: 'PP-2026-000127', archiveTitle: 'Atlas Marks', storyTitle: 'The Atlas Symbol', productionNotes: 'Ready for production package generation.', price: 65, currency: 'EUR', description: 'Oversized tee with Atlas symbol embroidery.', coverImageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop&auto=format', images: [], sizes: [], materials: [], careInstructions: [], relatedStoryId: null, relatedChallengeId: null, collectionIds: [], tags: [], createdAt: new Date().toISOString() },
]);

await replaceMany(Collection, [
  { slug: 'roots-ss25', name: 'Roots — SS25', universe: 'Heritage', season: 'SS25', status: 'active', coverImageUrl: '', description: '', productIds: [], tags: [], createdAt: new Date().toISOString() },
  { slug: 'atlas-fw25', name: 'Atlas — FW25', universe: 'Studio', season: 'FW25', status: 'active', coverImageUrl: '', description: '', productIds: [], tags: [], createdAt: new Date().toISOString() },
  { slug: 'essentials-permanent', name: 'Essentials', universe: 'Essentials', season: 'Permanent', status: 'active', coverImageUrl: '', description: '', productIds: [], tags: [], createdAt: new Date().toISOString() },
]);

await replaceMany(Story, [
  { slug: 'the-language-of-tifinagh', title: 'The Language of Tifinagh', type: 'heritage', status: 'published', authorId: '000000000000000000000001', authorName: 'Yidir Ait Ouali', coverImageUrl: '', body: 'Tifinagh is one of the world\'s oldest writing systems.', readTimeMinutes: 7, relatedProductIds: [], relatedChallengeIds: [], tags: [], createdAt: new Date().toISOString() },
]);

await replaceMany(CommunityMember, [
  { email: 'amayas@example.com', displayName: 'Amayas Berber', location: 'Montréal, QC', level: 4, status: 'active', contributionsCount: 18, featuredContributions: 3, challengesParticipated: 6, labProjectsJoined: 2, badges: ['Early Adopter'], joinedAt: new Date().toISOString() },
  { email: 'syphax@example.com', displayName: 'Syphax Bellal', location: 'Amsterdam, NL', level: 5, status: 'active', contributionsCount: 34, featuredContributions: 7, challengesParticipated: 10, labProjectsJoined: 3, badges: ['Master Contributor'], joinedAt: new Date().toISOString() },
]);

await replaceMany(Challenge, [
  { slug: 'zellij-reimagined', title: 'Zellij Reimagined', tagline: '', status: 'closed', level: 'open', coverImageUrl: '', description: '', guidelines: '', startDate: new Date().toISOString(), endDate: new Date().toISOString(), submissionsCount: 214, participantsCount: 189, winnersCount: 3, relatedProductIds: [], tags: [], createdAt: new Date().toISOString() },
]);

await replaceMany(Submission, [
  { challengeId: '000000000000000000000101', memberId: '000000000000000000000201', memberName: 'Amayas Berber', title: 'Ancestral Zellij Grid — Blue Variant', description: '', mediaUrls: [], coverImageUrl: '', status: 'winner', votes: 342, judgeScore: 9.2, rank: 1, submittedAt: new Date().toISOString(), reviewedAt: new Date().toISOString() },
]);

await replaceMany(Event, [
  { slug: 'roots-ss25-launch-paris', title: 'Roots SS25 — Paris Launch', type: 'launch', status: 'past', format: 'in-person', coverImageUrl: '', description: '', date: new Date().toISOString(), capacity: 120, registeredCount: 120, relatedProductIds: [], relatedChallengeIds: [], tags: [], createdAt: new Date().toISOString() },
]);

await replaceMany(LabProject, [
  { slug: 'tifinagh-digital-archive', title: 'Tifinagh Digital Archive', tagline: '', status: 'active', category: 'archive', coverImageUrl: '', description: '', leadId: '000000000000000000000301', leadName: 'Syphax Bellal', membersCount: 28, maxMembers: 50, contributionsCount: 143, progress: 58, startDate: new Date().toISOString(), relatedChallengeIds: [], tags: [], createdAt: new Date().toISOString() },
]);

await replaceMany(OpenCall, [
  { title: 'Tifinagh Archive — Field Researchers', tagline: '', status: 'active', labProjectId: '000000000000000000000401', coverImageUrl: '', description: '', requirements: [], deadline: new Date().toISOString(), submissionsCount: 22, maxSubmissions: 30, createdAt: new Date().toISOString() },
]);

await replaceMany(Notification, [
  { recipientId: '000000000000000000000001', recipientType: 'User', type: 'system', title: 'Welcome', body: 'IZLI Atlas seed completed.', read: false, actionUrl: '/', createdAt: new Date().toISOString() },
]);

await replaceMany(GlobalSetting, [
  { key: 'app-settings', value: {
    brand: { name: 'IZLI', tagline: 'Amazigh Heritage Menswear', logoUrl: '/logo.svg', primaryColor: '#1A1A1A', secondaryColor: '#C9A84C', accentColor: '#2D5A8E', currency: 'EUR', timezone: 'Europe/Paris', locale: 'en-GB' },
    site: { domain: 'izli.com', metaTitle: 'IZLI — Amazigh Heritage Menswear', metaDescription: 'Contemporary menswear rooted in Amazigh heritage.', socialLinks: { instagram: 'https://instagram.com/izliofficial' }, maintenanceMode: false },
    commerce: { taxRate: 20, shippingFreeThreshold: 200, defaultShippingCost: 8, supportedCurrencies: ['EUR', 'GBP', 'USD', 'MAD'], supportedCountries: ['FR', 'GB', 'DE', 'NL', 'BE', 'ES', 'IT', 'CA', 'US', 'MA', 'DZ', 'TN'], returnsWindowDays: 30 },
    community: { memberLevels: 5, contributionModerationRequired: true, challengeSubmissionLimit: 3, labProjectMaxMembers: 50, pointsPerContribution: 10, pointsPerChallenge: 25 },
  } },
]);

await mongoose.disconnect();
console.log('Seed data inserted successfully');