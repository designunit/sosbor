import type { CsvColumn } from "@/lib/csv"
import { escapeCell } from "@/lib/csv"
import type { FeatureRow, SurveyRecord, SurveySchemaItem } from "@/types"

function buildRow(cells: string[]): string {
    return cells.map(escapeCell).join(",")
}

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
