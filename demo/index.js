const { Router } = require('express')

const demoRouter = Router()

demoRouter.use('/students', async (req, res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = demoRouter