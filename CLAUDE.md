# SRYTAL — Frontend (CLAUDE.md)

Guidance for working in this repo. Read this before making changes.

## What this is

A multi-tenant (organization-scoped) internal platform for **SRYTAL INC** with
four user surfaces: **admin**, **employee/user**, **super-admin**, and a public
**landing** site. Routes are namespaced by organization, e.g.
`/:organization/employee/...` and `/:organization/admin/...`.

Backend lives in the sibling repo **`../SRYTAL-BE`** (Express + MongoDB/Mongoose
+ AWS S3). Use it as the source of truth for API contracts. Swagger lives at
`/api-docs` on the running backend.

## Stack

- **React 18** + **TypeScript** + **Vite 6**
- **Mantine 8** (`@mantine/core`, `hooks`, `dates`, `modals`, `tiptap`) — primary UI kit
- **TanStack Query v5** — server state (queries/mutations). `QueryClient` in `src/main.tsx`.
- **Recoil** — client/global state (theme, organization config) in `src/atoms`
- **React Router v6** — routing (future flags `v7_startTransition` + `v7_relativeSplatPath` are enabled)
- **React Hook Form + Zod** — forms & validation (schemas in `src/forms`)
- **Axios** — HTTP via `src/utils/api-client.ts`
- **react-toastify** — toasts (use the `useCustomToast` hook, not `toast` directly)

## Run it

```bash
npm run dev        # Vite dev server (uses .env.development -> VITE_BACKEND_URL)
npm run build      # tsc -b && vite build  (type errors fail the build)
npm run lint       # eslint, zero-warnings enforced on staged files
npm test           # jest
```

Backend (separate repo): `cd ../SRYTAL-BE && npm run dev` (port 3000). The dev
frontend (`.env.development`) points at `http://localhost:3000/`.

## Project structure

```
src/
  admin/        admin surface (pages + components/dashboard/*)
  user/         employee surface (pages + components/dashboard/*)
  super-admin/  super-admin surface
  landing/      public marketing site
  components/
    common/     shared, cross-surface components (loaders, button, header, ...)
    UI/         lower-level UI primitives
  hooks/
    queries/    useXxxQueries.ts   (TanStack useQuery wrappers)
    mutations/  useXxxMutations.ts (TanStack useMutation wrappers)
  services/     API call functions (axios) grouped by role: *-services.ts
  interfaces/   shared TS types
  forms/        zod schemas + form types
  atoms/        Recoil atoms
  utils/        helpers (api-client, toast, get-error-message, constants, ...)
  constants/    app constants (BASE_URL from VITE_BACKEND_URL)
  routes/       route trees per surface (admin, user, super-admin, common)
```

### Path aliases (vite.config.ts + tsconfig)

`@components @common @UI @hooks @services @interfaces @utils @constants`
`@admin @user @super-admin @landing @atoms @forms`. **Always import via aliases**,
not long relative paths.

## Conventions (follow these)

- **File/folder naming**: kebab-case folders; **PascalCase** for React component
  files (`CourseCard.tsx`, `ErrorBoundary.tsx`). Some legacy folders use other
  casing (`forgetPassword`) or have typos (`employement-type`) — match the
  PascalCase/kebab convention for **new** files; don't mass-rename existing ones
  without checking every importer (`tsc -b` must stay green).
- **Components at module scope**: never define a component inside another
  component's render body (causes remounts/state loss). Extract it.
- **Data fetching**: add a service fn in `services/*`, wrap it in a hook in
  `hooks/queries` or `hooks/mutations`. Components consume hooks, not services
  directly. Invalidate the right query keys in mutation `onSuccess`.
- **Auth**: `apiClient` (in `utils/api-client.ts`) auto-attaches the `auth_token`
  header and handles 403 refresh. **Do not** add the token manually in services.
- **Errors**: use `getErrorMessage(error, fallback)` from
  `@utils/common/get-error-message` to turn caught errors into user text; show it
  via `useCustomToast().showErrorToast`. Render-time crashes are caught by the
  app-level `ErrorBoundary` (in `App.tsx`).
- **Loading / empty / error states**: use the shared components in
  `components/common/loaders` — `DataView` (wraps loading/error/empty around
  children), `SkeletonLoader` (`type='cards'|'table'|'list'|'form'`), and
  `PremiumLoader`. Prefer skeletons for content-heavy pages.
- **Theming**: pull colors from `useAppTheme()` (`themeConfig.color`,
  `.borderColor`, `.headerBackgroundColor`, `.button.*`, `.linkColor`). Mantine
  component defaults are themed per-surface in `routes/*.tsx`.
- **Buttons**: use `CommonButton` (`@components/common/button/CommonButton`).
- **Responsiveness**: mobile-first. Use Mantine responsive props
  (`p={{ base, sm }}`, `cols={{ base: 1, sm: 2, lg: 3 }}`) and
  `useMediaQuery('(max-width: 768px)')`. Avoid fixed pixel widths/heights on text
  containers (causes overlap on small screens) — prefer `lineClamp`, `minWidth: 0`,
  and flexible layouts.
- **Static assets**: files in `public/` are served at the **root** (`/logo.jpg`),
  **not** `/public/logo.jpg`. The `/public/...` form 404s in production builds.
- **Quotes/format**: single quotes (JS + JSX). Prettier is the formatter; run
  `npx prettier --write <file>` on files you touch. lint-staged enforces this.
- **`any`**: `@typescript-eslint/no-explicit-any` is off, but prefer real types
  for new code.

## Gotchas

- `BASE_URL` (from `VITE_BACKEND_URL`) often has a trailing slash — strip it
  before concatenating paths (`BASE_URL.replace(/\/+$/,'')`).
- Multiple legacy loader folders existed; the canonical one is
  `components/common/loaders`. `loader/` is still referenced by route files.
- S3-backed media (profile images, course thumbnails, file task content) requires
  valid AWS credentials in the backend `.env`. With invalid keys those endpoints
  return clean errors (no longer crash — the S3 utils now `return reject(...)`).

## Feature modules

- **Content Writer** (employee): create courses → modules → tasks, where a task's
  content is a **file** (any type, stored in S3) or a **link** (YouTube/blog/etc),
  viewed via a backend proxy in a new tab. See
  `src/user/components/dashboard/CLAUDE.md` for the full module + API contract.
