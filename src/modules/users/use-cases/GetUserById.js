module.exports = (repository) => {
    async function execute(id){
        return await repository.getUserById(id)

    }
    return { execute }
}

