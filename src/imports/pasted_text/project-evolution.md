PROJECT EVOLUTION

The current IZLI project already contains two complete applications generated with Figma Make.

Application 1
• IZLI Website

Application 2
• IZLI Admin

Both applications are already designed and implemented.

They already work correctly.

--------------------------------------------------
IMPORTANT
--------------------------------------------------

Do NOT redesign any existing screen.

Do NOT regenerate pages.

Do NOT change layouts.

Do NOT change navigation.

Do NOT change the visual identity.

Do NOT replace components.

Do NOT remove code.

Do NOT modify user experience.

Preserve the Website exactly as it is.

Preserve the Admin exactly as it is.

Your mission is NOT to redesign the project.

Your mission is to transform the current project into one scalable IZLI Platform.

--------------------------------------------------
OBJECTIVE
--------------------------------------------------

Connect the existing Website and the existing Admin into one unified platform.

The Website and the Admin must become two applications sharing one architecture.

The user experience must remain identical.

Only improve the internal architecture.

--------------------------------------------------
PLATFORM ARCHITECTURE
--------------------------------------------------

Transform the project into:

IZLI Platform

apps/

    website/

    admin/

shared/

    components/

        ui/

        entities/

        layouts/

    hooks/

    services/

    utils/

    constants/

    theme/

    providers/

    types/

entities/

routes/

assets/

--------------------------------------------------
KEEP EXISTING APPLICATIONS
--------------------------------------------------

Move the current Website into

apps/website

without changing its UI.

Move the current Admin into

apps/admin

without changing its UI.

No visual regression.

No behaviour regression.

--------------------------------------------------
SHARED DESIGN SYSTEM
--------------------------------------------------

Both applications must reuse the same design system.

Create a shared design system.

Share:

Typography

Color Tokens

Spacing

Border Radius

Elevation

Icons

Animations

Interaction Patterns

Accessibility Rules

Never duplicate design tokens.

--------------------------------------------------
SHARED COMPONENT LIBRARY
--------------------------------------------------

Extract reusable components into

shared/components

Create the following structure.

shared/components/ui

Button

IconButton

Input

Textarea

Select

Checkbox

Radio

Switch

Badge

Avatar

Card

Modal

Drawer

Tabs

Breadcrumb

Pagination

EmptyState

SearchField

StatusChip

Tooltip

Toast

Loader

shared/components/entities

ProductCard

CollectionCard

StoryCard

MemberCard

ChallengeCard

ContributionCard

LabProjectCard

OrderCard

NotificationCard

shared/components/layouts

Container

Grid

Section

PageHeader

SidebarLayout

Topbar

ContentArea

FilterToolbar

ActionBar

Only move components that are truly reusable.

Leave application-specific components inside their own application.

--------------------------------------------------
ENTITY LAYER
--------------------------------------------------

Create one shared entity layer.

Entities must exist only once.

Create shared models for

Product

Collection

Story

HeritageArticle

User

CommunityMember

Contribution

Challenge

Submission

CommunityLabProject

Event

Order

Customer

Wishlist

Review

Reward

Notification

Media

Category

Tag

The Website and the Admin must reuse exactly these entities.

--------------------------------------------------
SERVICE LAYER
--------------------------------------------------

Create shared services.

Products

Collections

Stories

CMS

Community

Challenges

Events

Orders

Customers

Authentication

Media

Notifications

Analytics

Search

Settings

Business logic must never be duplicated.

--------------------------------------------------
HOOKS
--------------------------------------------------

Create reusable hooks.

Examples

useProducts

useCollections

useStories

useCommunity

useChallenges

useOrders

useSearch

useAuthentication

useNotifications

--------------------------------------------------
ROUTING
--------------------------------------------------

Separate routing while sharing architecture.

Website routes

/

Home

/shop

/product/:id

/collections

/stories

/heritage

/community

/community-lab

/events

/about

/cart

/login

/profile

Admin routes

/admin

/admin/dashboard

/admin/products

/admin/collections

/admin/orders

/admin/customers

/admin/stories

/admin/community

/admin/challenges

/admin/events

/admin/media

/admin/settings

/admin/components

/admin/analytics

--------------------------------------------------
DATA FLOW
--------------------------------------------------

The Website is read-only.

It consumes shared data.

The Admin manages data.

It creates

updates

publishes

archives

moderates

Every entity created inside the Admin automatically becomes available on the Website.

Example

Admin

↓

Product Entity

↓

Website Shop

Example

Admin

↓

Story

↓

Website Journal

Example

Admin

↓

Challenge

↓

Website Community

--------------------------------------------------
APPLICATION RESPONSIBILITIES
--------------------------------------------------

Website

Brand experience

Editorial experience

Shopping

Community participation

User profile

Collections

Stories

Heritage

Events

Admin

Commerce Management

Content Management

Community Management

Challenge Management

Community Lab

Analytics

Media Library

Settings

Users

Permissions

--------------------------------------------------
CODE QUALITY
--------------------------------------------------

Improve maintainability.

Reduce duplication.

Create a clean scalable architecture.

Respect separation of concerns.

Keep components modular.

Keep entities centralized.

Keep services reusable.

Keep routing independent.

Keep both applications visually identical to the current implementation.

--------------------------------------------------
FINAL GOAL
--------------------------------------------------

Deliver one unified IZLI Platform where:

• Website and Admin remain visually unchanged.

• Both applications share one Design System.

• Both applications share one Component Library.

• Both applications share one Entity Layer.

• Both applications share one Service Layer.

• Both applications share one Theme.

• Both applications share one Business Model.

The platform must be ready for future extensions such as:

• Mobile Application

• Creator Portal

• Partner Portal

• Multi-language

• Multi-currency

• Loyalty Program

• AI Assistant

This evolution must preserve all existing work while creating a professional, scalable and maintainable project architecture.