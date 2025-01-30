const { Router } = require("express");
const Account = require("../models/Account");
const paginate = require("../lib/paginate");
const Subject = require("../models/Subject");
const { Types } = require("mongoose");
const Mark = require("../models/Mark");

const studentRouter = Router()

studentRouter.use('/student/details', async (req, res) => {
    try {
        let data, { body, method } = req
        if (method == "POST") {
            let { user } = body
            user = new Types.ObjectId(user)
            data = await Account.aggregate([
                { $match: { _id: user } },
                {
                    $lookup: {
                        from: "subjects",
                        let: { semister: "$semister", branch: "$branch" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$semister", "$$semister"] },
                                            { $eq: ["$branch", "$$branch"] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "subjects"
                    }
                },
                {
                    $lookup: {
                        from: "semisters",
                        foreignField: "_id",
                        localField: "semister",
                        as: "semister"
                    }
                },
                { $unwind: { path: "$semister", preserveNullAndEmptyArrays: true } },
            ])
            data = data[0]
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

studentRouter.use('/student/marks', async (req, res) => {
    try {
        let data, { body, method } = req
        if (method == "POST") {
            let { user } = body
            user = new Types.ObjectId(user)
            data = await Mark.aggregate([
                { $match: { user } },
                {
                    $lookup: {
                        from: "subjects",
                        localField: "subject",
                        foreignField: "_id",
                        as: "subject"
                    }
                },
                {
                    $unwind: "$subject"
                },
                {
                    $group: {
                        _id: "$semister",
                        marks: { $push: "$$ROOT" }
                    }
                },
                {
                    $lookup: {
                        from: "semisters",
                        localField: "_id",
                        foreignField: "_id",
                        as: "semister"
                    }
                },
                {
                    $unwind: "$semister"
                }
            ])
        } else if (method == "PUT") {
            let { payload, id } = body
            if (id) {
                data = await Mark.findByIdAndUpdate(id, payload, { returnDocument: "after" })
            } else {
                data = await new Mark(payload).save()
            }
        } else if (method == "PATCH"){
            let { user } = body
            const bulkOperations = await Mark.find({ user }).then((docs) =>
                docs.map((doc) => ({
                  updateOne: {
                    filter: { _id: doc._id },
                    update: { $set: { publish: true } },
                  },
                }))
              );
              if (bulkOperations.length > 0) {
                 await Mark.bulkWrite(bulkOperations);
              }
              data = { ok : true }
        } else if (method == "DELETE"){
            let { semester, user } = body
           data = await Mark.deleteMany({ semister:semester, user })
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

studentRouter.use('/student', async (req, res) => {
    try {
        let data, { method, query, body } = req

        if (method == "GET") {
            data = await Account.findOne(query)
        } else if (method == "PUT") {
            let { id, payload } = body

            if (id == "new") {
                for (let d of ["branch", "semister", "mobile", "usn"]) {
                    if (!payload[d]) {
                        return res.status(400).json({ message: d + " is required" })
                    }
                }
                data = await new Account({ role: "student", resetPass: true, ...payload }).save()
            } else if (id) {
                data = await Account.findByIdAndUpdate(id, payload, { returnDocument: "after" })
            }
        } else if (method == 'POST') {
            let { branch } = body
            const match = { role: "student" }
            if (branch) {
                match.branch = new Types.ObjectId(branch)
            }
            data = await Account.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: {
                        from: "branches",
                        localField: "branch",
                        foreignField: "_id",
                        as: "branch"
                    }
                },
                { $unwind: { path: "$branch" } },
                ...paginate(req.body)
            ])
            data = data[0]
        }
        return res.json(data)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})



module.exports = studentRouter