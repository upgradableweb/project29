const { Router } = require("express");
const Account = require("../../models/Account");
const { Types } = require("mongoose");
const Subject = require("../../models/Subject");
const paginate = require("../../lib/paginate");
const Attendance = require("../../models/Attendance");
const Mark = require("../../models/Mark");
const EmailModule = require("../../email_module");
const Token = require("../../lib/token");

domain = process.env.DOMAIN
login_url = domain + "/Studentlogin"


const studentRouter = Router()

studentRouter.use("/token", async (req, res) => {
    try {
        let data
        try {
            data = await Token.verifyToken(req.body.token)
        } catch (error) {
            return res.status(403).json({ message: error.message, logout: true })
        }
        data.token = await Token.createToken({ role: "student", email: data.email, id: data._id })
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

studentRouter.use("/forgot-password", async (req, res) => {
    try {

        let { usn } = req.body

        const data = await Account.findOne({ usn })
        if (!data) {
            return res.status(404).json({ message: "please enter a valid usn" })
        }
        const subject = usn.toUpperCase() + " - Password Reset Request"
        const emailModule = new EmailModule({ to: data.email, subject })

        const payload = JSON.parse(JSON.stringify(data._doc))
        let token = Token.createToken(payload, 60 * 10)

        reset_password_link = domain + '/reset-password?token=' + token
        await emailModule.reset_password({ login_url, user_name: data.name, reset_password_link })
        const message = "reset password link has been sent to your registered email"
        return res.json({ message })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
studentRouter.use('/dashboard', async (req, res) => {
    try {
        const { student } = req.body
        let { semister } = await Account.findById(student)
        let subjects = await Subject.countDocuments({ semister })
        let attendance = await Attendance.countDocuments({ user: student })
        let data = await Mark.aggregate([
            { $match: { user: new Types.ObjectId(student), publish: true } },
            {
                $facet: {
                    lessThan18: [
                        {
                            $match: {
                                $or: [
                                    { internal: { $lt: 18 } },
                                    { external: { $lt: 18 } }
                                ]
                            }
                        },
                        {
                            $count: "count"
                        }
                    ],
                    greaterThanOrEqual18: [
                        {
                            $match: {
                                internal: { $gte: 18 },
                                external: { $gte: 18 }
                            }
                        },
                        {
                            $count: "count"
                        }
                    ]
                }
            }
        ])

        const backlogs = data[0].lessThan18.length > 0 ? data[0].lessThan18[0].count : 0;
        const passed = data[0].greaterThanOrEqual18.length > 0 ? data[0].greaterThanOrEqual18[0].count : 0;

        return res.json({ subjects, attendance, passed, backlogs })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

studentRouter.use('/profile', async (req, res) => {
    let data, { method, body, headers } = req
    try {
        if (method == "POST") {
            let auth = headers.authorization
            auth = new Types.ObjectId(auth)
            data = await Account.aggregate([
                { $match: { _id: auth, role: "student" } },
                {
                    $lookup: {
                        from: "branches",
                        localField: "branch",
                        foreignField: "_id",
                        as: "branch"
                    }
                },
                { $unwind: { path: "$branch", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "semisters",
                        localField: "semister",
                        foreignField: "_id",
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

studentRouter.use('/subject', async (req, res) => {
    let data, { method, body, headers } = req
    try {
        let { semister, branch } = await Account.findById(headers.authorization)
        data = await Subject.aggregate([
            { $match: { semister, branch } },
            {
                $lookup: {
                    from: "accounts",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacher"
                }
            },
            { $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true } },
            ...paginate(body)
        ])
        data = data[0]
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


studentRouter.use('/results', async (req, res) => {
    let data, { method, body, headers, query } = req
    try {

        if (method == "GET") {
            let { user, semester } = query
            user = new Types.ObjectId(user)
            semester = new Types.ObjectId(semester)

            data = await Mark.aggregate([
                { $match: { user, publish: true, semister: semester } },
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
                },
                {
                    $addFields: {
                        student: user
                    }
                },
                {
                    $lookup: {
                        from: "accounts",
                        localField: "student",
                        foreignField: "_id",
                        as: "student"
                    }
                },
                { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
            ])
            data = data[0]
        } else if (method == "POST") {
            let user = new Types.ObjectId(headers.authorization)
            data = await Mark.aggregate([
                { $match: { user, publish: true } },
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
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = studentRouter