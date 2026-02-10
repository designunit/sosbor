import React, { useContext, useEffect, useState } from 'react'
import { useModals } from '@mantine/modals'
import { useSearchParams } from 'next/navigation'
import { SWRConfig } from 'swr'
import type { NextPage, GetServerSidePropsContext } from 'next/types'
import { Map } from '@/components/Map'
import { AddButton } from '@/components/AddButton'
import { NavbarContext } from '@/contexts/navbar'

const PageComponent: React.FC = () => {
    const modals = useModals()
    const searchParams = useSearchParams()
    const { setDrawer } = useContext(NavbarContext)

    const preview = searchParams.get('preview')
    const previewFeature = Boolean(preview)
    const coords = preview?.split(',')

    const [initalCoords] = useState(previewFeature && coords
        ? {
            longitude: Number(coords[0]),
            latitude: Number(coords[1]),
        }
        : {
            longitude: 29.076903,
            latitude: 59.896869,
        }
    )

    const autoOpenModal = Boolean(searchParams.get('idea'))

    useEffect(() => {
        if (autoOpenModal) {
            modals.openContextModal(
                'idea',
                {
                    centered: true,
                    size: 'min(100%, 650px)',
                    withCloseButton: false,
                    innerProps: {

                    },
                }
            )
        }
    }, [autoOpenModal, modals])

    useEffect(() => {
        setDrawer(false)
    }, [setDrawer])

    return (
        <>
            <div style={{
                flex: '1 0 100%',
                position: 'relative',
            }}>
                <Map
                    initialCoords={initalCoords}
                />
                <AddButton />
            </div>
        </>
    )
}

type MapPageProps = {
    fallback: Record<string, unknown>
}

const MapPage: NextPage<MapPageProps> = ({ fallback }) => {
    return (
        <SWRConfig
            value={{
                fallback,
            }}
        >
            <PageComponent />
        </SWRConfig>
    )
}

export const getServerSideProps = async (_ctx: GetServerSidePropsContext) => {
    return {
        props: {
            fallback: {
                [`/api/submissions?limit=1000`]: { docs: [] }
            }
        }
    }
}

export default MapPage
