module.exports = (repository) => {
    async function execute(){
        return await repository.getTeams()
    }
    return { execute }
}

