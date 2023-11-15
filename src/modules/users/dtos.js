module.exports = class UserDTO {

    static toDb(data){
        return {
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password
        }
    }

    static toWeb(data){
        return {
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            shifts: data.shifts,
            teams: data.teams,
            events: data.events
        }
    }

}