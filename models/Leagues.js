const mongoose = require('mongoose');
const Shema = mongoose.Schema;


const LeaguesSchema = new Shema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    users: {
        type: Object,
        default: []
    }
        
});

module.exports = mongoose.model('leagues', LeaguesSchema)