const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const AdminSchema = new Shema({

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
    },
    phoneno:{
        type:Number,
        required:true
    }
    
});

module.exports = mongoose.model('admin', AdminSchema)