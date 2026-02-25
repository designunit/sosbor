"use client"

import PocketBase from "pocketbase"
import type { FeatureRecord, SurveyRecord } from "@/types"

let pbInstance: PocketBase | null = null

export function getPocketBase(): PocketBase {
    if (!pbInstance) {
        pbInstance = new PocketBase(window.location.origin)
    }
    return pbInstance
}

export async function loginAsSuperuser(email: string, password: string): Promise<void> {
    const pb = getPocketBase()
    await pb.collection("_superusers").authWithPassword(email, password)
}

export async function fetchAllFeatures(): Promise<FeatureRecord[]> {
    const pb = getPocketBase()
    const records = await pb.collection("features").getFullList({ sort: "-created", filter: "isBanned = false" })
    return records as unknown as FeatureRecord[]
}

export async function fetchAllSurveys(): Promise<SurveyRecord[]> {
    const pb = getPocketBase()
    const records = await pb.collection("surveys").getFullList({ sort: "-created" })
    return records as unknown as SurveyRecord[]
}
