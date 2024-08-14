const express = require('express');
const router = express.Router();
const platoController = require('../controller/platoController');

router.post('/', platoController.createPlato);
router.get('/', platoController.getPlatos);
router.get('/:id', platoController.getPlatoById);
router.put('/:id', platoController.updatePlato);
router.delete('/:id', platoController.deletePlato);

module.exports = router;