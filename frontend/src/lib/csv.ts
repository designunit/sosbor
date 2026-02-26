import type { FeatureRow, SurveyRecord, SurveySchemaItem } from "@/types"

export type CsvColumn = { key: string; header: string }

export function getFeaturesColumns(): CsvColumn[] {
    return [
        { key: "id", header: "id" },
        { key: "content", header: "content" },
        { key: "lng", header: "lng" },
        { key: "lat", header: "lat" },
        { key: "created", header: "created" },
    ]
}

export function getSurveysColumns(schema: SurveySchemaItem[]): CsvColumn[] {
    const columns: CsvColumn[] = [
        { key: "id", header: "id" },
        { key: "created", header: "created" },
    ]
    for (const item of schema) {
        if ((item.type === "selectList" || item.type === "sliderList") && item.list) {
            item.list.forEach((label, i) => {
                columns.push({ key: `${item.id}-${i}`, header: `${item.text}: ${label}` })
            })
        } else {
            columns.push({ key: item.id, header: item.text })
        }
    }
    return columns
}

export function escapeCell(value: string): string {
    // Prevent spreadsheet formula injection: prefix dangerous leading characters with a literal quote.
    // Numeric values are exempt — they cannot execute formulas and must not be corrupted (e.g. coordinates like -73.9).
    const isNumeric = value !== "" && Number.isFinite(Number(value))
    const isFormula = !isNumeric && /^[=+\-@]/.test(value.trimStart())
    const sanitized = isFormula ? `'${value}` : value
    if (sanitized.includes(",") || sanitized.includes('"') || sanitized.includes("\n") || sanitized.includes("\r")) {
        return `"${sanitized.replace(/"/g, '""')}"`
    }
    return sanitized
}

function buildRow(cells: string[]): string {
    return cells.map(escapeCell).join(",")
}

export function featuresToCsv(features: FeatureRow[]): string {
    const columns = getFeaturesColumns()
    const header = buildRow(columns.map((c) => c.header))
    const rows = features.map((f) =>
        buildRow([
            f.id,
            f.content,
            f.lng !== null ? String(f.lng) : "",
            f.lat !== null ? String(f.lat) : "",
            f.created,
        ]),
    )
    return [header, ...rows].join("\n")
}

export function surveysToCsv(surveys: SurveyRecord[], schema: SurveySchemaItem[]): string {
    const allColumns = getSurveysColumns(schema)
    const schemaColumns = allColumns.slice(2) // skip id and created
    const headerRow = buildRow(allColumns.map((c) => c.header))
    const dataRows = surveys.map((survey) => {
        const answerMap = new Map<string, string>()
        for (const answer of survey.data) {
            answerMap.set(answer.id, Array.isArray(answer.value) ? answer.value.join(";") : String(answer.value))
        }
        return buildRow([survey.id, survey.created, ...schemaColumns.map((col) => answerMap.get(col.key) ?? "")])
    })
    return [headerRow, ...dataRows].join("\n")
}

export function downloadCsv(csvContent: string, filename: string): void {
    const BOM = "\uFEFF" // UTF-8 BOM: required for Cyrillic text in Excel
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    setTimeout(() => URL.revokeObjectURL(url), 10000)
}
