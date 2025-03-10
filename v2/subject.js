const { Router } = require("express")
const paginate = require("../lib/paginate")
const Subject = require("../models/Subject")
const { Types } = require("mongoose")

const subjectRouter = Router()

subjectRouter.use('/subject', async (req, res) => {
    try {
        const { method, body, query } = req
        let data

        if (method == "GET") {
            data = await Subject.findOne(query)
        } else if (method == "PUT") {
            let { id, payload } = body
            if (id == "new") {
                data = await new Subject(payload).save()
            } else {
                data = await Subject.findByIdAndUpdate(id, payload)
            }
        } else if (method == "POST") {
            let match = {}

            for (let d of ["teacher", "branch", "semister"]) {
                const f = body[d]
                if (f) {
                    match[d] = new Types.ObjectId(f)
                }
            }


            data = await Subject.aggregate([
                { $match: match },
                {
                    $lookup: {
                        from: "branches",
                        localField: "branch",
                        foreignField: "_id",
                        as: "branch"
                    }
                },
                {
                    $lookup: {
                        from: "semisters",
                        localField: "semister",
                        foreignField: "_id",
                        as: "semister"
                    }
                },
                { $unwind: "$branch" },
                { $unwind: "$semister" },
                {
                    $lookup: {
                        from: "accounts",
                        localField: "teacher",
                        foreignField: "_id",
                        as: "teacher"
                    }
                },
                { $unwind: "$teacher" },
                ...paginate(body)
            ])
            data = data[0]
        } else if (method == "DELETE") {
            // let { id } = body
            // data = await Subject.findByIdAndDelete(id)
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
})

module.exports = subjectRouter