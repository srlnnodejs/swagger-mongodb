const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const UserSchema = new Shema({

    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('users', UserSchema)