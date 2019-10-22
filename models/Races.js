const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const RacesSchema = new Shema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    stage: {
        type: Shema.Types.ObjectId,
        required: true
    },
    user: {
        type: Shema.Types.ObjectId,
        required: true
    }
    
});

module.exports = mongoose.model('races', RacesSchema)