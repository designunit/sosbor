import React from 'react'
import { Map, GeolocateControl, NavigationControl } from 'react-map-gl/mapbox'
import type { MapProps } from 'react-map-gl/mapbox'

type MapMapboxProps = {
    children: React.ReactNode
    onClick: MapProps["onClick"],
    initialViewState: MapProps["initialViewState"],
}

export default function MapMapbox({ children, onClick, initialViewState }: MapMapboxProps) {
    return (
        <Map
            hash
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            style={{ width: '100%', height: '100%' }}
            mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
            onClick={onClick}
            initialViewState={initialViewState}
        >
            <NavigationControl
                showZoom
                position='top-right'
                showCompass={false}
                visualizePitch={false}
                style={{
                    marginTop: '8rem',
                    marginRight: 16,
                }}
            />
            <GeolocateControl style={{ marginRight: 16 }} />
            { children }
        </Map>
    )
}
