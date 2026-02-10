'use client'

import { SWRConfig } from 'swr'
import { MapProvider } from 'react-map-gl/mapbox'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { FormContextProvider } from '@/contexts/form'
import { NavbarContextProvider } from '@/contexts/navbar'
import { IdeaModal } from '@/components/IdeaModal'
import { SurveyModal } from '@/components/SurveyModal'
import { theme } from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher: (resource: string, init: RequestInit) => fetch(resource, init).then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    return res.json()
                }),
            }}
        >
            <MapProvider>
                <FormContextProvider>
                    <NavbarContextProvider>
                        <MantineProvider theme={theme}>
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
