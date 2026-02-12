"use client"

import { Button, Group } from "@mantine/core"
import { useOpenSurveyModal } from "@/hooks/useOpenSurveyModal"

export type SurveyButtonProps = {
    bg?: string
    c?: string
}

export function SurveyButton({ bg = "secondary", c }: SurveyButtonProps) {
    const openSurveyModal = useOpenSurveyModal()

    return (
        <Group p={6}>
            <Button onClick={openSurveyModal} size="sm" bg={bg} c={c} visibleFrom="sm">
                Пройти опрос
            </Button>
            <Button onClick={openSurveyModal} size="xl" bg={bg} c={c} hiddenFrom="sm">
                Пройти опрос
            </Button>
        </Group>
    )
}
