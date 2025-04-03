const ENV = require('../config/env');
const bcrypt = require('bcrypt');
const createError = require('../middlewares/error');
const jwt = require('jsonwebtoken');

// MODEL

const Users = require('../models/user.models');

// CRÉER UN NOUVEL UTILISATEUR

const postUser = async (req, res) => {
    try {
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        const result = await Users.create({...req.body, password: passwordHashed})
        res.status(201).json({mesaage: 'User created !', result})
    } catch (error) {
        console.log('Error : ', error.message);
        res.status(500).json(error.message)  
    }
}

// AUTHENTIFICATION À LA CONNEXION DE L'USER ET DE SON MOT DE PASSE

const sign = async(req, res, next) => {
    try {
        // 1 Recherche l'utilisateur dans la base de données avec son mail
        const user = await Users.findOne({email: req.body.email});
        // 2 Si l'utilisateur n'est pas trouvé, renvoi une erreur 404
        if(!user) return res.status(404).json('User not found !');
        // 3 On vérifie si l'utilisateur a confirmé son email
        if(!user.isVerified) return next(createError(403, 'Veuillez verifié votre email svp !!!'));
        // 4 Compare le mot de passe fourni dans la requête avec le mot de passe de l'utilisateur dans la BDD
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        // Si le mot de passe est incorrect, renvoi une erreur 400
        if(!comparePassword) return res.status(400).json('Wrong Credentials !!')
        // 5 Crée un jeton JWT
        const token = jwt.sign({id:user._id}, ENV.TOKEN, { expiresIn: "24h"})
        // 6 Supprime le mot de passe de l'user pour des raisons de sécurité
        // Le code destructure pour extraire la propriété passwordde user._doc
        // Toutes les autres propriétés sont regroupées dans un nouvel objet others.
        const { password, ...others} = user._doc;

        res.cookie('access_token', token,
            { httpOnly: true,
                        maxAge: 24 * 60 * 1000,
                        secure: false,
                        sameSite: 'strict'
            })
            .status(200).json(others);
    } catch (error) {
        console.log('Error : ', error.message);
        res.status(500).json(error.message)
    }
}

// POUR AFFICHER TOUS LES UTILISATEURS DE LA BASE DE DONNÉES

const getAllUsers = async (req, res) => {
    try {
        const result = await Users.find();
        res.status(200).json(result);
    } catch (error) {
        console.log('Error : ', error.message);
    }
}

// POUR TROUVER UN UTILISATEURS PAR SON ID

const getUser = async (req, res) => {
    try {
        const result = await Users.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error : ', error.message);  
    }
}

// POUR MODIFIER OU METTRE À JOUR UN UTILISATEUR

const updateUser = async (req, res, next) => {
    try {
        // Optionnel, vérifier si l'utilisateur est authentifié
        if(!req.user || !req.user.id) {
            return next(createError(401, 'Authentification requise.'))
        }
        // Trouver l'utilisateur par son id dans la base de données
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(400, 'User not found'));
        // Vérifier si l'utilisateur a le droit de modifier le compte
        if(user._id.tostring() != req.user._id.tostring()) return next(createError(403, 'Accès refusé !!!'));
        // Mettre à jour l'utilisateur
        const result = await Users.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}

// POUR SUPPRIMER UN UTILISATEUR

const deleteUser = async () => {
   try {
        // Optionnel, vérifier si l'utilisateur est authentifié
        if(!req.user || !req.user.id) {
            return next(createError(401, 'Authentification requise.'))
        }
        // Trouver l'utilisateur par son id dans la base de données
        const user =  await Users.findById(req.params.id);
        if(!user) return next(createError(400, 'User not found'));
        // Vérifier si l'utilisateur a le droit de modifier le compte
        if(user._id.tostring() != req.user._id.tostring()) return next(createError(403, 'Accès refusé !!!'));
        user.isActive = false;
        await user.save()
        res.status(200).json('Utilisateurs désactivé !!!')
    } catch (error) {
        console.log('Error : ', error.message);
        next(createError(500, error.message))
    }
}




module.exports = {
    postUser,
    sign,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}