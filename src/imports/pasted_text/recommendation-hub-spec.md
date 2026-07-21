PROJECT EVOLUTION

The current IZLI Platform already contains a complete Admin application with Products, Collections, Stories, Community, Style Guides and Website management.

Do NOT redesign any existing screen.

Do NOT modify the current Product Editor.

Do NOT replace existing functionality.

Do NOT regenerate existing pages.

Your objective is to extend the IZLI Platform by introducing a new reusable business entity called:

Recommendation Hub

This entity becomes the centralized recommendation engine for the entire IZLI Platform.

It must be reusable across:

• Website
• Product Detail Pages
• Collections
• Heritage Pages
• Stories
• Community
• Community Lab
• QR Experience
• Future Mobile App

Recommendation Hub is NOT limited to products.

It manages all contextual recommendations across the platform.

--------------------------------------------------
PLATFORM ROLE
--------------------------------------------------

Recommendation Hub acts as a Content Graph connector.

It links together Products, Collections, Stories, Heritage content, Style Guides, Community Challenges and other resources.

It becomes a reusable content entity just like:

• Products
• Collections
• Stories
• Style Guides

--------------------------------------------------
SIDEBAR
--------------------------------------------------

Create a new menu item inside Commerce.

Commerce

Products

Collections

Orders

Customers

Style Guides

────────────────────

Recommendation Hub

────────────────────

The page must follow the existing IZLI Admin Design System.

--------------------------------------------------
RECOMMENDATION HUB LIST
--------------------------------------------------

Create a management page.

Display

Recommendation Name

Recommendation Type

Linked Resources

Trigger

Status

Updated Date

Actions

Filters

Search

Sorting

Bulk Actions

--------------------------------------------------
RECOMMENDATION HUB EDITOR
--------------------------------------------------

Use exactly the same editor layout as Product Editor.

Left Editing Area

Right Sticky Publish Panel

Same spacing

Same cards

Same typography

Same interactions

--------------------------------------------------
SECTION
GENERAL
--------------------------------------------------

Recommendation Name

Slug

Description

Thumbnail

Status

Visibility

Publication Date

--------------------------------------------------
SECTION
RECOMMENDATION TYPE
--------------------------------------------------

Allow selecting one or multiple recommendation categories.

Examples

Complete Your Style

Explore Collection

Discover Another Story

Heritage Journey

Recommended Products

New Arrivals

Community Favorites

Seasonal Picks

Editor's Selection

Best Sellers

Recently Released

You May Also Like

Related Heritage

Related Stories

Related Challenges

Related Style Guides

--------------------------------------------------
SECTION
DISPLAY LOCATIONS
--------------------------------------------------

Choose where this recommendation can appear.

Checkbox Grid

Website Home

Product Detail

Collection Page

Story Page

Heritage Page

Community Page

Community Lab

QR Experience

Search Results

Future Mobile App

--------------------------------------------------
SECTION
TRIGGER RULES
--------------------------------------------------

Define when this recommendation becomes active.

Examples

Viewing Product

Viewing Collection

Viewing Story

Viewing Heritage

Viewing Challenge

Viewing Community Project

Viewing QR Page

Viewing Category

Viewing Search Results

--------------------------------------------------
SECTION
RESOURCE RELATIONSHIPS
--------------------------------------------------

Recommendation Hub is based on relationships.

Allow linking multiple resources.

Products

Collections

Stories

Heritage Articles

Style Guides

Community Challenges

Community Lab Projects

Events

Categories

Tags

Media

Recommendation Groups

Every relation should use an Entity Picker.

--------------------------------------------------
SECTION
RECOMMENDATION RULES
--------------------------------------------------

Allow multiple recommendation strategies.

Manual Selection

Same Collection

Same Style Guide

Same Heritage Theme

Same Color Palette

Same Category

Same Tags

Newest Products

Most Popular

Editor's Choice

Community Favorites

Best Sellers

Recently Updated

Future AI Recommendations (placeholder)

--------------------------------------------------
SECTION
DISPLAY SETTINGS
--------------------------------------------------

Layout

Carousel

Grid

Editorial Cards

Compact List

Number of Items

Card Size

Sorting

Random

Manual

Newest

Popularity

Custom Order

--------------------------------------------------
SECTION
PREVIEW
--------------------------------------------------

Display live previews for each placement.

Product Detail Preview

Collection Preview

Story Preview

QR Preview

Homepage Preview

Community Preview

Use placeholder data.

--------------------------------------------------
SECTION
ANALYTICS
--------------------------------------------------

Prepare analytics fields.

Impressions

Clicks

CTR

Conversion

Purchases

QR Visits

These fields are placeholders.

--------------------------------------------------
RELATIONSHIPS
--------------------------------------------------

Recommendation Hub belongs to the IZLI Content Graph.

One Recommendation Hub may reference

Many Products

Many Collections

Many Stories

Many Style Guides

Many Heritage Articles

Many Challenges

Many Community Projects

Many Events

Many Categories

Many Tags

Products never store recommendation lists directly.

Products reference Recommendation Hub.

--------------------------------------------------
PRODUCT EDITOR
--------------------------------------------------

Extend the existing Product Editor.

Do NOT create recommendation fields.

Create only one relation.

Recommendation Hub

Entity Picker

Search Recommendation Hub

Preview Selected Recommendation

Create New Recommendation Hub

Edit Recommendation Hub

This behaves exactly like selecting a Collection or Style Guide.

--------------------------------------------------
WEBSITE
--------------------------------------------------

Do NOT redesign Website pages.

Prepare every page to consume Recommendation Hub.

Examples

Product Detail

↓

Recommendation Hub

↓

Complete Your Style

↓

Explore Collection

↓

Related Story

↓

New Arrivals

↓

Community Favorites

The Website consumes Recommendation Hub dynamically.

--------------------------------------------------
QR EXPERIENCE
--------------------------------------------------

Prepare the QR Experience to consume Recommendation Hub.

The QR page should be able to display

Recommended Products

Style Guide

Related Story

Collection

Community Challenge

Future Recommendations

--------------------------------------------------
ENTITY MODEL
--------------------------------------------------

Create a reusable entity.

RecommendationHub

Fields

Name

Slug

Description

Recommendation Types

Display Locations

Trigger Rules

Recommendation Rules

Linked Products

Linked Collections

Linked Stories

Linked Heritage

Linked Style Guides

Linked Challenges

Linked Community Projects

Display Settings

Analytics

Status

Created At

Updated At

--------------------------------------------------
CONTENT GRAPH
--------------------------------------------------

Recommendation Hub becomes part of the IZLI Content Graph.

Collection

↓

Products

↓

Style Guide

↓

Recommendation Hub

↓

Stories

↓

Heritage

↓

Community

↓

QR Experience

↓

Website

Updating Recommendation Hub automatically updates every connected experience.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

Create Recommendation Hub as a reusable content entity for the IZLI Platform.

Recommendation Hub must become the central recommendation engine of the ecosystem.

It must never be hardcoded inside individual pages.

All Website pages, Product Detail pages, QR Experiences and future applications consume Recommendation Hub through reusable relationships.

The architecture must remain scalable, reusable, modular and fully integrated into the existing IZLI Platform without modifying the current Website or Admin interfaces.