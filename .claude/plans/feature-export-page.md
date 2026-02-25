# Plan: /export page

## Context

The project collects citizen feedback via map submissions (`features` collection) and surveys (`surveys` collection). There is no admin UI to export this data. A new `/export` page is needed so a superuser can preview and download both datasets as CSV files. The page must authenticate using the PocketBase JS SDK and only show data to verified superusers.

---

## Files to Create / Modify

| File                                                              | Action   |
|-------------------------------------------------------------------|----------|
| `frontend/package.json`                                           | add dep  |
| `frontend/src/types/index.ts`                                     | add types|
| `frontend/src/lib/pocketbase.ts`                                  | create   |
| `frontend/src/lib/exportCsv.ts`                                   | create   |
| `frontend/src/app/(default)/export/page.tsx`                      | create   |
| `frontend/src/app/(default)/export/ExportPageContent.tsx`         | create   |

---

## Implementation

### Task 1: Add pocketbase dependency
- [x] Add `"pocketbase": "^0.22.0"` to `frontend/package.json` `dependencies`
- [x] Run `npm install` from `frontend/`

---

### Task 2: Add types to `src/types/index.ts`

Append to the end of the file:

```typescript
// Export page types
export type FeatureRecord = {
    id: string
    content: string
    feature: {
        type: "Feature"
        properties: Record<string, unknown>
        geometry: { type: "Point"; coordinates: [number, number] }
    }
    isBanned: boolean
    created: string
    updated: string
}

export type SurveyAnswerItem = {
    id: string
    text: string
    value: string | string[] | number
}

export type SurveyRecord = {
    id: string
    data: SurveyAnswerItem[]
    created: string
    updated: string
}

export type FeatureRow = {
    id: string
    content: string
    lng: number
    lat: number
    created: string
}

export type ExportAuthState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "authenticated" }

export type ExportDataState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; features: FeatureRow[]; surveys: SurveyRecord[] }
```

- [x] Append export page types (FeatureRecord, SurveyAnswerItem, SurveyRecord, FeatureRow, ExportAuthState, ExportDataState) to `frontend/src/types/index.ts`

---

### Task 3: Create `src/lib/pocketbase.ts`

Module-level singleton; only imported by client components.

```typescript
import PocketBase from "pocketbase"
import type { FeatureRecord, SurveyRecord } from "@/types"

let pbInstance: PocketBase | null = null

export function getPocketBase(): PocketBase {
    if (!pbInstance) {
        pbInstance = new PocketBase(window.location.origin)
    }
    return pbInstance
}

export async function loginAsSuperuser(email: string, password: string): Promise<void> {
    const pb = getPocketBase()
    await pb.collection("_superusers").authWithPassword(email, password)
    if (!pb.authStore.isAdmin) {
        throw new Error("Authenticated user is not a superuser")
    }
}

export async function fetchAllFeatures(): Promise<FeatureRecord[]> {
    const pb = getPocketBase()
    const records = await pb.collection("features").getFullList({ sort: "-created" })
    return records as unknown as FeatureRecord[]
}

export async function fetchAllSurveys(): Promise<SurveyRecord[]> {
    const pb = getPocketBase()
    const records = await pb.collection("surveys").getFullList({ sort: "-created" })
    return records as unknown as SurveyRecord[]
}
```

Notes:
- `_superusers` is the PocketBase v0.22+ collection for admin auth; admin tokens bypass all collection `listRule`/`viewRule` restrictions
- `as unknown as T[]` is the canonical strict-mode cast for PocketBase `RecordModel` — avoids `any`, isolated to this module
- Singleton pattern: one `PocketBase` instance per browser session; SDK stores token in `localStorage`

- [x] Create `frontend/src/lib/pocketbase.ts` with singleton `getPocketBase()`, `loginAsSuperuser()`, `fetchAllFeatures()`, `fetchAllSurveys()`

---

### Task 4: Create `src/lib/exportCsv.ts`

Pure utilities, no React. Reuses `SurveySchemaItem` from `@/types`.

```typescript
import type { FeatureRow, SurveyRecord } from "@/types"
import type { SurveySchemaItem } from "@/types"

function escapeCell(value: string): string {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`
    }
    return value
}

function buildRow(cells: string[]): string {
    return cells.map(escapeCell).join(",")
}

