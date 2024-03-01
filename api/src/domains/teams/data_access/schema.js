const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({

    name: {
        type: String,
        require: [true, 'Name required']
    },

    description:{
        type:String,
        required:[true, 'Description required'],
    },

    members: [{
                type: Schema.Types.ObjectId, 
                ref: 'User'    
        }],

    shifts: [{
        type: Schema.Types.ObjectId,
        ref: 'Shift'
    }],

    leads: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    leadershipKeys: [{
        value: {
            type: String,
            required: false
        },
        isRedeemed: {
            type: Boolean,
            required: false
        },
        redeemedBy: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: 'User'
        },
        _id: false
}]

})