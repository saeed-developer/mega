const { logger } = require('../global/globalObjects');

require('dotenv').config({path : './../config/.env'})
const fastify = require('fastify')({
  logger: process.env.ENVIRONMENT=== 'development' ?{
       prettyPrint:logger  
     }:false
 })
fastify.register(require("point-of-view"), { 
    engine: {
      ejs: require("ejs"),
    },
  });
fastify.get('/' , async function(request, reply){
   await reply.view("/templates/index.ejs"); 
})
const start = async (port) => {
    try {
      await fastify.listen(port) 
      console.log(`view port ${port} started`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start(process.env.STATIC_PORT)
