const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    subject: {
        type: mongoose.Types.ObjectId
    },
    status: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Attendance", schema)