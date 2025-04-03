// IMPORTATION DU MODULE EXPRESS
const express = require('express');
// CRÉATION D'UN ROUTER EXPRESS
const router = express.Router();


const PostController = require('../controllers/post.controller');

router.post('/add', PostController.post)
router.get('/all', PostController.getAllPosts)
router.get('/detail/:id', PostController.getPost)
router.put('/update/:id', PostController.updatePost)
router.delete('/delete/:id', PostController.deletePost)

module.exports = router;
