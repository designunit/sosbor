export type Coords = {
    longitude: number
    latitude: number
}

const DEFAULT_COORDS: Coords = {
    longitude: 29.076903,
    latitude: 59.896869,
}

export function parseCoords(preview: string | null): Coords {
    if (!preview) return DEFAULT_COORDS

    const parts = preview.split(',')
    if (parts.length !== 2) return DEFAULT_COORDS

    const longitude = Number(parts[0])
    const latitude = Number(parts[1])

    if (isNaN(longitude) || isNaN(latitude)) return DEFAULT_COORDS

    return { longitude, latitude }
}
