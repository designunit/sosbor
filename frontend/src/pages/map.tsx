import React, { useContext, useEffect, useState } from 'react'
import { useModals } from '@mantine/modals'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { NextPage } from 'next/types'
import { Map } from '@/components/Map'
import { AddButton } from '@/components/AddButton'
import { NavbarContext } from '@/contexts/navbar'

const PageComponent: React.FC = () => {
    const modals = useModals()
    const router = useRouter()
    const { setDrawer } = useContext(NavbarContext)

    const previewFeature = Boolean(router.query?.preview) == true
    const coords = (router.query?.preview as string | undefined)?.split(',')

    const [initalCoords, setInitalCoords] = useState(previewFeature
        ? {
            longitude: Number(coords[0]),
            latitude: Number(coords[1]),
        }
        : {
            longitude: 35.00760462108934,
            latitude: 57.877114118070324,
        }
    )

    const autoOpenModal = Boolean(router.query?.idea) == true

    useEffect(() => {
        if (autoOpenModal) {
            modals.openContextModal(
                'idea',
                {
                    centered: true,
                    size: 'min(100%, 650px)',
                    // radius: 'xl',
                    withCloseButton: false,
                    innerProps: {

                    },
                }
            )
        }
    }, [autoOpenModal])

    useEffect(() => {
        if (router.pathname == '/map') {
            setDrawer(false)
        }
    }, [router.pathname])

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

const MapPage: NextPage<{ fallback: { [key: string]: any } }> = ({ fallback }) => {
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

export const getServerSideProps = async (ctx) => {
    return {
        props: {
            fallback: {
                [`/api/submissions?limit=1000`]: { docs: [] }
            }
        }
    }
}

export default MapPage
