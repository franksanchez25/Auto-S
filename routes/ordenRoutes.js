const express = require('express');
const router = express.Router();
const ordenController = require('../controller/OrdenController');

router.post('/', ordenController.createOrden);
router.get('/', ordenController.getOrdenes);
router.get('/:id', ordenController.getOrdenById);
router.put('/:id', ordenController.updateOrden);
router.delete('/:id', ordenController.deleteOrden);

module.exports = router;