const express = require('express');
const zod = require('zod');
const {User, Account} = require('../db')
const router = express.Router();
const JWT_SECRET = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post('/signin' , async (req,res) => {
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.json({
            message: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logiiging in"
    })
})

const updateUser = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put('/',authMiddleware,async(req,res) => {
    const { success } = updateUser.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({
      _id: req.userId  
    },req.body);

    res.json({
        message: 'Updated Successfully'
    })
})

router.get('/bulk' , async(req,res) => {
    const filter = req.query.filter || ' ';

    const users = await User.find({
        $or: [{
            firstname: {
                '$regex': filter
            }
        },{
            lastname: {
                '$regex' : filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })




})

module.exports = router;