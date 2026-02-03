import { Context, createContext, useState } from 'react'

export const FormContext: Context<any> = createContext({
    data: {},
    setData: () => null,
    addMode: false,
    setAddMode: () => null,
})

export const FormContextProvider = ({ children }: { children: any }) => {
    const [data, setData] = useState({

    })

    const [addMode, setAddMode] = useState(false)

    return (
        <FormContext.Provider
            value={{
                data,
                setData,
                addMode,
                setAddMode,
            }}
        >
            {children}
        </FormContext.Provider>
    )
}
