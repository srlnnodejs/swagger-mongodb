const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('admins', AdminSchema)