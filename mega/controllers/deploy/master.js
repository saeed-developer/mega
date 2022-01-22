const crypto = require('crypto');
const simpleGit = require("simple-git");
const git = simpleGit.default();
const {promisify}= require('util');
const exec = promisify(require('child_process').exec);
module.exports.masterBranch = async function(request, reply){
    const header  =  request.headers
    const body = request.body
    const StringBody = JSON.stringify(request.body)
    const hmac = crypto.createHmac('sha256', process.env.SECRET_MASTER).update(StringBody).digest('hex')
    if(header['x-hub-signature-256'] === `sha256=${hmac}`){
    const pull= await git.pull()
    if(body.commits[0].modified.includes('mega/package.json')){
        await exec('npm install')
    }
    reply.send({message : 'ok'}) 
    }
    else {
        reply.code(401).send({message : 'not premitted'})
    }
    }