const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    code: {
        type: Number,
        required: true
    },
    work_shift: {
        type: String,
        required: true
    },
    day: {
        type: String,
        require: true
    },
    responsible: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        defalt: Date.now
    }
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;