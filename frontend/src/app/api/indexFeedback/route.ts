import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const reqPayload = await fetch(`${process.env.BACKEND_URL}/api/feedbackQuestions`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })

        const data = await reqPayload.json()
        return NextResponse.json(data)
    } catch (e) {
        console.error("/api/indexFeedback", e)
        return NextResponse.json({ error: "Request failed" }, { status: 400 })
    }
}
