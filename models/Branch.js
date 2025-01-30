const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    semisters: {
        type: [mongoose.Types.ObjectId],
        ref: "Semister",
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "The 'semister' field must have at least one value."
        }
    },
    branch_name: {
        type: String,
        required: true,
        unique: true
    },
    branch_code: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Branch", schema)