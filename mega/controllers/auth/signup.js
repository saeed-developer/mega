const bcrypt = require('bcrypt');
const User = require('../../models/User');
module.exports.signup =async function (request , reply){
try {
const {number , username , password , firstName , lastName} = request.body
const saltRounds = 10
const hash = await bcrypt.hash(password, saltRounds)
const user = new User(number , username , hash , firstName , lastName)
await user.save()
reply.send({message : 'ok'})
}
catch(err){
    throw err
}
}