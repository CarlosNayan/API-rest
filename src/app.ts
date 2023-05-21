import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

// Register puxa as rotas programadas em outro lugar. A ordem dessa importação é importante!

app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
