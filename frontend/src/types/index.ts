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
    schema: SurveySchemaItem[]
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

// Gallery types
export type GalleryImage = {
    src: string
    alt?: string
}

// News types
export type NewsData = {
    id: string
    title: string
    content_html: string
    image: {
        url: string
        width: number
        height: number
        thumbnail: {
            url: string
            width: number
            height: number
        }
        alt?: string
    }
}

// Survey schema types
export type SurveySchemaItem = {
    id: string
    type: string
    text: string
    description?: string
    data?: string[]
    list?: string[]
    maxValues?: number
    rows?: number
    marks?: number[]
}

// Map types
export type MapClickEvent = {
    lngLat: {
        lng: number
        lat: number
    }
    point: {
        x: number
        y: number
    }
    originalEvent: MouseEvent
}

// Best submissions types
export type BestSubmission = {
    id: string
    description: string
    isPoint?: [number, number]
    comments: number
}

// Export page types
export type FeatureRecord = {
    id: string
    content: string
    feature?: {
        type: "Feature"
        properties: Record<string, unknown>
        geometry: { type: "Point"; coordinates: [number, number] }
    }
    isBanned: boolean
    created: string
    updated: string
}

export type SurveyAnswerItem = {
    id: string
    text: string
    value: string | string[] | number
}

export type SurveyRecord = {
    id: string
    data: SurveyAnswerItem[]
    created: string
    updated: string
}

export type FeatureRow = {
    id: string
    content: string
    lng: number
    lat: number
    created: string
}

export type ExportAuthState = { status: "idle" } | { status: "authenticated" }

export type ExportDataState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "ready"; features: FeatureRow[]; surveys: SurveyRecord[] }
