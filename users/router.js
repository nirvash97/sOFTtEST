const express = require("express")
const MongoClient = require('mongodb').MongoClient
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()

//--------------------------------------------------------------------------------------------------------------------------------
const mongoURL = 'mongodb+srv://it59160501:lidz123456@pokemon-cluster-wzc8t.gcp.mongodb.net/test?retryWrites=true&w=majority'
const option = { useNewUrlParser : true, useUnifiedTopology : true}
const DB_Name = 'buu'
const DB_Collection = 'users'
const jwtKey = "superkey"
//--------------------------------------------------------------------------------------------------------------------------------

async function connectDatabase(){
    let client = MongoClient.connect(mongoURL, option).catch(err => {
        console.log("Error orccurred when try to connect Mongo")
        console.log(err)
        res.status(500).send({error:err})
        return
    })
    return client
}

const auth = async (req, res, next) => {
    let token = req.header('Authorization')
    let decoded
    
    try{
        decoded = await jwt.verify(token, jwtKey)
        req.decoded = decoded
        next()
    }catch(err){
        console.log(`Invalid token : ${err}`)
        res.status(401).send({error:err})
        return
    }
}

router.post('/register', async (req,res) => {
    let name = req.body.name
    let email = req.body.email
    let studentId = req.body.studentId
    let encryptedPwd = await bcrypt.hash(req.body.password, 8)

    const user = {
        name:name,
        email:email,
        studentId:studentId,
        password:encryptedPwd
    }

    let client = await connectDatabase()

    try{
        let database = client.db(DB_Name)
        let result = await database.collection(DB_Collection).insertOne(user)
        res.status(201).json({id: result.insertedId})
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
        return
    }finally{
        client.close()
    }
})

router.post('/sign-in', async (req,res) => {
    let email = req.body.email
    let password = req.body.password

    let client = await connectDatabase()

    try{
        let database = client.db(DB_Name)
        let user = await database.collection(DB_Collection).findOne({email:email})

        if(!user){
            res.status(401).json({error:`Your given email has not been found`})
            return
        }

        let passwordisValid = await bcrypt.compare(password, user.password)
        if(!passwordisValid){
            res.status(401).json({error:`Username/Password is not match`})
            return
        }
        
        let token = await jwt.sign(
            {email:user.email, id: user._id},//<<---- payload
            jwtKey,
            {expiresIn: 30}
        )
        res.status(200).json({token: token})
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
        return
    }finally{
        client.close()
    }
})

router.get('/me', auth, async (req,res) => {
    let email = req.decoded.email

    let client = await connectDatabase()

    try{
        let database = client.db(DB_Name)
        let user = await database.collection(collection).findOne({ email:email}).catch(err => {
            console.log(`Cannot get user by id in /me : ${err}`)
            res.status(500).send({error:err})
            return
        })
    
        if(!user){
            res.status(401).json({error:`User was not found`})
            return
        }
    
        delete user.password
    
        res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
        return
    }finally{
        client.close()
    }
})

module.exports = router