PROJECT EVOLUTION

The current IZLI Platform already contains:

• Products
• Collections
• Stories
• Style Guides
• Recommendation Hub
• Product Passport

Do NOT redesign any existing screen.

Do NOT regenerate the current Admin.

Do NOT modify existing Product pages.

Do NOT change the current navigation.

Your objective is to extend the IZLI Platform by introducing a completely new production module called:

Brand Production Center

The Brand Production Center is responsible for generating every production asset required by manufacturers.

This module must support all product categories, not only T-Shirts.

Examples:

• T-Shirts

• Hoodies

• Sweatshirts

• Pants

• Shorts

• Jackets

• Caps

• Tote Bags

• Accessories

The architecture must be generic and reusable.

--------------------------------------------------
PLATFORM ROLE
--------------------------------------------------

Brand Production Center becomes the production engine of the IZLI Platform.

It generates printable assets automatically from Product data.

It never stores duplicated information.

It consumes data from:

Product

Collection

Product Passport

Style Guide

Brand Identity

Brand Assets

--------------------------------------------------
SIDEBAR
--------------------------------------------------

Create a new top-level section.

Production

────────────────────

Brand Production Center

Production Templates

Generated Assets

Print Presets

Batch Generator

Export Center

────────────────────

The design must match the existing IZLI Admin.

--------------------------------------------------
PRODUCTION DASHBOARD
--------------------------------------------------

Create a dashboard showing

Assets Generated

Products Ready

Missing Production Files

QR Codes Generated

Exports

Latest Production Jobs

--------------------------------------------------
PRODUCTION TEMPLATES
--------------------------------------------------

Create a reusable entity.

Production Templates define which branding assets must be generated depending on product category.

Examples

Oversized T-Shirt

Classic T-Shirt

Hoodie

Pants

Shorts

Cap

Bag

Accessory

Each template defines required production assets.

--------------------------------------------------
PRODUCT CATEGORY RULES
--------------------------------------------------

Each Product Category determines automatically which production assets are generated.

Example

Oversized T-Shirt

Internal Branding Print

Side Label

QR Label

Hang Tag

Packaging Card

Care Card

Example

Pants

Waist Print

Waist Label

QR Label

Hang Tag

Packaging Card

Example

Cap

Sticker

Hang Tag

Packaging Card

QR Card

Do not hardcode product types.

Templates must remain editable.

--------------------------------------------------
PRODUCTION ASSETS
--------------------------------------------------

The system automatically generates printable assets.

Supported assets

Internal Branding Print

Neck Print

Waist Print

Side Label

Woven Label

Care Label

Heat Transfer Artwork

Hang Tag

QR Label

Packaging Card

Sticker

Shipping Insert

Thank You Card

Brand Card

Any asset can be enabled or disabled depending on the Production Template.

--------------------------------------------------
VARIABLE SYSTEM
--------------------------------------------------

Every Production Template uses variables.

Examples

{{LOGO}}

{{PRODUCT_NAME}}

{{PRODUCT_ID}}

{{COLLECTION}}

{{SIZE}}

{{FABRIC}}

{{COMPOSITION}}

{{COUNTRY}}

{{CARE_SYMBOLS}}

{{WEBSITE}}

{{QR_CODE}}

{{COLOR}}

{{STYLE_GUIDE}}

{{SEASON}}

Variables are automatically populated from Product data.

--------------------------------------------------
AUTOMATIC GENERATION
--------------------------------------------------

Whenever a Product is published

↓

Automatically create Production Assets

↓

Automatically generate every available size

Example

XS

S

M

L

XL

XXL

Every size receives its own printable artwork.

--------------------------------------------------
PRODUCT IDENTIFIER
--------------------------------------------------

Use the existing Product Passport.

Generate

IZLI-{SOURCE}-{SIZE}-{SERIAL}

Examples

IZLI-MTN-M-000125

IZLI-HER-XL-000031

IZLI-COM-L-000004

The Product Identifier is automatically inserted into all applicable production assets.

--------------------------------------------------
QR CODE
--------------------------------------------------

Use the Product Passport QR Code.

Automatically include the QR Code inside production assets when enabled.

The QR always links to the Product Passport landing page.

--------------------------------------------------
PRINT PRESETS
--------------------------------------------------

Create predefined print formats.

Examples

15 × 15 mm

20 × 20 mm

30 × 30 mm

50 × 50 mm

70 × 70 mm

Custom

Each preset stores

Physical Size

Resolution

Margins

Safe Area

Quiet Zone

--------------------------------------------------
EXPORT CENTER
--------------------------------------------------

Allow exporting every production asset.

PNG

300 PPI

Transparent Background

White Background

SVG

Vector

PDF

Print Ready

ZIP

Batch Export

--------------------------------------------------
BATCH GENERATOR
--------------------------------------------------

Allow selecting multiple products.

Generate all production assets.

Export everything inside one ZIP.

Show progress.

--------------------------------------------------
PRODUCT EDITOR
--------------------------------------------------

Do NOT redesign the Product Editor.

Add one new relation.

Production Template

Entity Picker

Preview Selected Template

Edit Template

Generate Production Assets

Open Production Center

Do not duplicate production settings inside Product.

--------------------------------------------------
ENTITY MODEL
--------------------------------------------------

Create reusable entities.

ProductionTemplate

ProductionAsset

PrintPreset

ExportPreset

BatchJob

GeneratedAsset

Each Product references only one Production Template.

--------------------------------------------------
RELATIONSHIPS
--------------------------------------------------

Product

↓

Product Passport

↓

Production Template

↓

Generated Production Assets

↓

Export Center

Brand Production Center consumes data from

Product

Collections

Product Passport

Style Guide

Recommendation Hub

without duplicating information.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

Create Brand Production Center as the central production engine of the IZLI Platform.

It must automatically generate every printable branding asset required for manufacturing.

The architecture must support every current and future product category.

The solution must remain modular, reusable, scalable and fully integrated into the existing IZLI Platform while preserving all existing Website and Admin interfaces.