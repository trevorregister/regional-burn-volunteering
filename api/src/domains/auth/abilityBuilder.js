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
        case 'event-lead':
            defineEventLeadRules(user)
            break
        default:
            cannot('manage', 'none')
    }
}

function defineUserRules(user){
    can('read', 'User', {id: user.id})

    can('update', 'UserShiftRelation', {isRequestingUser: true})
    cannot('read', 'UserShiftRelation', {isRequestingUser: false})
    cannot('write','Shift')
    cannot('update', 'Shift')
}

function defineLeadRules(){
    can('read', 'all')

    can('update', 'UserShiftRelation', {isRequestingUser: true})
    can('update', 'UserShiftRelation', {isLeadingTeam: true})

    can('update', 'Team', {isLeadingTeam: true})

    can('write', 'Shift', {isLeadingTeam: true})
    can('update', 'Shift', {isLeadingTeam: true})
    cannot('update', 'Shift', {isLeadingTeam: false})
    cannot('write', 'Shift', {isLeadingTeam: false})
    can('delete', 'Shift', {isLeadingTeam: true})
    cannot('delete', 'Shift', {isLeadingTeam: false})

}

function defineEventLeadRules(){
    can('manage', 'all')
}

module.exports = {
    defineAbilityFor
}
