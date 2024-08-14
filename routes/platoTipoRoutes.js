const express = require('express');
const router = express.Router();
const platoTipoController = require('../controller/platoTipoController');

router.post('/', platoTipoController.createPlatoTipo);
router.get('/', platoTipoController.getPlatoTipos);
router.get('/:id', platoTipoController.getPlatoTipoById);
router.put('/:id', platoTipoController.updatePlatoTipo);
router.delete('/:id', platoTipoController.deletePlatoTipo);

module.exports = router;