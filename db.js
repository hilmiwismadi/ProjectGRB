const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "GRBook",
    password: "wismadi",
    port: 5432,
});

module.exports = pool;