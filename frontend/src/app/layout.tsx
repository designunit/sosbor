import { ColorSchemeScript } from '@mantine/core'
import { fontVar } from '@/fonts'
import { Providers } from './providers'

import '@mantine/core/styles.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Мастер-план Сосновоборского городского округа',
    description: 'Приветствуем вас на сайте, посвящённом разработке мастер-плана Соснового бора.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
            </head>
            <body className={fontVar.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
