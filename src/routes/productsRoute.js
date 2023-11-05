import express from "express"

let router = express.Router()


// get all products
router.get('/', (req, res) => {
    res.status(200).json({
        msg: 'all products'
    })
})

export default router