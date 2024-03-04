import {
    Users,
    Teams,
    Events,
    Shifts
} from './_index'

import { hosts } from './hosts'

class Client {
    constructor(API_HOST){
        this.API_HOST = API_HOST
        this.users = new Users(API_HOST)
        this.shifts = new Shifts(API_HOST)
        this.teams = new Teams(API_HOST)
        this.events = new Events(API_HOST)
    }
}

const client = new Client(hosts.API_LOCAL_HOST)
export { client }