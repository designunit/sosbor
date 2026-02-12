"use client"

import { Button } from "@mantine/core"
import Link from "next/link"

export function MapCTAButton() {
    return (
        <>
            <Button component={Link} href="/map" size="sm" bg={"secondary"} visibleFrom="sm">
                Карта идей
            </Button>
            <Button component={Link} href="/map" size="xl" bg={"secondary"} hiddenFrom="sm">
                Карта идей
            </Button>
        </>
    )
}
