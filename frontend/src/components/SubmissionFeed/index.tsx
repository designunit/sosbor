"use client"

import { ActionIcon, Alert, Box, Button, Group, ScrollArea, Skeleton, Stack, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useModals } from "@mantine/modals"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"
import useSWRInfinite from "swr/infinite"
import { FormContext } from "@/contexts/form"
import { useHasMounted } from "@/contexts/hasMounted"
import { NavbarContext } from "@/contexts/navbar"
import type { Feature, Submission, SubmissionResponse } from "@/types/submission"
import { Item } from "./Item"
import s from "./index.module.css"

export type { Feature, Submission, SubmissionResponse }

export function SubmissionFeed() {
    const searchParams = useSearchParams()
    const pointId = searchParams.get("pointId")
    const hasMounted = useHasMounted()
    const isMobile = useMediaQuery("(max-width: 768px)", true)
    const { data, error, isLoading, size, setSize } = useSWRInfinite(
        (pageIndex, previousPageData) => {
            if (previousPageData && !previousPageData.hasNextPage) return null
            return `/api/collections/features/records?page=${pageIndex + 1}` // swr starts at 0, pb at 1
        },
        (url) =>
            fetch(url, {
                method: "get",
            }).then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                return await res.json()
            }),
    )
    const dataFlat =
        isLoading || error || !data
            ? []
            : data
                  .flatMap((x) => x.items)
                  .sort((a, b) => {
                      if (!pointId) return 0
                      if (a.id === pointId) return -1
                      if (b.id === pointId) return 1
                      return 0
                  })

    // on query.pointId fetch up to amount of items in /index
    // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
    useEffect(() => {
        if (pointId) {
            if (!dataFlat.find((x) => x.id === pointId)) {
                setSize(10)
            }
        }
    }, [])

    const modals = useModals()
    const { setDrawer } = useContext(NavbarContext)
    const { addMode } = useContext(FormContext)

    if (!hasMounted || isLoading) {
        return (
            <Stack p="md">
                <Skeleton height={"300px"} width={"100%"} />
                <Skeleton height={"200px"} width={"100%"} />
                <Skeleton height={"200px"} width={"100%"} />
                <Skeleton height={"300px"} width={"100%"} />
                <Skeleton height={"400px"} width={"100%"} />
            </Stack>
        )
    }

    if (hasMounted && (error || Boolean(data?.[0]?.error))) {
        return (
            <Alert color="red" m="md">
                Ошибка, что-то поломалось ):
            </Alert>
        )
    }

    return (
        <>
            <Box p="md" pt={isMobile ? 16 : 20}>
                <Group justify="space-between" variant="noflip">
                    <Text
                        // order={3}
                        fw="bold"
                        // component={Text}
                        className={s.title}
                    >
                        Предложения жителей
                    </Text>
                    <ActionIcon
                        hiddenFrom="lg" // 'md'
                        onClick={() => setDrawer((drawer) => !drawer)}
                        size="lg"
                        variant="light"
                        bg="secondary"
                        c="white"
                        style={{
                            borderRadius: 40,
                        }}
                    >
                        {"<-"}
                    </ActionIcon>
                </Group>
            </Box>
            <ScrollArea scrollbars="y" p="md">
                {Boolean(!isLoading && !error) && dataFlat.length === 0 && (
                    <Stack
                        justify="center"
                        align="center"
                        style={{
                            height: "75vh",
                        }}
                    >
                        <Text style={{ textAlign: "center" }}>Пока нет предложений. Сделайте первое!</Text>
                        {modals.modals.length > 0 || addMode ? null : (
                            <Button
                                size="md"
                                onClick={() => {
                                    modals.openContextModal("idea", {
                                        centered: true,
                                        size: "min(100%, 650px)",
                                        // radius: 'xl',
                                        withCloseButton: false,
                                        innerProps: {
                                            defaultValues: data,
                                        },
                                    })
                                }}
                                bg="secondary"
                                c="primary"
                                style={{
                                    outlineOffset: "2px",
                                    outline: "1px solid var(--mantine-color-secondary-1)",
                                }}
                            >
                                Предложить идею
                            </Button>
                        )}
                    </Stack>
                )}
                <Stack gap="md" pb={12} className={s.scrollAreaStack}>
                    {dataFlat.map((x) => (
                        <Item key={x.id} data={x} />
                    ))}
                    {!isLoading && data && data[0]?.totalItems !== dataFlat.length && (
                        <Button onClick={() => setSize(size + 1)} bg="primary">
                            Загрузить больше предложений
                        </Button>
                    )}
                </Stack>
            </ScrollArea>
        </>
    )
}
