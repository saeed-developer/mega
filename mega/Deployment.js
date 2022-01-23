require('dotenv').config({path : './config/.env'})
const fastify = require('fastify')({
    logger: {
        prettyPrint:
          process.env.ENVIRONMENT=== 'development'
            ? {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
                singleLine : 'true'
              }
            : false
      }
  })
const {masterBranch} = require('./controllers/deploy/master')
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