const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Semister", schema)