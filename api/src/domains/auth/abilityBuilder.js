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
    can('read', 'User', {id: user.id})
    can('update', 'UserShiftRelation', {isRequestingUser: true})
    
}

function defineLeadRules(){
    can('read', 'User')
    can('update', 'UserShiftRelation', {isLeadingTeam: true})
    can('write', 'Shift', {isLeadingTeam: true})
    can('update', 'Shift', {isLeadingTeam: true})

}

module.exports = {
    defineAbilityFor
}
