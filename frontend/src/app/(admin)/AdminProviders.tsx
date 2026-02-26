"use client"
import { MantineProvider } from "@mantine/core"
import type { ReactNode } from "react"
import { adminTheme } from "./adminTheme"

export function AdminProviders({ children }: { children: ReactNode }) {
    return <MantineProvider theme={adminTheme}>{children}</MantineProvider>
}
