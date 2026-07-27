# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **always running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Key Files

- `src/App.tsx` - Main application component
- `src/main.tsx` - React entry point
- `src/index.css` - Global styles and Tailwind CSS import
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `.mise.toml` - Toolchain versions (Node.js, pnpm)

## Agents

Les agents métier définis dans le dépôt se trouvent dans `.github/agents/`. Ci-dessous la liste des agents disponibles (fichiers) :

- IZLI AI Architect: [.github/agents/IZLI%20AI%20Architect.agent.md](.github/agents/IZLI%20AI%20Architect.agent.md)
- IZLI Backend Architect: [.github/agents/IZLI%20Backend%20Architect.agent.md](.github/agents/IZLI%20Backend%20Architect.agent.md)
- IZLI Brand Director: [.github/agents/IZLI%20Brand%20Director.agent.md](.github/agents/IZLI%20Brand%20Director.agent.md)
- IZLI Commerce Manager: [.github/agents/IZLI%20Commerce%20Manager.agent.md](.github/agents/IZLI%20Commerce%20Manager.agent.md)
- IZLI Community Manager: [.github/agents/IZLI%20Community%20Manager.agent.md](.github/agents/IZLI%20Community%20Manager.agent.md)
- IZLI Content Strategist: [.github/agents/IZLI%20Content%20Strategist.agent.md](.github/agents/IZLI%20Content%20Strategist.agent.md)
- IZLI Design System Lead: [.github/agents/IZLI%20Design%20System%20Lead.agent.md](.github/agents/IZLI%20Design%20System%20Lead.agent.md)
- IZLI Frontend Architect: [.github/agents/IZLI%20Frontend%20Architect.agent.md](.github/agents/IZLI%20Frontend%20Architect.agent.md)
- IZLI Product Owner: [.github/agents/IZLI%20Product%20Owner.agent.md](.github/agents/IZLI%20Product%20Owner.agent.md)
- IZLI Production Manager: [.github/agents/IZLI%20Production%20Manager.agent.md](.github/agents/IZLI%20Production%20Manager.agent.md)
- IZLI Project Director: [.github/agents/IZLI%20Project%20Director.agent.md](.github/agents/IZLI%20Project%20Director.agent.md)
- IZLI QA Lead: [.github/agents/IZLI%20QA%20Lead.agent.md](.github/agents/IZLI%20QA%20Lead.agent.md)
- IZLI SEO Tunisia: [.github/agents/IZLI%20SEO%20Tunisia.agent.md](.github/agents/IZLI%20SEO%20Tunisia.agent.md)
- IZLI UX Lead: [.github/agents/IZLI%20UX%20Lead.agent.md](.github/agents/IZLI%20UX%20Lead.agent.md)
- Agents README: [.github/agents/README.md](.github/agents/README.md)

## Styling

This project uses **Tailwind CSS v4** for styling. Use Tailwind utility classes directly in JSX. Tailwind is loaded via the Vite plugin — no PostCSS config needed.
