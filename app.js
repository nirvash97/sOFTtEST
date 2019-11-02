const express = require("express")
const pokemonsRouter = require('./pokemons/router')
const pokemonsRouter2 = require('./pokemons/router_v2')
const usersRouter = require('./users/router')
const app = express()

// register middleware
app.use(express.json())
app.use(pokemonsRouter)
app.use(usersRouter)


//http://localhost:3000/v2/pokemons
app.use('/v2',pokemonsRouter2)

module.exports = app