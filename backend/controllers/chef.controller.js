const ENV = require('../config/env');
const bcrypt = require('bcrypt');
const createError = require('../middlewares/error');
const jwt = require('jsonwebtoken');

// MODEL

const Chefs = require('../models/chef.models');

//CRÉER UN NOUVEAU CHEF

const postChef = async () => {
    try {
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        const result = await Chefs.create({...req.body, password: passwordHashed})
        res.status(201).json({message: 'Chef created !', result})
    } catch (error) {
        console.log('Error : ', error.message);
        res.status(500).json(error.message)
    }
}

// POUR AFFICHER TOUS LES CHEFS DE LA BASE DE DONNÉES

const getAllChefs = async () => {
    try {
        const result = await Chefs.find();
        res.status(200).json(result);
    } catch (error) {
        console.log('Error : ', error.message);  
    }
}

// POUR TROUVER UN CHEF PAR SON ID

const getChef = async () => {
    try {
        const result = await Chefs.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error :', error.message); 
    }
}

// POUR MODIFIER OU METTRE À JOUR UN CHEF

const updateChef = async () => {
    try {
        //Optionnel, vérifier si le chef est authentifié
        if(!req.chef || !req.chef.id) {
            return next(createError(401, 'Authentification requise.'))
        }
        // Trouver le chef par son id dans la base de données
        const chef = await Chefs.findById(req.params.id);
        if(!chef) return next(createError(400, 'Chef not found'));
        // Vérifier si le chef a le droit de modifier le compte
        if(chef._id.tostring() != req.chef._id.tostring()) return nexte(createError(403, 'Accès refusé !!!'));
        // Mettre à jour le chef
        const result = await Chefs.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}

// POUR SUPPRIMER UN CHEF

const deleteChef = async () => {
    try {
        //Optionnel, vérifier si le chef est authentifié
        if(!req.chef || !req.chef.id) {
            return next(createError(401, 'Authentification requise.'))
        }
        // Trouver le chef par son id dans la base de données
        const chef = await Chefs.findById(req.params.id);
        if(!chef) return next(createError(400, 'Chef not found'));
        // Vérifier si le chef a le droit de modifier le compte
        if(chef._id.tostring() != req.chef._id.tostring()) return nexte(createError(403, 'Accès refusé !!!'));
        chef.isActive = false;
        await chef.save()
        res.status(200).json('Chef désactivé !!!')
    } catch (error) {
        console.log('Error : ', error.message);
        next(createError(500, error.message))
    }
}

module.exports = {
    postChef,
    getAllChefs,
    getChef,
    updateChef, 
    deleteChef
}