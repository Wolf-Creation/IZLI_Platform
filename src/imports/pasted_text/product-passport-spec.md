PROJECT EVOLUTION

The current IZLI Platform already contains:

• Products
• Collections
• Style Guides
• Recommendation Hub

Do NOT redesign any existing screen.

Do NOT modify existing Product pages.

Do NOT regenerate existing UI.

Your objective is to extend the IZLI Platform by introducing a reusable business entity called:

Product Passport

Product Passport manages the complete digital identity of every IZLI product.

Every Product automatically owns exactly one Product Passport.

--------------------------------------------------
OBJECTIVE
--------------------------------------------------

Each time a new Product is created, the platform automatically generates:

• Product Passport

• Unique Product ID

• Unique QR Code

The Product Passport becomes the digital identity of the garment.

--------------------------------------------------
AUTOMATIC GENERATION
--------------------------------------------------

When a Product is published:

Automatically create

Unique Product ID

Example

IZLI-2026-000125

Automatically create

Unique QR Code

Automatically link QR Code

↓

Product

↓

Website Product Page

↓

QR Landing Page

No manual generation is required.

--------------------------------------------------
SIDEBAR
--------------------------------------------------

Inside Commerce create

Product Passports

Commerce

Products

Collections

Orders

Customers

Style Guides

Recommendation Hub

────────────────────

Product Passports

────────────────────

--------------------------------------------------
PRODUCT PASSPORT LIST
--------------------------------------------------

Display

Product

Product ID

QR Preview

QR Status

Landing URL

Created Date

Scan Count

Status

Actions

Search

Filters

Bulk Actions

--------------------------------------------------
PRODUCT EDITOR
--------------------------------------------------

Do NOT redesign the Product Editor.

Add a new relation

Product Passport

Read-only after creation.

Display

Passport Status

Product ID

QR Preview

Open Passport

Download QR

Print QR

--------------------------------------------------
PRODUCT PASSPORT EDITOR
--------------------------------------------------

Create a complete editor.

--------------------------------------------------
SECTION

GENERAL
--------------------------------------------------

Product

Product ID

Slug

Landing URL

Status

Created At

Updated At

--------------------------------------------------
SECTION

QR CODE
--------------------------------------------------

Display a large QR Preview.

Allow

Download PNG

Download SVG

Download PDF

Regenerate QR

Copy URL

Copy Product ID

--------------------------------------------------
SECTION

PRINT
--------------------------------------------------

Create a dedicated print card.

Allow printing at predefined sizes.

1.5 × 1.5 cm

3 × 3 cm

Future Custom Size

Print preview

300 PPI output

Centered QR

Quiet Zone preserved

High contrast

Suitable for textile labels

--------------------------------------------------
SECTION

DOWNLOAD
--------------------------------------------------

Allow exporting

PNG

300 PPI

Transparent Background (optional)

White Background

SVG

Vector

PDF

Print Ready

--------------------------------------------------
SECTION

QR LANDING PAGE
--------------------------------------------------

Preview the landing page.

The QR automatically opens

Product

↓

Style Guide

↓

Recommendation Hub

↓

Product Story

↓

Heritage Story

↓

Care Guide

↓

Related Products

No manual URL configuration required.

--------------------------------------------------
SECTION

AUTHENTICITY
--------------------------------------------------

Prepare future fields.

Serial Number

Edition

Authenticity Status

Counterfeit Protection

Currently placeholders.

--------------------------------------------------
SECTION

SCAN ANALYTICS
--------------------------------------------------

Prepare analytics.

Total Scans

Unique Visitors

Country

Device

Scan Timeline

Traffic Source

These are placeholders for future implementation.

--------------------------------------------------
ENTITY MODEL
--------------------------------------------------

Create a reusable entity.

ProductPassport

Fields

ProductID

PassportID

QRCode

LandingURL

PNG

SVG

PDF

PrintPresets

ScanAnalytics

Authenticity

Status

CreatedAt

UpdatedAt

--------------------------------------------------
RELATIONSHIPS
--------------------------------------------------

One Product

↓

One Product Passport

One Product Passport

↓

One Style Guide

↓

One Recommendation Hub

↓

One QR Landing Page

--------------------------------------------------
WEBSITE
--------------------------------------------------

Do not redesign Website pages.

Prepare every Product Detail page to display

Product Passport

↓

QR Landing Page

↓

Digital Product Experience

--------------------------------------------------
PRINT SPECIFICATIONS
--------------------------------------------------

Support

PNG

300 PPI

SVG

PDF

Print presets

1.5 × 1.5 cm

3 × 3 cm

Keep proper quiet zone.

Optimize for textile label printing.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

Create Product Passport as the digital identity of every IZLI product.

Every Product automatically receives a Product Passport.

The Product Passport automatically generates

Unique Product ID

QR Code

Landing URL

Print Files

Download Files

Future Analytics

Future Authenticity

The solution must integrate naturally into the current IZLI Platform without redesigning the existing Website or Admin.