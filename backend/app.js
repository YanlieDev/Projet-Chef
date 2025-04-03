const express = require('express');
const app = express();
const ENV = require('./config/env');
const connectMongoDB = require('./config/dbMongo');


// IMPORT ROUTES
const userRouter = require ('./router/user.router');
const postRouter = require ('./router/post.router');

// CONNEXION MONGO
connectMongoDB(ENV.MONGO_URI, ENV.DB_NAME);

// MIDDLEWARES
app.use(express.json()); // Permet la création, l'enregistrement et la sauvergarde de user dans (req.body)

// URLS API PREFIX
app.use("/chef_a_domicile/users", userRouter);
app.use("/chef_a_domicile/posts", postRouter);

// MIDDLEWARES DE GESTION D'ERREUR
app.use((error,req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Une erreur est survenue."
    const details = error.details || null;

    res.status(status).json({
        error: {
            status,
            message,
            details
        }
    })
})


module.exports = app;