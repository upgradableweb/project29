const { Router } = require("express");
const Attendance = require("../models/Attendance");
const paginate = require("../lib/paginate");
const { Types } = require("mongoose");

const attendanceRouter = Router()

attendanceRouter.use('/attendance', async (req, res) => {
    let data, { method, body, headers } = req
    try {
        if (method == "POST") {
            let user = new Types.ObjectId(body.user)
            let { stats } = body

            let aggregate = []
            if (!stats) {
                aggregate = [
                    {
                        $lookup: {
                            from: "subjects",
                            localField: "subject",
                            foreignField: "_id",
                            as: "subject"
                        }
                    },
                    { $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
                    ...paginate(body)
                ]
            } else {
                aggregate = [
                    {
                        $group: {
                            _id: {
                                subject: "$subject",
                                status: "$status"
                            },
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $group: {
                            _id: "$_id.subject",
                            present: {
                                $sum: {
                                    $cond: [{ $eq: ["$_id.status", "present"] }, "$count", 0]
                                }
                            },
                            absent: {
                                $sum: {
                                    $cond: [{ $eq: ["$_id.status", "absent"] }, "$count", 0]
                                }
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "subjects",
                            localField: "_id",
                            foreignField: "_id",
                            as: "subject"
                        }
                    },
                    { $unwind: { path: "$subject", preserveNullAndEmptyArrays: true } },
                ]
            }
            data = await Attendance.aggregate([
                { $match: { user } },
                ...aggregate,
            ])

            if (!stats) {
                data = data[0]
            }
        }

        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = attendanceRouter