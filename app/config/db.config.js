require('dotenv').config();

module.exports = {
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    HOST: process.env.POSTGRES_HOST,
    DB: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    ssl: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};