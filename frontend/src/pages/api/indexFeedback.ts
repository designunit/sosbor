/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const reqPayload = await fetch(`${process.env.BACKEND_URL}/api/feedbackQuestions`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        })

        const data = await reqPayload.json()
        res.status(200).json(data)
    } catch (e) {
        console.error('/api/indexFeedback', e)
        res.status(400)
    }
}
