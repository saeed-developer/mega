const fastify = require('fastify')({logger : true})
const {masterBranch} = require('./controllers/deploy/master')
require('dotenv').config({path : './config/.env'})
fastify.post('/master' ,{handler : masterBranch})
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