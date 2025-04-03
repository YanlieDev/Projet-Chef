const Message = require('../models/post.models');


// CRÉER UN NOUVEAU POST
const post = async (req, res) => {
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
const getAllPosts = async (req, res) => {
    try {
        const response = await Message.find()
        res.status(200).json(response)
    } catch (error) {
        console.log('Error : ', error.message)
        res.status(500).json(error.message)
    }
}

// RÉCUPÉRER UN MESSAGE PAR SON ID
const getPost = async (req, res) => {
    try {
        const response = await Message.findById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        console.log('Error :', error.message)
        res.status(500).json(error.message)
    }
}

// POUR MODIFIER OU METTRE À JOUR UN POST
const updatePost = async (req, res) => {
    try {
        const response = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true} )
        res.status(200).json(response)
    } catch (error) {
        console.log('Error :', error.message)
        res.status(500).json(error.message)
    }
}

// POUR SUUPRIMER UN POST
const deletePost = async (req, res, next) => {
    try {
        await Message.findByIdAndDelete({_id: req.params.id})
        res.status(200).json("Message supprimé")
    } catch (error) {
        console.log('Error :', error.message)
        next(createError(500, "erreur delete", error.message))
    }
}



module.exports = {
    post,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
}