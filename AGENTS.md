<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Commands

- npm only (npm lockfile): `npm ci` / `npm run dev` / `npm run build` / `npm run start` / `npm run lint`
- `npm run lint` is plain `eslint` (Next 16 removed `next lint`); it accepts no arguments — run it as-is.
- No test framework is configured. Verify with `npm run lint && npm run build` (build covers type errors; `tsc` has no standalone script).
- Dev server: `npm run dev` → http://localhost:3000

# Stack facts that will trip you up

- Next.js 16.4.3, App Router, React 19.3.0. **React Compiler enabled** (`reactCompiler: true` in `next.config.ts`) — don't add manual `useMemo`/`useCallback` unless a profiler or lint rule justifies it.
- Tailwind **v4, CSS-first** — theme tokens live in `src/app/globals.css` (`@theme` / CSS variables); there is no `tailwind.config.*`; CSS is compiled through a Turbopack loader rule in `next.config.ts`.
- Path alias: `@/*` → `./src/*`.
- shadcn/ui `base-nova` style built on **`@base-ui/react` primitives, not Radix**. Extend via `npx shadcn add <component>`; don't hand-write variants. `components.json` is the source of truth; `cn` from `@/lib/utils`, `cva` from `class-variance-authority`.

# Structure

- Entrypoints: `src/app/layout.tsx` (root layout) + `src/app/page.tsx` (home).
- Routes: `/`, `/add-destination`, `/all-destination`, `/all-destination/[slug]`. Components in `src/components/` and `src/components/ui/`; lib in `src/lib/` (`api.ts`, `utils.ts`).
- No API routes, no middleware, no CI workflows, no pre-commit, no `opencode.json`.
- Backend: `src/lib/api.ts` hardcodes `API_BASE_URL = "http://localhost:8000"` — a local backend on port 8000 is expected for destination features.

# Verification

- `npm run lint && npm run build`
