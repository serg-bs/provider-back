module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Initial0",
  DB: "am",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
