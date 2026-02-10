'use client'

import { Button, Group } from '@mantine/core'
import Link from 'next/link'
import { useOpenSurveyModal } from '@/hooks/useOpenSurveyModal'

export function HeroCTAButtons() {
    const openSurveyModal = useOpenSurveyModal()

    return (
        <Group>
            <Group
                gap={30}
                p={2}
                variant='noflip'
                visibleFrom='sm'
            >
                <Button
                    component={Link}
                    href='/map'
                    size='md'
                    w='fit-content'
                    bg={'secondary'}
                >
                    Карта идей
                </Button>
                <Button
                    onClick={openSurveyModal}
                    size='md'
                    w='fit-content'
                    bg={'secondary'}
                    c='primary'
                >
                    Пройти опрос
                </Button>
            </Group>
            <Group
                gap={30}
                p='24px 16px'
                hiddenFrom='sm'
            >
                <Button
                    component={Link}
                    href='/map'
                    size='xl'
                    w='100%'
                    bg={'secondary'}
                >
                    Карта идей
                </Button>
                <Button
                    onClick={openSurveyModal}
                    size='xl'
                    w='fit-content'
                    bg={'secondary'}
                    c='primary'
                >
                    Пройти опрос
                </Button>
            </Group>
        </Group>
    )
}
