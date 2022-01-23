require('dotenv').config({path : './config/.env'})
const { sendOtp } = require('./controllers/auth/sendOtp')
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
const {sendOtpSchema} = require('./controllers/auth/authSchema')  
fastify.register(require('fastify-redis'), { host: '127.0.0.1' })
const {redis} = fastify  
fastify.post('/mobile/check',{
  schema : sendOtpSchema, 
  handler : sendOtp    
})
require('dotenv').config({path : './config/.env'})
const start = async (port) => {
  try {
    await fastify.listen(port) 
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start(process.env.AUTH_PORT) ;      
