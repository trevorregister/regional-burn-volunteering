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

    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: [true, 'Team required']
    }],

    lead: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    start: {
        type: Date,
        required: [true, 'Event start required']
    },

    end: {
        type: Date,
        required: [true, 'Event end required']
    },

    capacity: {
        type: Number,
        required: [true, 'Event capacity required'],
        min: [0, 'Event capacity must be greater than 0']

    }

})