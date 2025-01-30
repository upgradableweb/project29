const { Router } = require("express");
const Semister = require("../models/Semister");
const { isValidObjectId } = require("mongoose");

const semisterRouter = Router()

semisterRouter.use('/', async (req, res) => {

    const { method, body, query } = req

    let data
    try {
        if (method == "GET") {
            data = await Semister.findOne(query)
        } else if (method == "POST") {
            data = await Semister.find(body)
        } else if (method == "PUT") {
            const { _id, ...fields } = body
            if (isValidObjectId(_id)) {
                data = await Semister.findByIdAndUpdate(_id, fields, { returnDocument: "after" })
            } else {
                data = await new Semister(fields).save()
            }
        } else if (method == "DELETE") {
            data = await Semister.findByIdAndDelete(id)
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
module.exports = semisterRouter