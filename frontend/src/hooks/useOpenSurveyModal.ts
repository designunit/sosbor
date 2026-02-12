"use client"

import { useModals } from "@mantine/modals"
import { surveySchema } from "@/surveySchema"

export function useOpenSurveyModal() {
    const modals = useModals()

    return () => {
        modals.openContextModal("survey", {
            centered: true,
            size: "min(100%, 900px)",
            withCloseButton: false,
            closeOnEscape: false,
            closeOnClickOutside: false,
            innerProps: {
                schema: surveySchema,
            },
        })
    }
}