export function featuresToCsv(features: FeatureRow[]): string {
    const header = buildRow(["id", "content", "lng", "lat", "created"])
    const rows = features.map((f) =>
        buildRow([f.id, f.content, String(f.lng), String(f.lat), f.created])
    )
    return [header, ...rows].join("\n")
}

export function surveysToCsv(surveys: SurveyRecord[], schema: SurveySchemaItem[]): string {
    // Build column list; expand selectList questions to one column per list item
    const columns: Array<{ key: string; header: string }> = []
    for (const item of schema) {
        if (item.type === "selectList" && item.list) {
            item.list.forEach((label, i) => {
                columns.push({ key: `${item.id}-${i}`, header: `${item.text}: ${label}` })
            })
        } else {
            columns.push({ key: item.id, header: item.text })
        }
    }
    const headerRow = buildRow(["id", "created", ...columns.map((c) => c.header)])
    const dataRows = surveys.map((survey) => {
        const answerMap = new Map<string, string>()
        for (const answer of survey.data) {
            answerMap.set(answer.id, Array.isArray(answer.value) ? answer.value.join(";") : String(answer.value))
        }
        return buildRow([survey.id, survey.created, ...columns.map((col) => answerMap.get(col.key) ?? "")])
    })
    return [headerRow, ...dataRows].join("\n")
}

export function downloadCsv(csvContent: string, filename: string): void {
    const BOM = "\uFEFF"  // UTF-8 BOM: required for Cyrillic text in Excel
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = filename
    anchor.click()
    URL.revokeObjectURL(url)
}
```

Note: `selectList` question `dd7afc2c-…` has 13 items → 13 extra columns in surveys CSV.
Multi-value answers (checkboxes) joined with `;`.

- [x] Create `frontend/src/lib/exportCsv.ts` with `featuresToCsv`, `surveysToCsv`, `downloadCsv`

---

### Task 5: Create `src/app/(default)/export/page.tsx`

- [x] Create `frontend/src/app/(default)/export/page.tsx` as thin server component with Suspense + Loader fallback

Mirrors `(map)/map/page.tsx` exactly (thin server component + Suspense):

```typescript
import { Center, Loader } from "@mantine/core"
import { Suspense } from "react"
import { ExportPageContent } from "./ExportPageContent"

export default function ExportPage() {
    return (
        <Suspense fallback={<Center style={{ flex: "1 0 100%" }}><Loader color="primary" /></Center>}>
            <ExportPageContent />
        </Suspense>
    )
}
```

---

### Task 6: Create `src/app/(default)/export/ExportPageContent.tsx`

Client component. Three internal sub-components + main export.

**State machine** using `ExportAuthState` and `ExportDataState` discriminated unions.

**`LoginForm`**: email + password fields using `react-hook-form` (already a dep). Calls `loginAsSuperuser()`, surfaces errors in `Alert`. On success calls `onSuccess` callback.

**`FeaturesTable`**: Mantine `Table` showing `id, content, lng, lat, created`. Preview: first 10 rows.

**`SurveysTable`**: Mantine `Table` showing `id, created, answer count`. Full column expansion (46+ columns) is too wide for preview — show a summary "Ответов: N" column instead.

**`ExportPageContent`**:
- Before auth: renders `LoginForm`
- `handleAuthSuccess`: sets `authenticated` state, then `Promise.all([fetchAllFeatures(), fetchAllSurveys()])`, filters `isBanned` features, transforms to `FeatureRow[]`
- After data loads: two sections (Features, Surveys), each with `Title`, row count, preview `Table`, "Скачать CSV" `Button`
- Coordinate extraction: `r.feature?.geometry?.coordinates?.[0] ?? 0` (defensive for malformed records)

Layout note: the `(default)` layout wraps children in `<Box maw={1440} px={...}>`, so **no extra `Container`** needed at the top level — use `Stack py={40}` directly.

---

## Verification

1. `cd frontend && npm run type-check` — must pass with no errors
2. `npm run check` — Biome lint + format must pass
3. Navigate to `/export` — login form appears
4. Log in with superuser credentials — data loads, preview tables render
5. Click "Скачать CSV" for features — file downloads, open in Excel, verify Cyrillic renders, check `lng, lat` columns, confirm no banned rows
6. Click "Скачать CSV" for surveys — file downloads, verify column headers are question texts, check `selectList` question expands to multiple columns
