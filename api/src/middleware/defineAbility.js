const { defineAbility } = require('@casl/ability')

/* const ability = defineAbility((can, cannot) => {
    can('read', 'User')
}) */

module.exports = (user) => 
    defineAbility((can, cannot) => {
        can ('read', 'User')

        if (user.isLoggedIn){
            can ('update', 'User')
        }
})

/* module.exports = (user) => {
    function execute(){
        return 'execute'
    }

    return {execute}
} */