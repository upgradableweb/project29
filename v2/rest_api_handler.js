const { isValidObjectId } = require("mongoose")

const rest_api_handler = async (req, res, Semister) => {
    const { method, body, query } = req

    let data
    try {
        if (method == "GET") {
            data = await Semister.findOne(query)
        } else if (method == "POST") {
            data = await Semister.find(body)
        } else if (method == "PUT") {
            const { id, payload } = body
            delete payload._id
            if (isValidObjectId(id)) {
                data = await Semister.findByIdAndUpdate(id, payload, { returnDocument: "after" })
            } else {
                data = await new Semister(payload).save()
            }
        } else if (method == "DELETE") {
            data = await Semister.findByIdAndDelete(body.id)
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const rest_api = (Model) => (req, res) => rest_api_handler(req, res, Model)

module.exports = rest_api