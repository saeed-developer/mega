const fastify = require('fastify')({ logger: true })
fastify.get('/', async (request, reply) => {
  reply.send('hello saeed')
})
const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()