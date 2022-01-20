const fastify = require('fastify')({logger : true})
require('dotenv').config({path : './config/.env'})
fastify.post('/master' , async(request, reply)=>{
const header  =  request.headers
const body = request.body
console.log('header ======>',header)
console.log('body =====>' , body )
})
const start = async(port)=>{
    try { 
           fastify.listen(port) 
    }
    catch (err){
    console.log.error(err)
    process.exit(1)
    }

} 
start(process.env.PULL_PORT)