
const express = require('express')
const semisterRouter = require('./semister')
const rest_api = require('./rest_api_handler')
const Branch = require('../models/Branch')
const noticeRouter = require('./notice')
const Account = require('../models/Account')
const paginate = require('../lib/paginate')
const attendanceRouter = require('./attendance')
const studentRouter = require('./student')
const subjectRouter = require('./subject')
const teacherRouter = require('./teacher/index')
const studentApiRouter = require('./student/index')
const Subject = require('../models/Subject')
const { Types } = require('mongoose')
const bcrypt = require("bcrypt")

const v2Router = express.Router()

v2Router.post("/reset-password", async (req, res) => {
    try {

        const { password, user } = req.body
        if (!password || password.length < 4) {
            return res.status(400).json({ message: "password must be 4 char long" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        let data = await Account.findByIdAndUpdate(user, { hashedPass, password, resetPass: false })
        if (!data) {
            throw Error("user not found")
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


v2Router.use('/dashboard/teachers-students', async (req, res) => {
    try {
        const data = await Account.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: { $sum: 1 }
                }
            }
        ])
        const sendData = {}
        data.map(d => sendData[d._id + "s"] = d.count)
        return res.json(sendData)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

v2Router.use('/dashboard/branches', async (req, res) => {
    try {
        const data = await Branch.countDocuments()
        return res.json({ count: data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

v2Router.use('/dashboard/subjects', async (req, res) => {
    try {
        const data = await Subject.countDocuments()
        return res.json({ count: data })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

v2Router.use('/semister', semisterRouter)


v2Router.use('/branch/update', async (req, res) => {
    try {
        const id = req.query._id
        const data = await Branch.findById(id).populate('semisters')
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

v2Router.use('/branch', rest_api(Branch))



v2Router.use('/teacher', async (req, res) => {
    try {
        let data, { method, query, body } = req

        if (method == "GET") {
            data = await Account.findOne(query)
        } else if (method == "PUT") {
            let { id, payload } = body
            if (payload.branch == '') {
                delete payload.branch
                payload.$unset = { branch: 1 }
            }
            if (id == "new") {
                data = await new Account({ role: "teacher", resetPass: true, ...payload }).save()
            } else {
                data = await Account.findByIdAndUpdate(id, payload)
            }
        } else if (method == 'POST') {
            let { branch } = body
            const match = { role: "teacher" }
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
                { $unwind: { path: "$branch", preserveNullAndEmptyArrays: true } },
                ...paginate(req.body)
            ])
            data = data[0]
        }
        return res.json(data)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


v2Router.use(studentRouter)
v2Router.use(attendanceRouter)
v2Router.use(subjectRouter)
v2Router.use(noticeRouter)

// Teacher Routes
v2Router.use('/teacher-api', teacherRouter)
v2Router.use('/student-api', studentApiRouter)

module.exports = v2Router