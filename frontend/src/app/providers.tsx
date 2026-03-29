"use client"

import { createTheme, MantineProvider } from "@mantine/core"
import { MapProvider } from "react-map-gl/mapbox"
import { SWRConfig } from "swr"
import { FormContextProvider } from "@/contexts/form"
import { NavbarContextProvider } from "@/contexts/navbar"
import { themeColors } from "@/theme"

const globalTheme = createTheme({ colors: themeColors })

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
                        <MantineProvider theme={globalTheme} defaultColorScheme="light">
                            {children}
                        </MantineProvider>
                    </NavbarContextProvider>
                </FormContextProvider>
            </MapProvider>
        </SWRConfig>
    )
}
