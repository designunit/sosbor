import { useContext } from 'react'
import { Layer, Marker, Source } from 'react-map-gl/mapbox'
import { useModals } from '@mantine/modals'
import { useRouter } from 'next/router'
import { FormContext } from '@/contexts/form'
import useSWR from 'swr'
import { Popover, ScrollArea, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type { MapClickEvent } from '@/types'
import type { Submission } from '@/types/submission'

import 'mapbox-gl/dist/mapbox-gl.css'

import MapMapbox from '../MapMapbox'

type MapProps = {
    initialCoords: {
        longitude: number | undefined
        latitude: number | undefined
    }
}

export function Map({ initialCoords }: MapProps) {
    const { data, error, isLoading } = useSWR(
        `/api/collections/features/records?perPage=1000`,
        (url) => fetch(
            url,
            {
                method: 'get',
            }
        ).then(async res => await res.json())
    )

    const modals = useModals()
    const { data: formData, setData, addMode, setAddMode } = useContext(FormContext)

    const onClick = (event: MapClickEvent) => {
        if (!addMode) return

        const { lngLat } = event
        setData({
            ...formData,
            coords: lngLat,
        })
        modals.openContextModal(
            'idea',
            {
                centered: true,
                size: 'min(100%, 650px)',
                // radius: 'xl',
                withCloseButton: false,
                onClose: () => setAddMode(false),
                innerProps: {
                    defaultValues: {
                        ...formData,
                        coords: lngLat,
                    },
                },
            }
        )
        setAddMode(false)
    }

    const isMobile = useMediaQuery('(max-width: 768px)', true, { getInitialValueInEffect: false })
    const router = useRouter()
    const isPreview = Boolean(router.query?.preview) == true

    const features: Submission[] = (data?.items ?? [])
        .filter((x: Submission) => x?.feature && JSON.stringify(x?.feature) !== '{}')

    return (
        <MapMapbox
            onClick={onClick}
            initialViewState={{
                ...initialCoords,
                zoom: isPreview
                    ? 15
                    : isMobile ? 11.5 : 11,
            }}
        >
            <Source
                id='border'
                type='geojson'
                data={'/area.geojson'}
            >
                <Layer
                    type='fill'
                    id='border-fill'
                    paint={{
                        'fill-color': '#9bb962',
                        'fill-opacity': 0.1,
                        'fill-outline-color': '#9bb962',
                    }}
                />
                <Layer
                    type='line'
                    id='border-line'
                    paint={{
                        'line-color': '#9bb962',
                        'line-width': 1,
                        'line-opacity': 1,
                    }}
                />
            </Source>
            {(!isLoading && !error && data) && (!addMode) && features
                .map((x, i) => (
                    <Marker
                        key={i}
                        longitude={x.feature.geometry.coordinates[0]}
                        latitude={x.feature.geometry.coordinates[1]}
                        anchor='center'
                        rotation={0}
                        rotationAlignment='auto'
                        pitchAlignment='auto'
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <Popover
                            withArrow
                            position='top'
                            offset={24}
                            disabled={addMode}
                        >
                            <Popover.Dropdown>
                                <ScrollArea.Autosize
                                    type='auto'
                                    mah={200}
                                    maw={'min(calc(100vw - var(--mantine-spacing-md) * 4), 400px)'}
                                >
                                    <Text>
                                        {x.content}
                                    </Text>
                                </ScrollArea.Autosize>
                            </Popover.Dropdown>
                            <Popover.Target>
                                <div style={{
                                    position: 'relative',
                                }}>
                                    <svg width="32" height="44.5" viewBox="0 0 64 98" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        style={{
                                            transform: 'translateY(-50%)',
                                        }}
                                    >
                                        <g clipPath="url(#clip0_113_61)">
                                            <circle cx="32" cy="32" r="32" fill="var(--mantine-color-primary-1)" />
                                            <path d="M32 62L32 98" stroke="var(--mantine-color-primary-1)" strokeWidth="8" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_113_61">
                                                <rect width="64" height="98" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </Popover.Target>
                        </Popover>
                    </Marker>
                ))}
        </MapMapbox>
    )
}
