"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Group, Loader, PasswordInput, Stack, Table, Text, TextInput, Title } from "@mantine/core"
import type { ReactElement } from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { downloadCsv, featuresToCsv, surveysToCsv } from "@/lib/exportCsv"
import { fetchAllFeatures, fetchAllSurveys, loginAsSuperuser } from "@/lib/pocketbase"
import { surveySchema } from "@/surveySchema"
import type { ExportAuthState, ExportDataState, FeatureRow, SurveyRecord } from "@/types"

const loginSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(1, "Введите пароль"),
})

type LoginFormData = z.infer<typeof loginSchema>

type LoginFormProps = {
    onSuccess: () => void
}

function LoginForm({ onSuccess }: LoginFormProps): ReactElement {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData): Promise<void> => {
        setLoading(true)
        setError(null)
        try {
            await loginAsSuperuser(data.email, data.password)
            setLoading(false)
            onSuccess()
        } catch (err) {
            setLoading(false)
            setError(err instanceof Error ? err.message : "Ошибка входа")
        }
    }

    return (
        <Stack maw={400}>
            <Title order={2}>Вход для суперпользователя</Title>
            {error && (
                <Alert color="red" title="Ошибка">
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextInput {...field} label="Email" type="email" error={errors.email?.message} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <PasswordInput {...field} label="Пароль" error={errors.password?.message} />
                        )}
                    />
                    <Button type="submit" loading={loading}>
                        Войти
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}

type FeaturesTableProps = {
    features: FeatureRow[]
}

function FeaturesTable({ features }: FeaturesTableProps): ReactElement {
    const preview = features.slice(0, 10)
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>id</Table.Th>
                    <Table.Th>content</Table.Th>
                    <Table.Th>lng</Table.Th>
                    <Table.Th>lat</Table.Th>
                    <Table.Th>created</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {preview.map((row) => (
                    <Table.Tr key={row.id}>
                        <Table.Td>{row.id}</Table.Td>
                        <Table.Td>{row.content}</Table.Td>
                        <Table.Td>{row.lng}</Table.Td>
                        <Table.Td>{row.lat}</Table.Td>
                        <Table.Td>{row.created}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}

type SurveysTableProps = {
    surveys: SurveyRecord[]
}

function SurveysTable({ surveys }: SurveysTableProps): ReactElement {
    const preview = surveys.slice(0, 10)
    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>id</Table.Th>
                    <Table.Th>created</Table.Th>
                    <Table.Th>Ответов</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {preview.map((row) => (
                    <Table.Tr key={row.id}>
                        <Table.Td>{row.id}</Table.Td>
                        <Table.Td>{row.created}</Table.Td>
                        <Table.Td>{row.data.length}</Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    )
}

export function ExportPageContent(): ReactElement {
    const [authState, setAuthState] = useState<ExportAuthState>({ status: "idle" })
    const [dataState, setDataState] = useState<ExportDataState>({ status: "idle" })

    const loadData = async (): Promise<void> => {
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
    }

    const handleAuthSuccess = async (): Promise<void> => {
        setAuthState({ status: "authenticated" })
        await loadData()
    }

    if (authState.status !== "authenticated") {
        return (
            <Stack py={40}>
                <LoginForm onSuccess={handleAuthSuccess} />
            </Stack>
        )
    }

    if (dataState.status === "loading") {
        return (
            <Stack py={40} align="center">
                <Loader />
            </Stack>
        )
    }

    if (dataState.status === "error") {
        return (
            <Stack py={40}>
                <Alert color="red" title="Ошибка загрузки">
                    {dataState.message}
                </Alert>
                <Button onClick={loadData} w="fit-content">
                    Повторить
                </Button>
            </Stack>
        )
    }

    if (dataState.status !== "ready") {
        return <Stack py={40} />
    }

    const { features, surveys } = dataState

    const handleDownloadFeatures = (): void => {
        downloadCsv(featuresToCsv(features), "features.csv")
    }

    const handleDownloadSurveys = (): void => {
        downloadCsv(surveysToCsv(surveys, surveySchema), "surveys.csv")
    }

    return (
        <Stack py={40}>
            <Stack>
                <Group justify="space-between">
                    <Title order={2}>Предложения на карте</Title>
                    <Text c="dimmed">Всего: {features.length}</Text>
                </Group>
                <FeaturesTable features={features} />
                <Button onClick={handleDownloadFeatures} w="fit-content">
                    Скачать CSV
                </Button>
            </Stack>
            <Stack>
                <Group justify="space-between">
                    <Title order={2}>Опросы</Title>
                    <Text c="dimmed">Всего: {surveys.length}</Text>
                </Group>
                <SurveysTable surveys={surveys} />
                <Button onClick={handleDownloadSurveys} w="fit-content">
                    Скачать CSV
                </Button>
            </Stack>
        </Stack>
    )
}
