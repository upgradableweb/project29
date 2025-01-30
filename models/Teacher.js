const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    branch: {
        type: mongoose.Types.ObjectId
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Teacher", teacherSchema)