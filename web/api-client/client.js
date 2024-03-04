import {
    Users,
    Teams,
    Events,
    Shifts
} from './_index'

class Client {
    constructor(API_HOST){
        this.API_HOST = API_HOST
        this.users = new Users(API_HOST)
        this.shifts = new Shifts(API_HOST)
        this.teams = new Teams(API_HOST)
        this.events = new Events(API_HOST)
    }
}
/* console.log('api-client', process.env.APP_ENV === "development")
console.log('node env', process.env.NODE_ENV)
const host = process.env.NODE_ENV === "development"
    ? process.env.API_LOCAL_HOST
    : process.env.API_PRODUCTION_HOST */

const client = new Client(process.env.API_HOST)
export { client }