const express = require("express")
const pokemonsRouter = require('./pokemons/router')
const app = express()

// register middleware
app.use(express.json())
app.use(pokemonsRouter)

app.get("/", (req, res) => res.send({message:'Hello World'}))

module.exports = app