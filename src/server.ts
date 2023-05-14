import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const server = fastify()

// GET, POST, PUT, DELETE

server.get('/hello/list_all', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Rodando em localhost:3333')
  })
