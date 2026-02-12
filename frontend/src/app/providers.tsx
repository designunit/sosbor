"use client"

import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { MapProvider } from "react-map-gl/mapbox"
import { SWRConfig } from "swr"
import { IdeaModal } from "@/components/IdeaModal"
import { SurveyModal } from "@/components/SurveyModal"
import { FormContextProvider } from "@/contexts/form"
import { NavbarContextProvider } from "@/contexts/navbar"
import { theme } from "@/theme"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher: (resource: string, init: RequestInit) =>
                    fetch(resource, init).then((res) => {
                        if (!res.ok) throw new Error(`HTTP ${res.status}`)
                        return res.json()
                    }),
            }}
        >
            <MapProvider>
                <FormContextProvider>
                    <NavbarContextProvider>
                        <MantineProvider theme={theme} defaultColorScheme="light">
                            <ModalsProvider
                                modals={{
                                    idea: IdeaModal,
                                    survey: SurveyModal,
                                }}
                            >
                                {children}
                            </ModalsProvider>
                        </MantineProvider>
                    </NavbarContextProvider>
                </FormContextProvider>
            </MapProvider>
        </SWRConfig>
    )
}
