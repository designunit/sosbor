export async function fetcher(url: string) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export const API = {
    features: "/api/collections/features/records",
    surveys: "/api/collections/surveys/records",
    bestSubmissions: "/api/submissions/best",
    clients: "/api/clients",
    check: "/api/check",
    indexFeedback: "/api/indexFeedback",
    comments: "/api/comments",
} as const
