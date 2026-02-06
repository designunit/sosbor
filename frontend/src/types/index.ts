// Context types
export type FormContextValue = {
    data: FormData
    setData: (data: FormData) => void
    addMode: boolean
    setAddMode: (mode: boolean) => void
}

export type FormData = {
    coords?: {
        lat?: number
        lng?: number
    }
    description?: string
}

export type NavbarContextValue = {
    selected: boolean
    setSelected: (selected: boolean) => void
    drawer: boolean
    setDrawer: (drawer: boolean | ((prev: boolean) => boolean)) => void
}

// Component prop types
export type IdeaModalDefaultValues = Partial<{
    description: string
    coords: { lat: number; lng: number }
}>

// Survey types
export type SurveyFormData = Record<string, string | string[] | number>

export type TabProps = {
    onSubmit?: (data: SurveyFormData) => void | Promise<void>
    setTabIndex?: React.Dispatch<React.SetStateAction<number>>
    submitText?: string
    onSubmitData?: (data: SurveyFormData) => void | Promise<void>
    globalFormValues?: SurveyFormData
}

// Event handler types
export type CheckboxChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void

// Mantine color helper
export type MantineColorArray = [string, string, string, string, string, string, string, string, string, string]
