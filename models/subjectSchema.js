const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    sub_name: {
        type: String,
        required: true,
    },
    sub_code: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("cSubject", subjectSchema);