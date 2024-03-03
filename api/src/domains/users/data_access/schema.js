const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({

    email:{
        type:String,
        required:[true, 'email required'],
    },

    name: {
        type: String,
        require: [true, 'Name required']
    },

    role:{
        type:String,
        required:[true, 'Role required'],
        enum: {
            values: ['user', 'admin', 'lead'],
            message: `role must be 'user', 'lead', or 'platform-admin'`
        }
    },

    hash: {
        type: String,
        required: [true, 'Password required']
    },

    shifts: [{
        type: Schema.Types.ObjectId,
        ref: 'Shift'
    }],

    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }],
    
    events:[{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }]
})