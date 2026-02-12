"use client"

import type { Context } from "react"
import { createContext, useState } from "react"
import type { NavbarContextValue } from "@/types"

export const NavbarContext: Context<NavbarContextValue> = createContext<NavbarContextValue>({
    selected: false,
    setSelected: () => null,
    drawer: false,
    setDrawer: () => null,
})

export const NavbarContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [selected, setSelected] = useState(false)
    const [drawer, setDrawer] = useState(false)

    return (
        <NavbarContext.Provider
            value={{
                selected,
                setSelected,
                drawer,
                setDrawer,
            }}
        >
            {children}
        </NavbarContext.Provider>
    )
}
