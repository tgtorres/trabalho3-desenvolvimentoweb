const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    cpf: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        defalt: Date.now
    }
});

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;