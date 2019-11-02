const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

// http://localhost:3000/pokemons?name=rich
app.get('/pokemons', (req,res) => {
    let name = req.query.name
    res.json({ pokemon_name : name })
})

// http://localhost:3000/pokemon/1
app.get('/pokemon/:id', (req,res) => {
    let id = req.params.id
    res.json({ pokemon_id : id })
})

app.post('/pokemons',(req,res) => {
    let p = req.body
    return res.send(p)
})

app.listen(port, () => console.log(`Pokemon!! API listening on port ${port}!`)) // start server