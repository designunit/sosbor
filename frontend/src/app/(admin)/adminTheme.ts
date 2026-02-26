import { createTheme } from "@mantine/core"
import { createColorTuple } from "@/theme"

export const adminTheme = createTheme({
    colors: {
        primary: createColorTuple("rgb(233 79 43)"),
        secondary: createColorTuple("rgb(155 185 98)"),
        third: createColorTuple("rgb(247 236 209)"),
        dark: createColorTuple("rgb(4,30,73)"),
        black: createColorTuple("#1E1928"),
    },
})
