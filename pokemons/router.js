const express = require("express")
const router = express.Router()
const MongoClient = require('mongodb').MongoClient

const mongoURL = 'mongodb+srv://59160273:Chariot97@pokemon-cluster-otxxa.gcp.mongodb.net/test?retryWrites=true&w=majority'
const option = { useNewUrlParser : true, useUnifiedTopology : true}
const DB_Name = 'Pokemondb'
const DB_Collection = 'pokemons'


async function connectDatabase(){
    let client = MongoClient.connect(mongoURL, option).catch(err => {
        console.log("Error orccurred when try to connect Mongo")
        console.log(err)
        res.status(500).send({error:err})
        return
    })
    return client
}

router.post('/pokemons', async (req,res) => {
    let pokemon = req.body

    let client = await connectDatabase()

    try{
        let database = client.db(DB_Name)
        let result = await database.collection(DB_Collection).insertOne(pokemon)
        res.status(201).json({id: result})
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
    }finally{
        client.close()
    }

})

// http://localhost:3000/pokemons?name=rich
router.get('/pokemons', async (req,res) => {
    let name = req.query.name

    let client = await connectDatabase()

    try{
        let database = client.db(DB_Name)
        let result = await database.collection(DB_Collection).find({}).toArray()
        res.json(result)
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
    }finally{
        client.close()
    }

  

})

// http://localhost:3000/pokemon/1
router.get('/pokemon/:id', (req,res) => {
    let id = req.params.id
    res.json({ pokemon_id : id })
})

router.post('/pokemons',(req,res) => {
    let p = req.body
    return res.send(p)
})

module.exports = router