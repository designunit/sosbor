import { Center, Loader } from "@mantine/core"
import type { ReactElement } from "react"
import { Suspense } from "react"
import { ExportPageContent } from "./ExportPageContent"

export default function ExportPage(): ReactElement {
    return (
        <Suspense
            fallback={
                <Center style={{ flex: "1 0 100%" }}>
                    <Loader color="primary" />
                </Center>
            }
        >
            <ExportPageContent />
        </Suspense>
    )
}
