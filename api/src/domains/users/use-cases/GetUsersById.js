module.exports = (repository) => {
    async function execute(idArray){
        console.log('idArray use case', idArray)
        return await repository.getUsersById(idArray)

    }
    return { execute }
}

