const fastify = require('fastify')({
  logger: {
      prettyPrint:
        process.env.ENVIRONMENT=== 'development'
          ? {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname'
            }
          : false
    }
})
require('dotenv').config({path : './config/.env'})
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
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start(process.env.STATIC_PORT)