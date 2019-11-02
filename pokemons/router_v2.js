const express = require("express")
const router = express.Router()

// http://localhost:3000/v2/pokemons
router.put('/pokemons',(req,res) => {
    let p = req.body
    return res.send(p)
})

module.exports = router