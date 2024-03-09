const { AbilityBuilder , createMongoAbility, } = require('@casl/ability')


function defineAbilityFor(user) {
    const {can, cannot, build } = new AbilityBuilder(createMongoAbility)
    console.log('asldfkj')

    if(user.isLoggedIn) {
       can('read', 'User')
    }
    else {
        cannot('read', 'User')
    } 

    return build()
}

module.exports = {
    defineAbilityFor
}
