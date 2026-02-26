import { Box } from "@mantine/core"
import type { ReactNode } from "react"
import { AdminHeader } from "./AdminHeader"
import { AdminProviders } from "./AdminProviders"

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AdminProviders>
            <Box>
                <AdminHeader />
                <Box maw={1200} mx="auto" px={{ base: 20, sm: 40 }} py={40}>
                    {children}
                </Box>
            </Box>
        </AdminProviders>
    )
}
