import type { Button } from '@mantine/core'

export type NavButton = {
    text: string
    href: string | null
    props?: React.ComponentPropsWithoutRef<typeof Button>
}

export const navButtons: NavButton[] = [
    {
        text: 'График проекта',
        href: '/#timeline',
    },
    {
        text: 'Карта идей',
        href: '/map',
    },
    {
        text: 'Пройти опрос',
        href: null,
    },
]
