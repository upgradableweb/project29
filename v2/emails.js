const { Router } = require("express");
const EmailSchema = require("../email_module/EmailSchema");
const paginate = require("../lib/paginate");

const emailRouter = Router()

emailRouter.use("/emails", async (req, res) => {
    try {
        let data = await EmailSchema.aggregate(paginate(req.body))
        data = data[0]
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = emailRouter