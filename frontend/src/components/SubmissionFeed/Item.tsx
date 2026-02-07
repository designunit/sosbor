import { Card, Stack, Text, Group, ScrollArea, ActionIcon } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { Submission } from '.'
import { useMap } from 'react-map-gl/maplibre'
import { NavbarContext } from '@/contexts/navbar'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useEffectOnce } from 'react-use'

type ItemProps = {
    data: Submission
}

export function Item({ data }: ItemProps) {
    const router = useRouter()
    const [, { toggle }] = useDisclosure(false)
    const { setDrawer } = useContext(NavbarContext)
    const { default: map } = useMap()

    useEffectOnce(() => {
        if (router.query?.pointId == data.id) {
            toggle()
        }
    })

    return (
        <Card
            withBorder
            padding='md'
            bg={'secondary'}
            style={{
                // border: 'solid 2px var(--mantine-color-secondary-text)',
                // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            }}
        >
            <Stack>
                <ScrollArea.Autosize
                    type='auto'
                    mah={200}
                >
                    <Text
                        c='white'
                    >
                        {data.content}
                    </Text>
                </ScrollArea.Autosize>
                <Group
                    variant='noflip'
                >
                    {JSON.stringify(data?.feature) !== '{}' && (
                        <ActionIcon
                            variant='light'
                            size='md'
                            radius='xl'
                            bd={'2px solid var(--mantine-color-primary-text)'}
                            ml={'auto'}
                            bg={'white'}
                            onClick={() => {
                                setDrawer(false)
                                map?.flyTo({
                                    center: data.feature.geometry.coordinates,
                                    zoom: 15,
                                })
                            }}
                        >
                            <svg width="16" height="22" viewBox="0 0 64 98" fill="none" xmlns="http://www.w3.org/2000/svg">
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