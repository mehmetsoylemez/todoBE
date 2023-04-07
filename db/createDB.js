const env = process.env.NODE_ENV || 'development';
const dbConfig = require("../app/config/config.json")[env];
const { Client } = require("pg");

async function createDatabase() {
  const client = new Client({
    user: "postgres",
    password: "password",
    database: "postgres",
    host: "localhost",
    port: 5432
  });

  try {
    await client.connect();
  } catch (err) {
    console.log(err);
  }

  try {
    await client.query(`CREATE USER ${dbConfig.username} with encrypted password '${dbConfig.password}'`);
    await client.query(
      `CREATE DATABASE ${dbConfig.database};`
    );
    await client.query(
      `GRANT ALL PRIVILEGES ON DATABASE ${dbConfig.database} TO ${dbConfig.username};`
    );
  } catch (err) {
    console.log(err);
  }
  client.end();
}

createDatabase();
