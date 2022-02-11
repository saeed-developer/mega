const User = require("../../models/User")
const bcrypt = require('bcrypt');
module.exports.login = async function(request , reply) {
const {username , password} = request.body
const user = new User()
try {
const data = await user.findByUsername(username)
const checkPass = await bcrypt.compare(password , data[0].password)
if(checkPass){
reply.send({message : 'ok'})
}
else {
    reply.code(401).send({message : {
        english : 'your username or password wrong',
        persian : 'نام کاربری یا گذرواژه شما اشتباه است'

    }})
}
}
catch (err){
    throw err
}
}