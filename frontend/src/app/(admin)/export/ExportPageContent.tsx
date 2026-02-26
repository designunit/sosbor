"use client"

import { Alert, Button, Group, Loader, Stack, Text, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import type { ReactElement } from "react"
import { useCallback, useEffect, useState } from "react"
import { DataGrid } from "react-data-grid"
import "react-data-grid/lib/styles.css"
import type { CsvColumn } from "@/lib/csv"
import { downloadCsv, featuresToCsv, getFeaturesColumns, getSurveysColumns, surveysToCsv } from "@/lib/csv"
import { fetchAllFeatures, fetchAllSurveys, getPocketBase } from "@/lib/pocketbase"
import { surveySchema } from "@/surveySchema"
import type { ExportDataState, FeatureRow, SurveyRecord } from "@/types"

type CsvPreviewTableProps = {
    columns: CsvColumn[]
    rows: Record<string, string>[]
    totalCount: number
}

function CsvPreviewTable({ columns, rows, totalCount }: CsvPreviewTableProps): ReactElement {
    const gridColumns = columns.map((col) => ({ key: col.key, name: col.header }))
    return (
        <Stack gap={8}>
            <Text size="sm" c="dimmed">
                Всего строк: {totalCount}. Показано: {rows.length}
            </Text>
            <DataGrid columns={gridColumns} rows={rows} />
        </Stack>
    )
}

function featureToRow(f: FeatureRow): Record<string, string> {
    return {
        id: f.id,
        content: f.content,
        lng: f.lng !== null ? String(f.lng) : "",
        lat: f.lat !== null ? String(f.lat) : "",
        created: f.created,
    }
}

function surveyToRow(survey: SurveyRecord, columns: CsvColumn[]): Record<string, string> {
    const answerMap = new Map<string, string>()
    for (const answer of survey.data) {
        answerMap.set(answer.id, Array.isArray(answer.value) ? answer.value.join(";") : String(answer.value))
    }
    const row: Record<string, string> = {}
    for (const col of columns) {
        if (col.key === "id") {
            row[col.key] = survey.id
        } else if (col.key === "created") {
            row[col.key] = survey.created
        } else {
            row[col.key] = answerMap.get(col.key) ?? ""
        }
    }
    return row
}

export function ExportPageContent(): ReactElement {
    const router = useRouter()
    const [dataState, setDataState] = useState<ExportDataState>({ status: "loading" })

    const loadData = useCallback(async (): Promise<void> => {
        setDataState({ status: "loading" })
        try {
            const [rawFeatures, surveys] = await Promise.all([fetchAllFeatures(), fetchAllSurveys()])
            const features: FeatureRow[] = rawFeatures.map((r) => ({
                id: r.id,
                content: r.content,
                lng: r.feature?.geometry?.coordinates?.[0] ?? null,
                lat: r.feature?.geometry?.coordinates?.[1] ?? null,
                created: r.created,
            }))
            setDataState({ status: "ready", features, surveys })
        } catch (err) {
            const message = err instanceof Error ? err.message : "Ошибка загрузки данных"
            setDataState({ status: "error", message })
        }
    }, [])

    useEffect(() => {
        if (!getPocketBase().authStore.isValid) {
            router.push("/login")
            return
        }
        void loadData()
    }, [router, loadData])

    if (dataState.status === "loading") {
        return (
            <Stack align="center">
                <Loader />
            </Stack>
        )
    }

    if (dataState.status === "error") {
        const handleReset = (): void => {
            router.push("/login")
        }
        return (
            <Stack>
                <Alert color="red" title="Ошибка загрузки">
                    {dataState.message}
                </Alert>
                <Group>
                    <Button onClick={loadData} w="fit-content">
                        Повторить
                    </Button>
                    <Button variant="subtle" onClick={handleReset} w="fit-content">
                        Войти заново
                    </Button>
                </Group>
            </Stack>
        )
    }

    if (dataState.status !== "ready") {
        return <Stack />
    }

    const { features, surveys } = dataState

    const featuresColumns = getFeaturesColumns()
    const surveysColumns = getSurveysColumns(surveySchema)

    const handleDownloadFeatures = (): void => {
        downloadCsv(featuresToCsv(features), "features.csv")
    }

    const handleDownloadSurveys = (): void => {
        downloadCsv(surveysToCsv(surveys, surveySchema), "surveys.csv")
    }

    return (
        <Stack>
            <Stack>
                <Group justify="space-between">
                    <Title order={2}>Предложения на карте</Title>
                </Group>
                <CsvPreviewTable
                    columns={featuresColumns}
                    rows={features.slice(0, 10).map(featureToRow)}
                    totalCount={features.length}
                />
                <Button onClick={handleDownloadFeatures} w="fit-content">
                    Скачать CSV
                </Button>
            </Stack>
            <Stack>
                <Group justify="space-between">
                    <Title order={2}>Опросы</Title>
                </Group>
                <CsvPreviewTable
                    columns={surveysColumns}
                    rows={surveys.slice(0, 10).map((s) => surveyToRow(s, surveysColumns))}
                    totalCount={surveys.length}
                />
                <Button onClick={handleDownloadSurveys} w="fit-content">
                    Скачать CSV
                </Button>
            </Stack>
        </Stack>
    )
}
