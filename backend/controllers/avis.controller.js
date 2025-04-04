const Message = require('../models/avis.models');


// CRÉER UN NOUVEAU POST
const avis = async (req, res) => {
    try {
        const response = await Message.create(req.body)
        res.status(201).json({
            message: "Le message a été ajouté", response})
    } catch (error) {
        console.log('Error : ', error.message)
        res.status(500).json(error.message)
    }
}

// POUR RÉCUPÉRER TOUS LES MESSAGES
const getAllAvis = async (req, res) => {
    try {
        const response = await Message.find()
        res.status(200).json(response)
    } catch (error) {
        console.log('Error : ', error.message)
        res.status(500).json(error.message)
    }
}

// RÉCUPÉRER UN MESSAGE PAR SON ID
const getAvis = async (req, res) => {
    try {
        const response = await Message.findById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        console.log('Error :', error.message)
        res.status(500).json(error.message)
    }
}

// POUR MODIFIER OU METTRE À JOUR UN POST
const updateAvis = async (req, res) => {
    try {
        const response = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true} )
        res.status(200).json(response)
    } catch (error) {
        console.log('Error :', error.message)
        res.status(500).json(error.message)
    }
}

// POUR SUUPRIMER UN POST
const deleteAvis = async (req, res, next) => {
    try {
        await Message.findByIdAndDelete({_id: req.params.id})
        res.status(200).json("Message supprimé")
    } catch (error) {
        console.log('Error :', error.message)
        next(createError(500, "erreur delete", error.message))
    }
}



module.exports = {
    avis,
    getAllAvis,
    getAvis,
    updateAvis,
    deleteAvis
}