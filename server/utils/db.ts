// // import { createDatabase } from 'db0'
// // import postgresql from 'db0/connectors/postgresql'
// // import { drizzle } from 'db0/integrations/drizzle'
// import { drizzle } from 'drizzle-orm/node-postgres'
// // const db = drizzle(
// //   createDatabase(
// //     postgresql({
// //       url: process.env.DATABASE_URL!,
// //     })
// //   )
// // )
// const db = drizzle({
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   },
// })
// export default db
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '../database/schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

const db = drizzle(process.env.DATABASE_URL, { schema })
export default db
