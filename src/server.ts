import fastify from 'fastify'
import { knex } from './database'

const server = fastify()

// GET, POST, PUT, DELETE

server.get('/hello/list_all', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Rodando em localhost:3333')
  })
