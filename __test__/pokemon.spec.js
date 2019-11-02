const request = require('supertest')
const expect = require('chai').expect
const app =require('../app')
describe('/GET pokemon' , () =>{
    it('should return pokemon' , (done)=>{
        request(app).get('/pokemons')
        .expect(200)
        .end((err,res) => {
            let result = res.body
            expect(res.statusCode).to.equals(200)
            expect(result).to.be.an('array')
            let p = result[0]
            expect(p).to.have.property('_id')
            expect(p).to.have.property('name')
            done() 
        })
    })
})

describe('/post pokemon' , () =>{
    it('should return(201) with id' , (done)=>{
        request(app).post('/pokemons')
        .send({ name :'pikachu'})
        .end((err,res) => {
            let result = res.body
            expect(res.statusCode).to.equals(201)
            expect(result).to.be.an('object')
            expect(result).to.have.property('id')
            done() 
        })
    })
})

describe('/me ' , () =>{
    it('should return(401) unauthorize when token is Unavailable' , (done)=>{
        request(app).get('/me')
        .end((err,res) => {
            expect(res.statusCode).to.equals(401)
            done() 
        })
    })
    it('should return(401) unauthorize when token is invalid' , (done)=>{
        request(app).get('/me')
        .set('Authorization' , '123456789')
        .end((err,res) => {
            expect(res.statusCode).to.equals(401)
            done() 
        })
    })
})