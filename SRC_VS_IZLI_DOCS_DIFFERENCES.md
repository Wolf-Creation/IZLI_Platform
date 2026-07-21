# SRC vs IZLI-DOCS - Differences Report

Date: 2026-07-20
Scope: comparison between the current `src/` implementation and the documentation in `IZLI-DOCS/ARCHITECTURE.md`, `IZLI-DOCS/README.md`, and `IZLI-DOCS/SUMMARY.md`.

## Summary

The implementation and the documentation are aligned on the big picture:

- Website + Admin as the two main surfaces
- Shared entities / shared content graph
- IZLI OS as the platform core
- One design language and reusable architecture

The main differences are in **coverage and implementation detail**: the source tree is more granular than the docs, and some documented surfaces are not implemented as dedicated pages/screens.

## Differences Found

### 1. Website pages are more extensive than the docs describe

The docs describe the Website around these public pages:

- Home
- Shop
- Legacy
- Archives
- Stories
- Community
- QR Experience
- Product Detail

The actual `src/website/pages/` folder also contains:

- About
- Cart
- Collections
- CommunityLab
- Events
- Heritage
- KeeperCircle
- Login
- Profile

Impact:

- The documentation is missing several implemented public experiences.
- The Website surface is broader than the documented public map.

### 2. No dedicated Website QR page is visible in `src/website/pages/`

The docs explicitly treat QR Experience as a public surface.

In the current source tree, there is no dedicated QR page under `src/website/pages/`.

Impact:

- Either the QR experience is embedded inside another page, or the implementation is incomplete relative to the docs.
- This is the clearest Website-side code gap.

### 3. Admin is more granular than the docs describe

The docs describe the Admin at a high level:

- Dashboard
- Commerce
- Content
- Community
- Legacy
- Production
- Analytics
- Design System
- Settings

The actual `src/screens/` folder contains many specialized screens beyond that outline, including:

- AuditLog
- BatchGenerator
- BrandAssets
- CallsForContribution
- ChallengeEditor / ChallengeResults / ChallengesList / ChallengeSubmissions
- CollectionEditor / CollectionsList
- CommerceAnalytics / CommunityAnalytics / ContentAnalytics / ProductionAnalytics / RecommendationAnalytics
- ContributionDetail / ContributionsList
- CustomerDetail
- ExportCenter
- GlobalSettings
- HeritageLibrary
- HomeBuilder
- LabProjectEditor / LabProjectsList
- LegacyAchievements / LegacyAnalytics / LegacyArchives / LegacyInvitations / LegacyKeeperCircle / LegacyKeeperLevels / LegacyReferral / LegacyRewards / LegacyTimeline / LegacyVoting
- MediaLibrary
- MemberProfile / MembersList
- OrdersList
- PrintPresets
- ProductEditor / ProductsList
- ProductionAssets / ProductionCenter / ProductionTemplates
- ProductPassportEditor / ProductPassportList
- QRExperiences
- RecommendationHubEditor / RecommendationHubList
- SitePageEditor
- StoriesList / StoryEditor / StoryReviewQueue
- StyleGuideEditor / StyleGuidesList
- SystemAutomation
- TeamRoles

Impact:

- The docs are too coarse for the current Admin implementation.
- Several implemented internal workflows are not documented as first-class screens.

### 4. Some Admin screen names differ from the documented labels

Examples:

- The docs mention a Design System screen, but the source implementation is `src/screens/Components.tsx`.
- The docs mention Settings, but the source implementation is `src/screens/GlobalSettings.tsx`.

Impact:

- The UI intent is present, but the naming is not aligned.
- The documentation should either adopt the source names or explain the mapping.

### 5. The source includes compatibility / wrapper layers that the docs do not describe

Examples:

- `src/apps/website/index.ts` is a thin wrapper that re-exports the website app.
- `src/apps/admin/index.ts` is a thin entry-point wrapper for the admin app.
- `src/tokens.ts` is a backward-compatible re-export of `src/shared/theme/tokens.ts`.
- `src/core/entities/index.ts` re-exports `src/entities` and adds the shared Content Graph implementation.

Impact:

- The docs describe the platform architecture at a conceptual level, but not these compatibility layers.
- The source code has a transition / adapter layer that should be documented if it is intentional.

### 6. The entity layer is broader in code than the content-graph examples in the docs

The docs focus mainly on the content graph entities:

- Products
- Collections
- Archives
- Stories
- Style Guides
- Recommendation Hub
- Product Passport
- QR Experience

The actual `src/entities/index.ts` also defines many extra shared models, including:

- Category, Tag, Media
- User, Customer
- CommunityMember
- Order, Wishlist, Review
- Contribution, Challenge, Submission
- LabProject, OpenCall, Event
- Reward, Badge, Achievement, Invitation
- Notification
- LegacyTimeline, Keeper, Vote, VotingSession
- ProductionTemplate, ProductionAsset, PrintPreset, GeneratedAsset, BatchJob
- StyleGuide, RecommendationHub, ProductPassport

Impact:

- The docs under-document the breadth of the shared data model.
- The codebase has already grown beyond the content-graph-only model described in the documentation.

## Conclusion

There is no major strategic contradiction between the docs and the code.

The differences are mostly:

- missing documentation for implemented screens/pages,
- naming mismatches for a few admin surfaces,
- compatibility layers in the source tree that are not described in the docs,
- and a much broader concrete entity model in code than the docs currently list.

If you want, the next useful step is to turn this into a **gap-fix plan**: documentation updates first, then any source refactors needed to match the intended architecture more closely.
