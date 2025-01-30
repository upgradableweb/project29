const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    subject: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    internal: {
        type: String,
        required: true
    },
    external: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Result", schema)