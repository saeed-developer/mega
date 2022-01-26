module.exports.verifyOtp =async function (request , reply){
    const {number , code} = request.body
    const otp = await this.redis.get(number)
    console.log(code , otp )
    if(String(otp) === String(code)){
         reply.send({message : 'ok'})
    }
    else {
    reply.status(401).send({message : 'not ok'})
    }
   
}