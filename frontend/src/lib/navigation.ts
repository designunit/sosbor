import type { Button } from "@mantine/core"
import type { MouseEvent } from "react"

export type NavButton = {
    text: string
    href: string | null
    props?: React.ComponentPropsWithoutRef<typeof Button>
}

export const navButtons: NavButton[] = [
    {
        text: "График проекта",
        href: "/#timeline",
    },
    {
        text: "Карта идей",
        href: "/map",
    },
    {
        text: "Пройти опрос",
        href: null,
    },
]

export function scrollToHash(href: string, e: MouseEvent) {
    const hash = href.split("#")[1]
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: "smooth" })
    }
}
