// IMPORTATION DU MODULE EXPRESS
const express = require('express');
//CRÉATION D'UN ROUTER EXPRESS
const router = express.Router();
// IMPORTATION DU MODEL USERS
const verifieToken = require('../middlewares/auth')


const UserController = require('../controllers/user.controller');

router.post('/add', UserController.postUser)
router.post('/sign', UserController.sign)
router.get('/all', UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.put('/update/:id', verifieToken, UserController.updateUser)
router.delete('/delete/:id', verifieToken, UserController.deleteUser)


module.exports = router;

