PROJECT EVOLUTION

The current IZLI Platform already contains a complete Website and Admin.

The platform already includes

Commerce

Community

Community Lab

Stories

Heritage

Legacy

Style Guides

Recommendation Hub

Product Passport

Brand Production Center

QR Experience

The project already works correctly.

--------------------------------------------------
IMPORTANT
--------------------------------------------------

This evolution is NOT a redesign.

Do NOT regenerate existing pages.

Do NOT modify the UI.

Do NOT change navigation.

Do NOT remove modules.

Do NOT replace components.

Do NOT modify the Design System.

The goal is to improve the platform architecture only.

--------------------------------------------------
OBJECTIVE
--------------------------------------------------

Transform the current project into IZLI OS.

IZLI OS is the internal platform core.

It is NOT a visible Admin page.

It is NOT a Website page.

It is the architecture responsible for connecting every business module.

IZLI OS becomes the single source of truth of the platform.

--------------------------------------------------
CORE PRINCIPLES
--------------------------------------------------

Every business module communicates through IZLI OS.

No module stores duplicated information.

Every entity is reusable.

Every service is reusable.

Every engine is reusable.

The Website consumes data.

The Admin manages data.

IZLI OS orchestrates everything.

--------------------------------------------------
IZLI OS LAYERS
--------------------------------------------------

Create a new architecture layer.

src/

core/

    entities/

    engines/

    services/

    automations/

    workflows/

    analytics/

    permissions/

    events/

    registry/

    generators/

    providers/

    repositories/

This layer becomes the platform foundation.

--------------------------------------------------
CORE ENGINES
--------------------------------------------------

Create reusable engines.

Commerce Engine

Legacy Engine

Community Engine

Content Engine

Recommendation Engine

Style Intelligence Engine

QR Engine

Production Engine

Search Engine

Notification Engine

Analytics Engine

Automation Engine

Every engine exposes reusable services.

--------------------------------------------------
CONTENT GRAPH
--------------------------------------------------

Create one centralized Content Graph.

Every business object is connected.

Legacy

↓

Archives

↓

Collections

↓

Products

↓

Stories

↓

Style Guides

↓

Recommendation Hub

↓

Product Passport

↓

Brand Production Center

↓

QR Experience

↓

Keepers

↓

Community

↓

Votes

↓

Events

↓

Community Lab

No duplicated data.

Everything references shared entities.

--------------------------------------------------
ENTITY REGISTRY
--------------------------------------------------

Create one central registry for all business entities.

Products

Collections

Archives

Legacy

Stories

Heritage

Style Guides

Recommendation Hub

Product Passport

Production Template

Production Assets

Keepers

Members

Votes

Achievements

Badges

Rewards

Community Projects

Challenges

Events

Notifications

Media

Every entity follows the same architecture.

--------------------------------------------------
AUTOMATION ENGINE
--------------------------------------------------

Create an automation layer.

Examples

When Product Published

↓

Generate Product Passport

↓

Generate Product Identifier

↓

Generate QR

↓

Generate Production Assets

↓

Generate Product Page

↓

Update Recommendation Hub

↓

Update Search Index

↓

Notify Admin

Another example

Purchase Completed

↓

Create Keeper

↓

Unlock Keeper Circle

↓

Grant Badge

↓

Grant Reward

↓

Enable Voting

Automations are reusable workflows.

--------------------------------------------------
WORKFLOW ENGINE
--------------------------------------------------

Create reusable workflows.

Product Lifecycle

Archive Lifecycle

Keeper Lifecycle

Community Challenge Lifecycle

Production Workflow

Publishing Workflow

QR Workflow

Every workflow is modular.

--------------------------------------------------
EVENT BUS
--------------------------------------------------

Create a central event system.

Examples

Product Created

Product Published

Archive Released

Vote Submitted

Purchase Completed

Keeper Created

Challenge Completed

Story Published

Production Generated

QR Scanned

Every engine reacts to events.

--------------------------------------------------
SEARCH ENGINE
--------------------------------------------------

Create one shared search index.

Products

Collections

Stories

Archives

Keepers

Community

Challenges

Events

Recommendation Hub

Style Guides

--------------------------------------------------
ANALYTICS ENGINE
--------------------------------------------------

Create reusable analytics.

Commerce Analytics

Legacy Analytics

Community Analytics

Recommendation Analytics

QR Analytics

Production Analytics

Keeper Analytics

--------------------------------------------------
PERMISSION ENGINE
--------------------------------------------------

Prepare reusable permissions.

Admin

Editor

Content Manager

Community Manager

Production Manager

Legacy Manager

Keeper

Member

Visitor

Permissions are role-based.

--------------------------------------------------
GENERATORS
--------------------------------------------------

Centralize every automatic generator.

Product Identifier Generator

QR Generator

Production Asset Generator

Recommendation Generator

Product Passport Generator

Print Generator

Referral Generator

Badge Generator

Achievement Generator

--------------------------------------------------
WEBSITE
--------------------------------------------------

Do not redesign Website.

Only replace direct data access with IZLI OS services.

Website consumes

Entities

Services

Workflows

Generators

through IZLI OS.

--------------------------------------------------
ADMIN
--------------------------------------------------

Do not redesign Admin.

Every existing module continues working.

Replace direct logic by reusable engines.

--------------------------------------------------
FOLDER STRUCTURE
--------------------------------------------------

Create

src/

core/

apps/

website/

admin/

shared/

components/

hooks/

providers/

theme/

services/

entities/

routes/

No duplicated logic.

--------------------------------------------------
DESIGN
--------------------------------------------------

No visual modifications.

Keep the existing UI.

Keep the existing navigation.

Keep every page.

Only improve the architecture.

--------------------------------------------------
FINAL OBJECTIVE
--------------------------------------------------

Transform the current IZLI Platform into a modular operating system.

IZLI OS becomes the invisible platform core.

The Website remains the storytelling experience.

The Admin remains the management experience.

IZLI OS becomes the business engine powering

Commerce

Legacy

Community

Production

Recommendations

QR Experience

Style Intelligence

Analytics

Automation

The architecture must be scalable enough to support future mobile applications, AI assistants, external APIs, multilingual content, loyalty programs and future IZLI products without requiring a redesign.