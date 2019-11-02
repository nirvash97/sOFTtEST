const express = require("express")
const router = express.Router()

// Mongo = Document Based Databse
// Collection = Table (in RDBMS)
// Document = row (in RDBMS)
// Key = Column (in RDBMS)
// _id: ObjectID = DocumentID

// http://localhost:3000/pokemons?name=rich
router.get('/pokemons', (req,res) => {
    let name = req.query.name
    res.json({ pokemon_name : name })
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