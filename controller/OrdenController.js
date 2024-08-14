const Orden = require('../model/orden');
const Cliente = require('../model/clientes');
const Plato = require('../model/plato');
const OrdenPlato = require('../model/OrdenPlato');

exports.createOrden = async (req, res) => {
  const { CLIENTE_ID, platos } = req.body; // 'platos' es un array de { PLATO_ID, CANTIDAD }

  try {
    // Calcular el total de la orden
    let total = 0;
    const platosData = await Plato.findAll({
      where: {
        PLATO_ID: platos.map(p => p.PLATO_ID)
      }
    });

    platosData.forEach(plato => {
      const cantidad = platos.find(p => p.PLATO_ID === plato.PLATO_ID).CANTIDAD;
      total += plato.PRECIO * cantidad;
    });

    // Crear la orden
    const orden = await Orden.create({
      CLIENTE_ID,
      ESTADO: 0, // Estado inicial
      TOTAL: total
    });

    // Crear las relaciones en la tabla OrdenPlato
    for (let plato of platos) {
      await OrdenPlato.create({
        ORDEN_ID: orden.ORDEN_ID,
        PLATO_ID: plato.PLATO_ID,
        CANTIDAD: plato.CANTIDAD
      });
    }

    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.findAll({
      include: [
        { model: Cliente },
        { model: Plato }
      ]
    });
    res.status(200).json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdenById = async (req, res) => {
  try {
    const orden = await Orden.findByPk(req.params.id, {
      include: [
        { model: Cliente },
        { model: Plato }
      ]
    });
    if (orden) {
      res.status(200).json(orden);
    } else {
      res.status(404).json({ error: 'Orden not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrden = async (req, res) => {
  const { ESTADO } = req.body;

  try {
    const [updated] = await Orden.update({ ESTADO }, { where: { ORDEN_ID: req.params.id } });
    if (updated) {
      const updatedOrden = await Orden.findByPk(req.params.id);
      res.status(200).json(updatedOrden);
    } else {
      res.status(404).json({ error: 'Orden not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrden = async (req, res) => {
  try {
    const deleted = await Orden.destroy({ where: { ORDEN_ID: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Orden not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};