require('dotenv').config({path : './../config/.env'})
const { sendOtp } = require('../controllers/auth/sendOtp')
const { logger } = require('../global/globalObjects');
const fastify = require('fastify')({
  logger: process.env.ENVIRONMENT=== 'development' ?{
       prettyPrint:logger  
     }:false
 })
const {sendOtpSchema, VerifyOtpSchema} = require('../controllers/auth/authSchema');  
const { verifyOtp } = require('../controllers/auth/verifyOtp');
const {pool} = require('./../config/db')
fastify.register(require('fastify-redis'), { host: '127.0.0.1' })
const {redis} = fastify
  const query =  (async ()=>{
    try {
      const createTable = await pool.execute(`CREATE TABLE IF NOT EXISTS  users (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL , phone INT 
      ,username VARCHAR(255)  UNIQUE NOT NULL,first_name VARCHAR(255),last_name  VARCHAR(255))`)
    }
    catch(err){
      throw err
    }
   
   })()
 


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
