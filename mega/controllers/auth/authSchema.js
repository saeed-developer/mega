module.exports.sendOtpSchema = {
    body :{
      type : 'object',
      required: ['number'],
      properties : {number : {type : 'string',maxLength:13 }}
 
  }} 
