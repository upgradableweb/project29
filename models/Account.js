const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPass: Boolean,
    role: {
        type: String,
        enum: ["student", "admin", "teacher"]
    },
    usn: {
        type: String,
        unique: true
    },
    mobile: {
        type: String,
        unique: true
    },
    branch: mongoose.Types.ObjectId,
    semister: mongoose.Types.ObjectId
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Account", teacherSchema) 