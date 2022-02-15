require('dotenv').config({path : './config/.env'})
const { logger } = require('./global/globalObjects');
const fastify = require('fastify')({
  logger: process.env.ENVIRONMENT=== 'development' ?{
       prettyPrint:logger  
     }:false
 })
const {masterBranch} = require('./controllers/deploy/master')
fastify.post('/master' ,{handler : masterBranch})
const start = async(port)=>{
    try { 
           fastify.listen(port) 
           console.log(`deploy port ${port} started`)
    }
    catch (err){
    console.log.error(err)
    process.exit(1)
    }

} 
start(process.env.PULL_PORT)