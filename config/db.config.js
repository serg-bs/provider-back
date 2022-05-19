module.exports = {
  HOST: process.env.POSTGRES_HOST || "localhost",
  USER: process.env.POSTGRES_USER || "postgres",
  PASSWORD: process.env.POSTGRES_PASSWORD || "Initial0",
  DB: process.env.POSTGRES_DB || "provider",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
