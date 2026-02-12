import type React from "react"
import type { MapProps } from "react-map-gl/maplibre"
import { GeolocateControl, Map, NavigationControl } from "react-map-gl/maplibre"

type MapMaplibreProps = {
    children: React.ReactNode
    onClick: MapProps["onClick"]
    initialViewState: MapProps["initialViewState"]
}

export default function MapMaplibre({ children, onClick, initialViewState }: MapMaplibreProps) {
    return (
        <Map
            hash
            style={{ width: "100%", height: "100%" }}
            mapStyle={process.env.NEXT_PUBLIC_MAPLIBRE_STYLE}
            onClick={onClick}
            initialViewState={initialViewState}
        >
            <NavigationControl
                showZoom
                position="top-right"
                showCompass={false}
                visualizePitch={false}
                style={{
                    marginTop: "8rem",
                    marginRight: 16,
                }}
            />
            <GeolocateControl style={{ marginRight: 16 }} />
            {children}
        </Map>
    )
}
