import { Suspense } from 'react'
import { MapPageContent } from './MapPageContent'

export default function MapPage() {
    return (
        <Suspense>
            <MapPageContent />
        </Suspense>
    )
}
