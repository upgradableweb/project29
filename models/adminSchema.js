const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
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
    role: {
        type: String,
        default: "admin"
    },
    schoolName: {
        type: String,
        required: true
    },
    university: String,
    contact: String,
    rootUser: Boolean,
    dbName: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    access: {
        type: String,
        default: "*"
    }
});

module.exports = mongoose.model("admin", adminSchema)