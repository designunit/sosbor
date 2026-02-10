'use client'

import { Image, Space, Stack, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export function TimelineSection() {
    const isMobile = useMediaQuery('(max-width: 768px)', true)

    return (
        <>
            <Space h={80} />
            <Stack
                flex={'2 1 auto'}
                gap={isMobile ? 22 : 0}
                style={{
                    position: 'relative',
                }}
            >
                <span
                    id='timeline'
                    style={{
                        position: 'absolute',
                        top: '-180px',
                    }}
                />
                <Title
                    order={2}
                    ta={isMobile ? 'center' : undefined}
                >
                    ГРАФИК ПРОЕКТА
                </Title>
                <Image
                    src={isMobile ? 'indexRoadmapMobile.svg' : 'indexRoadmap.svg'}
                    alt=''
                />
            </Stack>
        </>
    )
}
