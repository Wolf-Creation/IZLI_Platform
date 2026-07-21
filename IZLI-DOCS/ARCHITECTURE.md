\# IZLI Platform Architecture



> System Overview — Single Source of Truth



Version: 1.0



Status: Living Documentation



\---



\# What is IZLI?



IZLI is not a traditional fashion brand.



IZLI is a \*\*Legacy Platform\*\* that combines Amazigh heritage, storytelling, premium products and community participation into one connected ecosystem.



Every product tells a story.



Every purchase creates a Keeper.



Every Keeper helps build the next Archive.



The platform is designed around reusable business entities connected through a shared Content Graph and orchestrated by IZLI OS.



\---



\# Platform Overview



```

&#x20;                             IZLI PLATFORM



&#x20;                    ┌──────────────────────────┐

&#x20;                    │        Website           │

&#x20;                    └────────────┬─────────────┘

&#x20;                                 │

&#x20;                                 │ Reads

&#x20;                                 │

&#x20;                    ┌────────────▼─────────────┐

&#x20;                    │      Shared Entities     │

&#x20;                    └────────────┬─────────────┘

&#x20;                                 │

&#x20;                    ┌────────────▼─────────────┐

&#x20;                    │         IZLI OS          │

&#x20;                    └────────────┬─────────────┘

&#x20;                                 │

&#x20;                                 │ Manages

&#x20;                                 │

&#x20;                    ┌────────────▼─────────────┐

&#x20;                    │          Admin           │

&#x20;                    └──────────────────────────┘

```



\---



\# Platform Layers



```

Presentation Layer



Website



Admin



↓



Business Layer



Commerce



Legacy



Community



Content



Production



↓



Platform Layer



IZLI OS



↓



Data Layer



Shared Entities



↓



Infrastructure



Database



Storage



Authentication



Search



Analytics



Automation

```



\---



\# Business Domains



```

Commerce



Content



Content Graph



Community



Legacy



Production



Analytics



System

```



Every feature belongs to one business domain.



Business domains communicate through IZLI OS.



\---



\# IZLI OS



IZLI OS is the platform core.



It is not visible to users.



It coordinates every business engine.



```

IZLI OS



├── Commerce Engine

├── Legacy Engine

├── Community Engine

├── Content Engine

├── Recommendation Engine

├── Style Intelligence Engine

├── QR Engine

├── Production Engine

├── Search Engine

├── Analytics Engine

├── Automation Engine

└── Permission Engine

```



Each engine exposes reusable services.


\---


# Current Source Structure


The current implementation is organized under `src/` like this:


```text
src/
├── App.tsx
├── apps/
│   ├── admin/
│   └── website/
├── components/
├── core/
│   ├── analytics/
│   ├── automations/
│   ├── engines/
│   ├── entities/
│   ├── events/
│   ├── generators/
│   ├── permissions/
│   ├── providers/
│   ├── registry/
│   ├── repositories/
│   ├── services/
│   └── workflows/
├── entities/
├── routes/
├── screens/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── theme/
├── tokens.ts
├── types.ts
└── website/
```


The source also includes compatibility layers such as `src/apps/*` entry points and `src/tokens.ts` as a backward-compatible re-export.



\---



\# Website



The Website is the storytelling experience.



Responsibilities



• Product Discovery



• Storytelling



• Legacy



• Archives



• QR Experience



• Community



• Commerce



The Website never owns data.



It consumes Shared Entities managed by the Admin.



\---



\# Admin



The Admin is the operational platform.



Responsibilities



• Product Management



• Content Management



• Community Management



• Legacy Management



• Production Management



• Analytics



• Design System



The Admin is the only place where business data is created or edited.



\---



\# Content Graph



Every business entity is connected.



```

Legacy

│

└── Archives

&#x20;     │

&#x20;     └── Collections

&#x20;           │

&#x20;           └── Products

&#x20;                   │

&#x20;       ┌───────────┼─────────────┐

&#x20;       │           │             │

&#x20;       ▼           ▼             ▼

&#x20;    Stories   Style Guide   Product Passport

&#x20;       │           │             │

&#x20;       └──────┬────┴──────┐      │

&#x20;              ▼           ▼      ▼

&#x20;     Recommendation Hub   QR Experience

&#x20;              │

&#x20;              ▼

&#x20;        Keeper Journey

```



No duplicated information.



Every module consumes shared entities.



\---



\# Product Ecosystem



Every Product references reusable entities.



```

Product



├── Collection



├── Archive



├── Legacy



├── Story



├── Style Guide



├── Recommendation Hub



├── Product Passport



├── QR Experience



├── Production Template



└── Production Assets

```



\---



\# Legacy Lifecycle



```

Instagram



↓



Story Discovery



↓



Legacy Discovery



↓



Archive Discovery



↓



Product Discovery



↓



Purchase



↓



Become Keeper



↓



Keeper Circle



↓



Voting



↓



Next Archive



↓



Legacy grows



↓



Invite Members

```



This lifecycle is the core business model of IZLI.



\---



\# Keeper Journey



```

Visitor



↓



Customer



↓



Keeper



↓



Senior Keeper



↓



Legacy Keeper



↓



Guardian

```



Each level unlocks additional experiences.



\---



\# Automation Flow



Example



```

Product Published



↓



Generate Product Passport



↓



Generate Product Identifier



↓



Generate QR Code



↓



Generate Production Assets



↓



Update Recommendation Hub



↓



Update Website



↓



Notify Admin

```



\---



\# Production Flow



```

Product



↓



Production Template



↓



Brand Production Center



↓



Production Assets



↓



Exports



↓



Manufacturer

```



\---



\# Shared Design System



The Website and Admin use one shared Design System.



Includes



• Design Tokens



• Typography



• Color Palette



• Spacing



• Components



• Templates



• Patterns



• Resources



Every reusable component must be documented.



\---



\# Folder Structure



```

src/



apps/



&#x20;   website/



&#x20;   admin/



core/



&#x20;   entities/



&#x20;   engines/



&#x20;   services/



&#x20;   workflows/



&#x20;   automations/



&#x20;   repositories/



shared/



&#x20;   components/



&#x20;   hooks/



&#x20;   providers/



&#x20;   theme/



docs/

```



\---



\# Design Principles



The platform follows these principles.



• Domain Driven Design



• Single Source of Truth



• Shared Entity Models



• Reusable Components



• Event Driven Architecture



• Modular Services



• Shared Design System



• Content Graph



• Scalable Architecture



\---



\# Future Roadmap



The architecture is designed to support future modules.



• Mobile Application



• AI Stylist



• Marketplace



• Retail POS



• Internationalization



• Multi Brand



• Public API



• External Integrations



• NFC Product Passport



• AI Recommendation Engine



No architectural redesign should be required.



\---



\# Documentation Map



```

README.md



↓



ARCHITECTURE.md



↓



SUMMARY.md



↓



Volumes



01 Product Vision



02 Business Model



03 Platform



04 Website



05 Admin



06 Content Graph



07 Data Model



08 IZLI OS



09 Design System



10 Production



11 API



12 AI



13 Roadmap

```



\---



\# Final Statement



The IZLI Platform is a connected ecosystem.



Commerce is only one business domain.



Legacy is the platform philosophy.



Community is the growth engine.



Content is the storytelling layer.



IZLI OS is the platform core.



The Website tells stories.



The Admin manages the ecosystem.



Every entity is reusable.



Every workflow is automated.



Every Archive contributes to the IZLI Legacy.

