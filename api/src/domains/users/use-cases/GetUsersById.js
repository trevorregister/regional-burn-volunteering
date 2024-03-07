module.exports = (repository) => {
    async function execute(idArray){
        return await repository.getUsersById(idArray)

    }
    return { execute }
}

