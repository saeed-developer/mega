const axios = require('axios')
module.exports.sendOtp =  async function  (request , reply){ 
       let otp = '';
       for(let number = 0 ;number < 6 ; number++){ 
       const digit =Math.floor(Math.random() * 10); 
       otp += String(digit)  
       } 
  const farazsms = await axios.post('http://ippanel.com/api/select',{ 
    "op" : "send",
    "uname" : "09374613195",
    "pass":  "faraz3242056663", 
    "message" : `کدتایید شما در پیوی چنل: ${otp} \n زمان ارسال : ${new Date(Date.now()).toString().slice(16 ,24)}`,  
    "from": "3000505",
    "to" : [String(request.body.number)],     
  })
  if(farazsms.status === 200){
  await this.redis.set(request.body.number, otp , "EX",180 )           
  reply.send({message : 'sms has sent'})  
  }}  
