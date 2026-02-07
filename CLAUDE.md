# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sosbor is a civic engagement platform for collecting citizen feedback on city master plans. Users can submit location-based ideas via an interactive map and complete surveys. Built as a monorepo with a Next.js frontend and PocketBase backend.

## Repository Structure

- `frontend/` — Next.js 16 app (React 19, TypeScript, Mantine UI)
- `pb/` — PocketBase backend with migrations
- `compose.yml` — Production Docker Compose
- `compose-dev.yml` — Development Docker Compose (Payload CMS + MongoDB)

## Development Commands

All frontend commands run from `frontend/`:

```sh
cd frontend
npm run dev      # Start Next.js dev server
npm run build    # Production build
npm run lint     # ESLint (next lint)
```

Docker-based dev environment (requires mise):

```sh
mise run dev     # Start dev containers (Payload CMS + MongoDB)
mise run stop    # Stop dev containers and remove volumes
```

## Architecture

### Frontend (`frontend/src/`)

**Routing**: Next.js Pages Router (`pages/`). Key pages: `/` (landing), `/map` (interactive map), `/debug` (env debug).

**Styling**: Mantine UI 7.x component library + CSS Modules. PostCSS configured with `postcss-preset-mantine`. Custom theme defined in `_app.tsx` with project colors (primary orange `rgb(233 79 43)`, secondary green `rgb(155 185 98)`).

**State Management**: React Context API — `FormContext` (form/map interaction state), `NavbarContext` (sidebar/drawer toggle), `ClientIdContext` (anonymous client fingerprinting).

**Data Fetching**: SWR with infinite pagination for the submission feed. API calls proxied through Next.js rewrites to the backend (`/api/*` → `BACKEND_URL`).

**Maps**: Dual support for Mapbox GL and MapLibre GL via `react-map-gl`. Components: `MapMapbox/` and `MapMaplibre/`. City boundary loaded from `public/area.geojson`.

**Forms**: React Hook Form + Zod validation. `IdeaModal` for map-based idea submissions (POST to `/api/collections/features/records`). `SurveyModal` for multi-tab surveys (POST to `/api/collections/surveys/records`).

### Backend (`pb/`)

PocketBase v0.35.0 with schema migrations in `pb_migrations/`. Primary collections: `features` (map submissions) and `surveys`.

### Path Aliases

- `@/*` → `frontend/src/*`
- `@root/*` → `frontend/*`

## Environment Variables

Copy `frontend/.env.example` to `frontend/.env`:

- `BACKEND_URL` — Backend API base URL
- `NEXT_PUBLIC_MAPLIBRE_STYLE` — MapLibre style JSON URL
- `NEXT_PUBLIC_MAPBOX_STYLE` — Mapbox style URL
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — Mapbox API token

## Build & Deploy

Frontend uses standalone Next.js output for Docker. Build args for map config are passed at Docker build time. Production images pushed to GHCR with Watchtower for auto-updates.

## Key Patterns

- All UI text is hardcoded in Russian (no i18n)
- **TypeScript strict mode is enabled** - all code must pass strict type checking
- No test framework configured
- Media files served from backend via Next.js redirects (`/media/*`)
- Markdown tables must have aligned columns (pad cells with spaces)

## TypeScript Patterns

**Strict Mode**: Full strict mode enabled (`"strict": true` in `tsconfig.json`). All code must be fully typed with no implicit `any` and proper null safety.

**Centralized Types**: Shared types live in `src/types/`:
- `types/index.ts` — Core types (contexts, component props, survey forms, event handlers)
- `types/submission.ts` — Submission/feature types for map data

**Context Typing**: All React contexts must be fully typed:
```typescript
import { Context, createContext } from 'react'
import { MyContextValue } from '@/types'

export const MyContext: Context<MyContextValue> = createContext<MyContextValue>({
    // ... default values with proper types
})
```

**Component Props**: Always define a separate type for component props with the naming pattern `ComponentNameProps`:
```typescript
export type MyComponentProps = {
    title: string
    count: number
    onSubmit?: () => void
}

export function MyComponent({ title, count, onSubmit }: MyComponentProps) {
    // ...
}
```

For shared component props, import from `@/types`:
```typescript
import { MyComponentProps } from '@/types'

export function MyComponent({ prop1, prop2 }: MyComponentProps) {
    // ...
}
```

**Component Declarations**: Use regular function declarations instead of arrow functions:
```typescript
// Preferred
export function MyComponent({ prop1, prop2 }: MyComponentProps) {
    // ...
}

// Avoid
export const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
    // ...
}
```

**Null Safety**: Use optional chaining and nullish coalescing:
- Prefer `value?.method()` over `value && value.method()`
- Use `value ?? defaultValue` for null/undefined fallbacks
- Mantine props: use `undefined` not `null` (e.g., `ta={isMobile ? 'center' : undefined}`)

**Event Handlers**: Type all event handlers explicitly:
```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { ... }
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { ... }
```

**Form Data**: Use `z.infer<typeof schema>` for React Hook Form + Zod type extraction

**Explicit `any` is Forbidden**: Never use explicit `any` types in the codebase:
- Use proper type definitions from `@/types` or create new ones
- For complex types, use `unknown` and narrow with type guards, or define proper interfaces
- For truly dynamic data, use `Record<string, unknown>` instead of `any`
- Third-party library types should use their exported types or be properly typed
- Note: TypeScript's strict mode catches implicit `any`, but explicit `any` must be avoided manually
- To enforce with tooling: Consider ESLint with `@typescript-eslint/no-explicit-any` rule

**When Adding New Code**:
1. Run `npx tsc --noEmit` to verify types before committing
2. NEVER use explicit `any` - see "Explicit `any` is Forbidden" section above
3. Import shared types from `@/types` rather than defining inline
4. Add return types to exported functions and React components
