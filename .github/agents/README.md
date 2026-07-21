# IZLI Agent Operating System

## Purpose

This document defines how all IZLI agents collaborate.

This document is the routing and handoff contract for the IZLI agent system.

Each agent owns a specific business domain.

Agents must collaborate through structured handoffs.

The IZLI Project Director is the parent orchestrator.

## Routing Rules

1. If a request clearly belongs to one domain, route it to that domain's owner.
2. If a request touches multiple domains, start with the Project Director.
3. If a request changes a reusable entity, involve the owning specialist plus QA.
4. If a request introduces AI capabilities, involve the AI Architect.
5. If a request changes UX, UI consistency, or navigation, involve the UX Lead and Frontend Architect.
6. If a request changes content, storytelling, or editorial structure, involve the Content Strategist.
7. If a request changes commerce entities, collections, pricing, or product lifecycle, involve the Commerce Manager.
8. If a request is ambiguous, do not guess. Escalate to the Project Director.

---

# Agent Hierarchy

```
IZLI Project Director (Parent)

├── IZLI Product Owner
├── IZLI UX Lead
├── IZLI Brand Director
├── IZLI Frontend Architect
├── IZLI Backend Architect
├── IZLI AI Architect
├── IZLI Design System Lead
├── IZLI Commerce Manager
├── IZLI Community Manager
├── IZLI Production Manager
├── IZLI SEO Tunisia
├── IZLI Content Strategist
└── IZLI QA Lead
```

---

# Core Principles

- One agent owns one domain.
- Reuse before creating new solutions.
- Never duplicate business logic.
- Never duplicate entities.
- Never duplicate UI components.
- Documentation must always stay up to date.
- QA validates every release.
- Project Director is the final decision maker.

---

# Agent Responsibilities

| Agent | Responsibility |
|--------|----------------|
| Project Director | Strategy & orchestration |
| Product Owner | Product vision & business rules |
| UX Lead | User experience & information architecture |
| Brand Director | Brand identity & storytelling |
| Frontend Architect | Frontend architecture |
| Backend Architect | Backend architecture |
| AI Architect | AI strategy & intelligent systems |
| Design System Lead | Design system & reusable UI |
| Commerce Manager | Products & commerce |
| Community Manager | Community ecosystem |
| Production Manager | Production workflows |
| SEO Tunisia | SEO & discoverability |
| Content Strategist | Editorial strategy |
| QA Lead | Platform quality |

---

# Handoff Rules

Always hand off when:

- Multiple business domains are affected.
- A reusable entity changes.
- Platform architecture changes.
- A new workflow is introduced.
- AI capabilities are introduced.
- Business rules change.

---

# Standard Handoff Format

Every handoff should contain:

- Objective
- Reason
- Affected Domains
- Affected Entities
- Expected Deliverables
- Constraints
- Final Validator

---

# Collaboration Workflow

```
User Request
        │
        ▼
Project Director
        │
        ▼
Product Owner
        │
        ▼
Specialized Agents
        │
        ▼
Implementation
        │
        ▼
QA Lead
        │
        ▼
Documentation
        │
        ▼
Release
```

---

# Examples of Clear Requests

| Request | Agent |
|----------|-------|
| Create a Story | Content Strategist |
| Improve UX | UX Lead |
| Update Design Tokens | Design System Lead |
| Create Product | Commerce Manager |
| Improve SEO | SEO Tunisia |
| Build API | Backend Architect |

---

# Examples of Ambiguous Requests

| Request | Required Agents |
|----------|-----------------|
| Create Product | Project Director, Product Owner, Commerce Manager, Content Strategist, Brand Director, Production Manager, Backend Architect, Frontend Architect, QA Lead |
| Create Archive | Project Director, Brand Director, Content Strategist, Commerce Manager, SEO Tunisia, QA Lead |
| Add AI Feature | Project Director, AI Architect, Backend Architect, Frontend Architect, UX Lead, QA Lead |
| Improve Search | Project Director, AI Architect, Backend Architect, SEO Tunisia, Content Strategist, QA Lead |
| Add Product Field | Product Owner, Backend Architect, Frontend Architect, QA Lead |

When in doubt:

→ Escalate to the Project Director.

---

# AI Governance

AI supports the platform but never replaces business decisions.

Always involve the AI Architect for:

- AI Agents
- Semantic Search
- RAG
- Prompt Engineering
- Recommendations
- AI Automations
- AI Analytics

Business decisions remain the responsibility of the Product Owner and Project Director.

---

# Conflict Resolution

| Conflict | Decision |
|----------|----------|
| UX vs Frontend | UX Lead |
| Backend vs Frontend | Backend Architect |
| Brand vs Commerce | Product Owner |
| AI vs Architecture | AI Architect |
| Cross-domain | Project Director |
| Release Approval | QA Lead |

---

# Validation Checklist

Before releasing:

- Business rules respected
- UX validated
- Design System respected
- Content Graph preserved
- Responsive verified
- Accessibility verified
- SEO verified
- Documentation updated
- QA approved

---

# Golden Rules

- Think platform first.
- Think reusable.
- Think scalable.
- Preserve the IZLI Legacy.
- Preserve the Design System.
- Preserve the Content Graph.
- Collaborate before implementing.
- Never work in isolation.