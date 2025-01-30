const { Router } = require('express')
const Notice = require('../models/noticeSchema')
const paginate = require('../lib/paginate')

const noticeRouter = Router()

noticeRouter.use('/notice', async (req, res)=>{
    let data, { method } = req
    try {
        if(method == "POST"){
            data = await Notice.aggregate(paginate(req.body))
            data = data[0]
        }
        return res.json(data)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})


module.exports = noticeRouter