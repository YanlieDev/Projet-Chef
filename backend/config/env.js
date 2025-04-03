const dotenv = require('dotenv');

dotenv.config();

const ENV ={
    PORT: process.env.PORT,
    PORT_APPLICATION_FRONT: process.env.PORT_APPLICATION_FRONT,
    DB_NAME: process.env.DB_NAME,
    MONGO_URI: process.env.MONGO_URI,
}

module.exports = ENV;