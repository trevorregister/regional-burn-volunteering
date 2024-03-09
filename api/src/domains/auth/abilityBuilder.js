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
            defineLeadRules()
            break
        case 'user':
            defineUserRules()
            break
        default:
            cannot('manage', 'all')
    }
}

function defineUserRules(){
    can('read', 'User')
    
}

function defineLeadRules(){
    can(['read', 'write'], 'User')
    can('read', 'Shift')
}

module.exports = {
    defineAbilityFor
}
