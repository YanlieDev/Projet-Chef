// IMPORTATION DU MODULE EXPRESS
const express = require('express');
// CRÉATION D'UN ROUTER EXPRESS
const router = express.Router();


const AvisController = require('../controllers/avis.controller');

router.post('/add', AvisController.avis)
router.get('/all', AvisController.getAllAvis)
router.get('/detail/:id', AvisController.getAvis)
router.put('/update/:id', AvisController.updateAvis)
router.delete('/delete/:id', AvisController.deleteAvis)

module.exports = router;
