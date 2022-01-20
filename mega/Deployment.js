const fastify = require('fastify')({logger : true})
//const {promisify}= require('util');
//const exec = promisify(require('child_process').exec);
const simpleGit = require("simple-git");
const git = simpleGit.default();
//promisify(exec)
const {writeFile} = require('fs/promises')
require('dotenv').config({path : './config/.env'})
fastify.post('/master' , async(request, reply)=>{
let header  =  JSON.stringify(request.headers)
let body = JSON.stringify(request.body)
await writeFile('./file.txt' ,` header : ${header} + \n body :  ${body} \n`, {flag : 'a+'}) 
await git.pull()
reply.send(null) 
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