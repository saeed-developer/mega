module.exports.sendOtpSchema = {
    body :{
      type : 'object',
      required: ['number'],
      properties : {number : {type : 'string',maxLength:13 }} 
  }} 
  module.exports.VerifyOtpSchema = {
    body :{
      type : 'object',
      required: ['number' , 'code'],
      properties : {number : {type : 'string' , maxLength :13 } , code : {type : 'string' , maxLength : 6 , minLength : 6}} 
  }} 
