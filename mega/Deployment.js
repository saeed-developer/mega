const fastify = require('fastify')({logger : true})
const crypto = require('crypto');
const simpleGit = require("simple-git");
const git = simpleGit.default();
const {promisify}= require('util');
const exec = promisify(require('child_process').exec);
require('dotenv').config({path : './config/.env'})
fastify.post('/master' , async(request, reply)=>{
const header  =  request.headers
const body = request.body
const StringBody = JSON.stringify(request.body)
const hmac = crypto.createHmac('sha256', process.env.SECRET_MASTER).update(StringBody).digest('hex')
if(header['x-hub-signature-256'] === `sha256=${hmac}`){
const pull= await git.pull()
if(body.commits[0].modified.includes('mega/package.json')){
/*await exec('rm yarn.lock')
await exec('rm package-lock.json')*/
await exec('npm install')
}
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