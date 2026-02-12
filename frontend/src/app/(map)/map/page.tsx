import { Center, Loader } from "@mantine/core"
import { Suspense } from "react"
import { MapPageContent } from "./MapPageContent"

export default function MapPage() {
    return (
        <Suspense
            fallback={
                <Center style={{ flex: "1 0 100%" }}>
                    <Loader color="primary" />
                </Center>
            }
        >
            <MapPageContent />
        </Suspense>
    )
}
