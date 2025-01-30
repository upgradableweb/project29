const { Router } = require("express")
const Subject = require("../../models/Subject")
const paginate = require("../../lib/paginate")
const { Types } = require("mongoose")
const Account = require("../../models/Account")
const Attendance = require("../../models/Attendance")
const moment = require("moment")
const teacherRouter = Router()


teacherRouter.use('/dashboard', async (req, res) => {
    try {
        let data = {}, { teacher } = req.body
        data.subjects = await Subject.countDocuments({ teacher })

        const today = moment().format("YYYY-MM-DD")

        let attendance = await Attendance.aggregate([
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subject"
                }
            },
            { $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
            { $match: { "subject.teacher": new Types.ObjectId(teacher) } },
            {
                $facet: {
                    todaysTasks: [
                        { $match: { date: today } },
                        { $count: "count" }
                    ],
                    total: [
                        { $count: "count" }
                    ]                    
                }
            }
        ])

        const total = attendance[0].total.length > 0 ? attendance[0].total[0].count : 0;
        const todaysTasks = attendance[0].todaysTasks.length > 0 ? attendance[0].todaysTasks[0].count : 0;

        data.sessions = total
        data.duration = total
        data.today = todaysTasks

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

teacherRouter.use('/subject', async (req, res) => {
    let data, { method, body } = req

    try {
        if (method == "POST") {
            let token = req.headers.authorization, { teacher } = body
            teacher = new Types.ObjectId(teacher || token)
            data = await Subject.aggregate([
                { $match: { teacher } },
                {
                    $lookup: {
                        from: "semisters",
                        localField: "semister",
                        foreignField: "_id",
                        as: "semister"
                    }
                },
                { $unwind: { path: "$semister", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "branches",
                        localField: "branch",
                        foreignField: "_id",
                        as: "branch"
                    }
                },
                { $unwind: { path: "$branch", preserveNullAndEmptyArrays: true } },
                ...paginate(body)
            ])
            data = data[0]
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

teacherRouter.use('/attendance', async (req, res) => {
    let data, { method, body } = req
    try {

        if (method == "POST") {
            let match = { role: "student" }, { semister, branch, subject, date, session } = body
            match.semister = new Types.ObjectId(semister)
            match.branch = new Types.ObjectId(branch)

            subject = new Types.ObjectId(subject)

            data = await Account.aggregate([
                { $match: match },
                {
                    $lookup: {
                        from: "attendances",
                        let: { accountId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$user", "$$accountId"] },
                                            { $eq: ["$date", date] },
                                            { $eq: ["$session", session] },
                                            { $eq: ["$subject", subject] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: "attendance"
                    }
                },
                { $unwind: { path: "$attendance", preserveNullAndEmptyArrays: true } },
                ...paginate(body)
            ])
            data = data[0]
        } else if (method == "PUT") {
            let { id, payload } = body
            if (id == "new") {
                data = await new Attendance(payload).save()
            } else {
                data = await Attendance.findByIdAndUpdate(id, payload, { returnDocument: "after" })
            }
        } else if (method == "DELETE") {
            data = await Attendance.findByIdAndDelete(body.id)
        }

        return res.json(data)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

teacherRouter.use("/profile", async (req, res) => {
    let data, { method, body, headers } = req
    try {
        if (method == "POST") {
            let auth = headers.authorization
            auth = new Types.ObjectId(auth)
            data = await Account.aggregate([
                { $match: { _id: auth, role: "teacher" } },
                {
                    $lookup: {
                        from: "branches",
                        localField: "branch",
                        foreignField: "_id",
                        as: "branch"
                    }
                },
                { $unwind: { path: "$branch", preserveNullAndEmptyArrays: true } },
            ])
            data = data[0]
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

teacherRouter.use("/complain", async (req, res) => {
    let data, { method, body, headers } = req
    let user = headers.authorization
    try {

        if (method == "POST") {

            data = await Complain
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = teacherRouter