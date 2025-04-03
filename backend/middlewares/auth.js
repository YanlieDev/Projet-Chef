const ENV = require('../config/env');
const createError = require('./error');
const jwt = require('jsonwebtoken');


const verifieToken = (req, res, next) => {
    // Récupère le token (token) JWT à partir des cookies de la requête
    const token = req.cookies.acces_token;

    // Si le token n'est pas présent, renvoi une erreur 401 (accès refusé)
    if(!token) return next(createError(401, 'Access Denied'));

    // Vérifier la validité du token en utilisant JWT.VERIFY
    jwt.verify(token, ENV.TOKEN, (error, user) => {
        // Si une erreur se produit lors de la vérification du token
        if(error) { 
            // Renvoi une erreur 404 (interdit) car le token n'est pas valide
            return next(createError(403, 'Token non valide', error.message))
        }
        // Si la vérification réussit, ajoute les informations de l'utilisateur dans l'objet req. 
        req.user = user

        next()
    })
}
module.exports = verifieToken;