"use client"

import { ActionIcon, Card, Group, ScrollArea, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"
import { useMap } from "react-map-gl/mapbox"
import { NavbarContext } from "@/contexts/navbar"
import type { Submission } from "."

type ItemProps = {
    data: Submission
}

export function Item({ data }: ItemProps) {
    const searchParams = useSearchParams()
    const pointId = searchParams.get("pointId")
    const [, { toggle }] = useDisclosure(false)
    const { setDrawer } = useContext(NavbarContext)
    const { default: map } = useMap()

    // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
    useEffect(() => {
        if (pointId === data.id) {
            toggle()
        }
    }, [])

    return (
        <Card
            withBorder
            padding="md"
            style={{
                border: "solid 1px var(--mantine-color-secondary-1)",
            }}
        >
            <Stack>
                <ScrollArea.Autosize type="auto" mah={200}>
                    <Text>{data.content}</Text>
                </ScrollArea.Autosize>
                <Group variant="noflip">
                    {data?.feature?.geometry?.coordinates?.length === 2 && (
                        <ActionIcon
                            variant="light"
                            size="md"
                            radius="xl"
                            bd={"2px solid var(--mantine-color-primary-text)"}
                            ml={"auto"}
                            bg={"white"}
                            onClick={() => {
                                setDrawer(false)
                                map?.flyTo({
                                    center: data.feature.geometry.coordinates,
                                    zoom: 15,
                                })
                            }}
                        >
                            <svg
                                width="16"
                                height="22"
                                viewBox="0 0 64 98"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_113_61)">
                                    <circle cx="32" cy="32" r="32" fill="var(--mantine-color-primary-text)" />
                                    <path d="M32 62L32 98" stroke="var(--mantine-color-primary-text)" strokeWidth="8" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_113_61">
                                        <rect width="64" height="98" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </ActionIcon>
                    )}
                </Group>
            </Stack>
        </Card>
    )
}
