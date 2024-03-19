import { ObjectId } from "mongodb"

export type LeadershipKey = {
    id: string
    isRedeemed: boolean
    redeemedBy: ObjectId | null
}

export interface WebUser {
    id: string
    email: string
    name: string
    role: string
    events: []
    teams: [ObjectId]
    shifts: [ObjectId]
}
