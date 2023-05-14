// eslint-disable-next-line
import { Knex } from 'kenx'

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      created_ate: string
      sessions_id?: string
    }
  }
}
