require('dotenv').config()

module.exports = {
    port : process.env.PORT||3000,
    database : process.env.DATABASE || "mongodb://localhost:27017/duma-mediolanu",
    ACCES_TOKEN: process.env.ACCES_TOKEN,
};