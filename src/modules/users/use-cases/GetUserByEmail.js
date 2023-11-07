module.exports = (repository) => {
    async function execute(email){
        return await repository.getUserByEmail(email)

    }
    return { execute }
}

