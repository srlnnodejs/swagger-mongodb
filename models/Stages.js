const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const StageSchema = new Shema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    league: {
        type: Shema.Types.ObjectId,
        required: true
    }
    
});

module.exports = mongoose.model('stage', StageSchema)