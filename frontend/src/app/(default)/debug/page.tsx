export default function DebugPage() {
    const log = [`NEXT_PUBLIC_MAPLIBRE_STYLE=${process.env.NEXT_PUBLIC_MAPLIBRE_STYLE}`]

    return <pre>{log.join("\n")}</pre>
}
