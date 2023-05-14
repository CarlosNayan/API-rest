import fastify from 'fastify'

const server = fastify()

// GET, POST, PUT, DELETE

server.get('/', () => {
  return 'Hello world'
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Rodando em localhost:3333')
  })
