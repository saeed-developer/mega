const fastify = require('fastify')({ logger: true })
fastify.get('/', async (request, reply) => {
  reply.send('see')
})
require('dotenv').config({path : './config/.env'})
const start = async (port) => {
  try {
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start(process.env.AUTH_PORT)