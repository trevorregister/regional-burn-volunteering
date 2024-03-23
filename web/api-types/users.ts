import { ObjectId } from "mongodb";

export interface GetUserRequest {
    id: string
}

export interface GetUserResponse {
    id: string,
    name: string,
    email: string,
    role: string,
    shifts: ObjectId[],
    teams: ObjectId[],
    events: ObjectId[]

}

export interface CreateUserRequest{
    email: string,
    name: string,
    password: string,
    leadershipKeyValue?: string
}