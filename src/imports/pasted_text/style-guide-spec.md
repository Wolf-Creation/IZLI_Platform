PROJECT EVOLUTION

The current IZLI Platform already contains a complete Admin application with Commerce, Products, Collections and Website management.

Do NOT redesign any existing screen.

Do NOT modify the current Product Editor.

Do NOT replace existing functionality.

Your objective is to extend the IZLI Platform by introducing a completely new reusable business entity called:

Style Guide

This entity must become a first-class content type inside the IZLI Platform, just like Products, Collections and Stories.

--------------------------------------------------
OBJECTIVE
--------------------------------------------------

Style Guides are reusable styling references.

A Style Guide defines how a product should be worn.

A Style Guide is independent from Products.

Products only reference a Style Guide.

The same Style Guide can be reused by many products.

Examples:

• Sage Collection Style Guide

• Indigo Collection Style Guide

• Linen Beige Style Guide

• Mountain Collection Style Guide

Never duplicate styling information inside Products.

Products should only reference one Style Guide.

--------------------------------------------------
SIDEBAR
--------------------------------------------------

Inside Commerce, create a new menu item.

Commerce

Products

Collections

Orders

Customers

────────────

Style Guides

────────────

The visual style must match the rest of the Admin.

--------------------------------------------------
STYLE GUIDE LIST PAGE
--------------------------------------------------

Create a complete management page.

Display

Guide Name

Preview Palette

Assigned Products

Collection

Status

Updated Date

Actions

Filters

Search

Sorting

Bulk Actions

--------------------------------------------------
STYLE GUIDE EDITOR
--------------------------------------------------

Create a complete editor.

The editor follows the same layout as the Product Editor.

Left Content

Right Sticky Publish Panel

Keep the existing IZLI Admin UI.

--------------------------------------------------
SECTION
GENERAL
--------------------------------------------------

Guide Name

Slug

Description

Collection

Status

Thumbnail

--------------------------------------------------
SECTION
COLOR PALETTE
--------------------------------------------------

Primary Color

Secondary Colors

Accent Colors

Neutral Colors

Preview

Display large premium color swatches.

--------------------------------------------------
SECTION
MATCHING COLORS
--------------------------------------------------

Recommended Colors

Multi Select

Examples

Linen Beige

Clay Brown

Deep Charcoal

Stone Grey

Washed Indigo

Olive

Sand

--------------------------------------------------
SECTION
BOTTOM RECOMMENDATIONS
--------------------------------------------------

Recommended Bottom Colors

Recommended Bottom Types

Cargo

Wide Leg

Straight

Linen Pants

Denim

Shorts

--------------------------------------------------
SECTION
FOOTWEAR
--------------------------------------------------

Recommended Footwear

White Sneakers

Black Sneakers

Brown Boots

Canvas Shoes

Trail Shoes

--------------------------------------------------
SECTION
ACCESSORIES
--------------------------------------------------

Recommended Accessories

Cap

Tote Bag

Bracelet

Watch

Sunglasses

--------------------------------------------------
SECTION
SEASONS
--------------------------------------------------

Spring

Summer

Autumn

Winter

All Seasons

--------------------------------------------------
SECTION
OCCASIONS
--------------------------------------------------

Daily

Travel

Mountain

Outdoor

Weekend

City

--------------------------------------------------
SECTION
LOOKBOOK
--------------------------------------------------

Upload multiple outfit images.

Each look contains

Image

Title

Description

Optional Notes

Display elegant preview cards.

--------------------------------------------------
SECTION
DESIGNER NOTES
--------------------------------------------------

Rich Text

Manual styling recommendations.

--------------------------------------------------
SECTION
QR EXPERIENCE PREVIEW
--------------------------------------------------

Display a live preview showing how this Style Guide will appear after scanning a QR Code.

Preview includes

Product Image Placeholder

Product Name Placeholder

Color Palette

Matching Colors

Bottom Recommendations

Footwear

Accessories

Looks

Designer Notes

Read-only preview.

--------------------------------------------------
RELATIONS
--------------------------------------------------

Create bidirectional relationships.

One Style Guide

↓

Many Products

One Style Guide

↓

Many Collections (optional)

One Style Guide

↓

Many QR Experiences

A Product stores only

StyleGuideID

Never duplicate Style Guide data inside Product.

--------------------------------------------------
PRODUCT EDITOR
--------------------------------------------------

Extend the existing Product Editor.

Do not create styling fields.

Instead create only one new field.

Style Guide

Entity Picker

Search existing Style Guides

Preview selected guide

Create new Style Guide

Edit linked Style Guide

This behaves exactly like selecting a Collection.

--------------------------------------------------
WEBSITE
--------------------------------------------------

Do not redesign Website pages.

Prepare the Website to consume the linked Style Guide.

Product Detail

↓

Style Guide

↓

Color Palette

↓

Recommendations

↓

Looks

--------------------------------------------------
QR CODE
--------------------------------------------------

Do not redesign the QR page.

Prepare the QR page to consume the Style Guide entity.

--------------------------------------------------
ENTITY MODEL
--------------------------------------------------

Create a reusable entity.

StyleGuide

Fields

Name

Slug

Description

Primary Palette

Matching Colors

Bottom Colors

Bottom Types

Footwear

Accessories

Seasons

Occasions

Looks

Designer Notes

Thumbnail

Status

Created At

Updated At

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

Create Style Guide as a reusable content entity for the IZLI Platform.

The Product should never contain styling information directly.

Products only reference a Style Guide.

The Website and QR pages consume the Style Guide.

The Admin manages Style Guides from one centralized location.

The solution must be scalable, reusable, and ready for future categories such as hoodies, jackets, pants and accessories while preserving the current IZLI Admin architecture.