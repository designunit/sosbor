export type Feature = {
    type: "Feature"
    properties: Record<string, unknown>
    geometry: {
        type: "Point"
        coordinates: [number, number]
    }
}

export type Submission = {
    id: string
    content: string
    feature: Feature
    collectionId?: string
    collectionName?: string
    created?: string
    isBanned?: boolean
    updated?: string
}

export type SubmissionResponse = {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: Submission[]
}
