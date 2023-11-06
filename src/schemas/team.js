const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({

    name: {
        type: String,
        require: [true, 'Name required']
    },

    description:{
        type:String,
        required:[true, 'Description required'],
    },

    members: [
        {
            user: { 
                type: Schema.Types.ObjectId, 
                ref: 'User'    
            },

        }
    ],

    shifts: [{
        type: Schema.Types.ObjectId,
        ref: 'Shift'
    }],

    leads: [{
        type: Schema.Types.ObjectId,
        require: [true, 'At least 1 lead required'],
        ref: 'User'
    }]

})


var Team = mongoose.model('Team', TeamSchema)

module.exports = Team