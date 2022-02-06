require('dotenv').config({path : './config/.env'})
const { sendOtp } = require('./controllers/auth/sendOtp')
const mysql = require('mysql');
const { logger } = require('./global/globalObjects');
const fastify = require('fastify')({
  logger: process.env.ENVIRONMENT=== 'development' ?{
       prettyPrint:logger  
     }:false
 })
const {sendOtpSchema, VerifyOtpSchema} = require('./controllers/auth/authSchema');  
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'main'
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

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
