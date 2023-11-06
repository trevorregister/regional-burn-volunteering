const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

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
            values: ['user', 'admin', 'leadership'],
            message: `role must be 'user', 'leadership', or 'platform-admin'`
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

UserSchema.methods.generateAuthToken = function() {
/*     const token = jwt.sign({_id: this._id, role: this.role}, process.env.JWT_SECRET)
    return token */
}

var User = mongoose.model('User', UserSchema)

module.exports = User