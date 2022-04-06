import knex from "knex"
const connection = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ahninanab",
    database: "technical_share",
    multipleStatements: true,
  },
})
export default connection
