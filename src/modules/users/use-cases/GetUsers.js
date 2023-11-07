module.exports = (repository) => {
    async function execute(){
        return await repository.getUsers()

    }
    return { execute }
}

