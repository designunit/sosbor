import { Context, createContext, useState } from 'react'
import { FormContextValue, FormData } from '@/types'

export const FormContext: Context<FormContextValue> = createContext<FormContextValue>({
    data: {},
    setData: () => null,
    addMode: false,
    setAddMode: () => null,
})

export const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<FormData>({})
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
