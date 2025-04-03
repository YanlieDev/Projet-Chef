const mongoose = require('mongoose');

const connectMongoDB = (mongoUri, dbName) => {
    mongoose
        .connect(mongoUri, {dbName: dbName})
        .then(() => console.log('Connexion à Mongo réussie'))
        .catch(error => console.log(error))
}
module.exports = connectMongoDB;