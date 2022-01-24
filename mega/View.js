require('dotenv').config({path : './config/.env'})
const fastify = require('fastify')({
  logger: {
      prettyPrint:
        process.env.ENVIRONMENT=== 'development'
          ? {
              translateTime: 'SYS:HH:MM:ss Z',
              ignore: 'pid,hostname',
              singleLine : 'true'
            }
          : false
    }
})
fastify.register(require("point-of-view"), {
    engine: {
      ejs: require("ejs"),
    },
  });
fastify.get('/' , async function(request, reply){
   await reply.view("/templates/index.ejs"); 
})
fastify.get('/.well-known/acme-challenge/ov_SlfdEVE-v62ukdraON4cRp3j1n5cGtNfRXna1aGE',async (req , reply)=>{await reply.send('ov_SlfdEVE-v62ukdraON4cRp3j1n5cGtNfRXna1aGE.QBCTanhbSYhtiWUlUXVLo5egIqT10N7wIq_HAEh3PKs')})
const start = async (port) => {
    try {
      await fastify.listen(port) 
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start(process.env.STATIC_PORT)
