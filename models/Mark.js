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
    semister: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    internal: {
        type: Number,
        required: true
    },
    external: {
        type: Number,
        required: true
    },
    publish: Boolean
});

module.exports = mongoose.model("Mark", schema)