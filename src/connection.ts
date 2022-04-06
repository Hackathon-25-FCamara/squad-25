import knex from "knex"
const connection = knex({
  client: "mysql",
  connection: {
    host: "http://localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "technical_share",
    multipleStatements: true,
  },
})
export default connection
