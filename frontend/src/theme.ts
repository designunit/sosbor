import { AppShell, Button, Fieldset, Group, Text, Title, createTheme } from '@mantine/core'
import type { MantineColorArray } from '@/types'
import { fontVar } from '@/fonts'

import mobileMenu from './styles/mobileMenu.module.css'
import groupStyles from './styles/group.module.css'
import textStyles from './styles/text.module.css'
import titleStyles from './styles/title.module.css'
import buttonStyles from './styles/button.module.css'
import appShellStyles from './styles/appShell.module.css'

export { fontVar, mobileMenu, groupStyles, textStyles, titleStyles, buttonStyles, appShellStyles }

export const createColorTuple = (color: string): MantineColorArray =>
    [color, color, color, color, color, color, color, color, color, color]

export const theme = createTheme({
    colors: {
        primary: createColorTuple('rgb(233 79 43)'),
        secondary: createColorTuple('rgb(155 185 98)'),
        third: createColorTuple('rgb(247 236 209)'),
        dark: createColorTuple('rgb(4,30,73)'),
        black: createColorTuple('#1E1928'),
    },
    defaultRadius: 0,
    headings: {
        fontWeight: '600',
        sizes: {
            h1: {
                fontSize: '60px',
                lineHeight: '80px',
            },
            h2: {
                fontSize: '48px',
                lineHeight: '48px',
            },
        },
    },
    components: {
        AppShell: AppShell.extend({
            styles: {
                root: fontVar.style,
            },
        }),
        Title: Title.extend({
            defaultProps: {
                c: 'third',
            },
            styles: {
                root: {
                    ...fontVar.style,
                    fontWeight: '400',
                },
            },
            classNames: titleStyles
        }),
        Text: Text.extend({
            classNames: textStyles,
            defaultProps: {
                size: '20px',
            },
            styles: {
                root: {
                    color: '#1E1928CC',
                    lineHeight: '28px',
                },
            }
        }),
        Button: Button.extend({
            defaultProps: {
                c: 'white',
            },
            styles: {
                root: {
                    minHeight: 64,
                    outline: 'solid 1px var(--mantine-color-secondary-1)',
                    outlineOffset: 2,
                },
                label: {
                    fontSize: '20px',
                    lineHeight: '20px',
                    padding: '0px 30px',
                    fontWeight: 700,
                },
            },
            classNames: buttonStyles
        }),
        Group: Group.extend({
            classNames: groupStyles,
        }),
        Fieldset: Fieldset.extend({
            styles: {
                legend: {
                    fontWeight: 'bold',
                }
            }
        })
    },
    fontSizes: {
        lg: '20px',
        xs: '14px',
        base: '14px',
    },
    lineHeights: {
        lg: '29px',
        xs: '18px',
        base: '18px',
    },
})
