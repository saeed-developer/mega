module.exports.logger = {
    translateTime: 'SYS:HH:MM:ss Z',
    singleLine : 'true',
    ignore: 'pid,hostname,reqId,responseTime,res,req',
    messageFormat: '{req.method} {req.url} {req.headers} {res.statusCode} '
  } 