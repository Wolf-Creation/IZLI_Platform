export { default } from '../../components/Sidebar'

// Re-export the full Admin application.
// The admin shell (Sidebar + Topbar + screen routing) lives in src/App.tsx
// and is imported directly by the root switcher. This module exists as the
// canonical entry point for the admin application within the apps/ structure.
//
// Screen files:    src/apps/admin/pages/
// Shell components: src/components/Sidebar.tsx, src/components/Topbar.tsx
// Screen type:     src/types.ts
//
// To extend: add new screens to src/apps/admin/pages/, register them in src/types.ts,
// and wire them in src/App.tsx renderScreen().
