import knex from "knex"
const connection = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "techshare",
    password: "techshare123",
    database: "technical_share",
    multipleStatements: true,
  },
})
export default connection
