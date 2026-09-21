"use client"

import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import type { ReactNode } from "react"
import { IdeaModal } from "@/components/IdeaModal"
import { SurveyModal } from "@/components/SurveyModal"
import { theme } from "@/theme"

export function PublicProviders({ children }: { children: ReactNode }) {
    return (
        <div data-public>
            <MantineProvider theme={theme} cssVariablesSelector="[data-public]">
                <ModalsProvider modals={{ idea: IdeaModal, survey: SurveyModal }}>{children}</ModalsProvider>
            </MantineProvider>
        </div>
    )
}
