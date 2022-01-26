require('dotenv').config({path : './config/.env'})
const { sendOtp } = require('./controllers/auth/sendOtp')
const { logger } = require('./global/globalObjects');
const fastify = require('fastify')({
  logger: process.env.ENVIRONMENT=== 'development' ?{
       prettyPrint:logger  
     }:false
 })
const {sendOtpSchema, VerifyOtpSchema} = require('./controllers/auth/authSchema');  
const { verifyOtp } = require('./controllers/auth/verifyOtp');
fastify.register(require('fastify-redis'), { host: '127.0.0.1' })
const {redis} = fastify  
fastify.post('/mobile/check',{
  schema : sendOtpSchema, 
  handler : sendOtp    
}) 
fastify.post('/mobile/verify', {
  shcema:VerifyOtpSchema,
  handler:verifyOtp
})
require('dotenv').config({path : './config/.env'})
const start = async (port) => {
  try {
    await fastify.listen(port) 
    console.log(`auth port ${port} started`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start(process.env.AUTH_PORT) ;      
