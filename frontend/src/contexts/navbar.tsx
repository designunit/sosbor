import { Context, createContext, useState } from 'react'

export const NavbarContext: Context<any> = createContext({
    selected: false,
    setSelected: () => null,

    drawer: false,
    setDrawer: () => null,
})

export const NavbarContextProvider = ({ children }: { children: any }) => {
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
