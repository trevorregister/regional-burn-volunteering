const { AbilityBuilder , createMongoAbility, } = require('@casl/ability')
const {
    can, 
    cannot, 
    build 
} = new AbilityBuilder(createMongoAbility)

function defineAbilityFor(user) {
    defineRulesFor(user)

    return build()
}

function defineRulesFor(user){
    const { role } = user
    switch(role){
        case 'lead':
            defineLeadRules(user)
            break
        case 'user':
            defineUserRules(user)
            break
        default:
            cannot('manage', 'none')
    }
}

function defineUserRules(user){
    console.log(user.constructor.name)
    can('read', 'User', {id: user.id})
    can('update', 'User', {id: user.id})
    
}

function defineLeadRules(){
    can('read', 'User')
}

module.exports = {
    defineAbilityFor
}
