const fastify = require('fastify')({logger : true})
const crypto = require('crypto');
const simpleGit = require("simple-git");
const git = simpleGit.default();
require('dotenv').config({path : './config/.env'})
fastify.post('/master' , async(request, reply)=>{
const header  =  request.headers
const body = JSON.stringify(request.body)
const hmac = crypto.createHmac('sha256', process.env.SECRET_MASTER).update(body).digest('hex')

if(header['x-hub-signature-256'] === `sha256=${hmac}`){
const pull= await git.pull()
reply.send({message : 'ok'}) 
}
else {
    reply.code(401).send({message : 'not premitted'})
}
})
const start = async(port)=>{
    try { 
           fastify.listen(port) 
    }
    catch (err){
    console.log.error(err)
    process.exit(1)
    }

} 
start(process.env.PULL_PORT)