import { useEffect } from 'react'

function useDebug() {
    const log = [
        `NEXT_PUBLIC_MAPLIBRE_STYLE=${process.env.NEXT_PUBLIC_MAPLIBRE_STYLE}`
    ]
    return log.join('\n')
}

export default function Page() {
    const debug = useDebug()

    return (
        <pre>
            {debug}
        </pre>
    )
}
