# Copilot instructions

## Project commands

This repository uses pnpm (see `pnpm-lock.yaml`).

```bash
pnpm dev       # Start Next.js with Turbopack
pnpm lint      # Run ESLint across the repository
pnpm build     # Create a production build
pnpm start     # Serve the production build
```

There is no test script or test runner configured in `package.json`, so there is currently no single-test command. For a focused validation of a changed file, run ESLint on its path, for example `pnpm exec eslint app/lib/actions.ts`.

Copy `.env.example` to a local environment file and provide the Postgres and auth values before running database-backed pages. The README specifically documents `pnpm dev` with access to the preview database.

## Architecture

- This is a Next.js App Router application under `app/`. Routes and layouts are represented by folders and special files such as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- `app/page.tsx` is the public landing page. `app/dashboard/layout.tsx` wraps dashboard routes with the responsive `SideNav`; dashboard pages include the overview, savings placeholder, and spending CRUD screens.
- Components are server components by default. Dashboard cards, charts, tables, and pages fetch data on the server. Add `"use client"` only for browser interactivity such as search URL updates, navigation state, or form action state.
- `app/lib/data.ts` is the read/query layer. It uses the `postgres` package directly and returns typed records from the `invoices`, `customers`, and `revenue` tables. Amounts are stored as integer cents and formatted for display through `app/lib/utils.ts`.
- `app/lib/actions.ts` contains server actions for spending creation, editing, and deletion. These actions validate form input with Zod, write to Postgres, revalidate `/dashboard/spendings`, and redirect after successful create/update operations.
- Interactive spending forms in `app/ui/spendings/` call those server actions with React `useActionState`; the table and pagination are server-rendered from URL `query` and `page` parameters, while `app/ui/search.tsx` debounces changes and updates the URL.
- `app/query/route.ts` and `app/seed/route.ts` are route handlers. The query route reads invoices matching a hard-coded amount; the seed route creates/populates the demo tables from `app/lib/placeholder-data.ts`.
- `POSTGRES_URL` is used by the seed and query route handlers. `STORAGE_POSTGRES_URL` is used by the dashboard read and mutation layer. Keep this distinction when changing database access or deployment configuration; `cloudbuild.yaml` supplies both as secrets.
- Tailwind CSS is configured in `tailwind.config.ts`, with global styles in `app/ui/global.css`. Fonts are centralized in `app/ui/fonts.ts`, and the `@/*` TypeScript alias maps to the repository root.

## Repository conventions

- Keep database reads in `app/lib/data.ts` and mutations in `app/lib/actions.ts` rather than embedding SQL in UI components. Use the `postgres` tagged-template queries so values remain parameterized.
- Preserve the cents/dollars boundary: database invoice amounts are integer cents; form input is dollars and must be multiplied by 100 before insertion/update; display values should use `formatCurrency`.
- Reuse types from `app/lib/definitions.ts` and formatting/pagination helpers from `app/lib/utils.ts` instead of duplicating record shapes or display logic.
- Follow the existing server/client boundary. Pages and data-driven visual components should remain async server components; client components should be limited to hooks and event-driven behavior.
- Form validation errors use the `State` shape returned by server actions and are rendered next to the corresponding field with `aria-describedby` and live regions. Preserve this pattern when adding fields.
- After mutations, invalidate the affected route with `revalidatePath`; successful create/update actions redirect to `/dashboard/spendings`, while delete stays on the listing page.
- Dashboard data components use `Suspense` fallbacks from `app/ui/skeletons.tsx`; preserve the existing loading UX when adding another asynchronous dashboard section.
- Use the existing component organization: reusable visual primitives live in `app/ui/`, dashboard-specific components in `app/ui/dashboard/`, and spending-specific components in `app/ui/spendings/`. Use the `@/` alias for imports from the repository root.
- The UI is intentionally responsive: spending tables render separate mobile cards and desktop table markup, and the dashboard layout switches from a stacked mobile layout to a sidebar at the `md` breakpoint.
- The codebase currently contains both “invoice” domain names in data/actions/components and “spending” route/label names. Preserve existing exported names and database table names unless deliberately migrating the terminology across all affected layers.
- Use the repository's commit subject convention: `feat | fix | style | chore(feature | domain name): commit message`.
