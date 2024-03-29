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
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: [true, 'Team required']
    },

    start: {
        type: Date,
        required: [true, 'Shift start required']
    },

    end: {
        type: Date,
        required: [true, 'Shift end required']
    },

    duration: {
        type: Number,
        required: [true, 'Shift duration required'],
        min: [0, 'Shift duration must be greater than 0']
    },

    capacity: {
        type: Number,
        required: [true, 'Shift capacity required'],
        min: [0, 'Shift capacity must be greater than 0']

    },

    signups: {
        type: Number,
        required: [true, 'Shift signups required']
    }

})