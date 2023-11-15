module.exports = class AddUserDTO {

    static toDb(data){
        return {
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password
        }
    }

}