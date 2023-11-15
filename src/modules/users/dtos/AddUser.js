class AddUserDTO{
    name
    email
    role
    password

    constructor(data){
        this.name = data.name
        this.email = data.email
        this.role = data.role
        this.password = data.password
    }

}