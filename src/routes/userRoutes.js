import express from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'

let router = express.Router()

router.post('/login', async (req, res) => {
    let password = req.body.password
    let userName = req.body.userName

    try {
        let user = await User.findOne({ userName: userName })
        // 
        if (!user) {
            return res.status(400).json({
                Alert: "Invalid Email or Password "
            })
        }
        const validPass = await bcrypt.compare(password, user.password)
        // console.log(validPass)
        if (!validPass) {
            return res.status(400).json({
                Alert: "Invalid Email or Password "
            })
        }
        if (user && validPass) {
            return res.status(200).json({
                Alert: `Welcome ${user.userName}`
            })
        }
    } catch (error) {
        res.status(500).json({
            Error: error.message
        })
    }
})

router.post('/register', async (req, res) => {
    let salt = bcrypt.genSaltSync(10)
    let password = req.body.password
    let hashedPass = bcrypt.hashSync(password, salt)
    let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        isAdmin: req.body.isAdmin,
        password: hashedPass,
    }

    try {
        let user = await User.findOne({ userName: userData.userName })
        // console.log(user)
        if (user) {
            res.status(401).json({
                alert: `Username ${userData.userName} already registered.`
            })
            return
        } else {
            // save to database
            user = new User(userData)
            user = await user.save()
            res.status(200).json({
                msg: "User Registered successfully",
            })
        }
    } catch (error) {
        res.send(500).json({
            error: error.message
        })
    }
})

export default router