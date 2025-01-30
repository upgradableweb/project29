const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    branch: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Branch"
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Account"
    },
    semister: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Semister"
    },
    subject_name: {
        type: String,
        required: true,
    },
    subject_code: {
        type: String,
        required: true,
    },
    subject_status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Subject", subjectSchema);