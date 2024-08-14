const PlatoTipo = require('../model/platoTipo');

exports.createPlatoTipo = async (req, res) => {
  const { NOMBRE, INGRESADO_POR } = req.body;

  try {
    const platoTipo = await PlatoTipo.create({
      NOMBRE,
      INGRESADO_POR,
      FECHA_REGISTRO: new Date()
    });
    res.status(201).json(platoTipo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlatoTipos = async (req, res) => {
  try {
    const platoTipos = await PlatoTipo.findAll();
    res.status(200).json(platoTipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlatoTipoById = async (req, res) => {
  try {
    const platoTipo = await PlatoTipo.findByPk(req.params.id);
    if (platoTipo) {
      res.status(200).json(platoTipo);
    } else {
      res.status(404).json({ error: 'PlatoTipo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlatoTipo = async (req, res) => {
  const { NOMBRE, INGRESADO_POR } = req.body;

  try {
    const [updated] = await PlatoTipo.update({ NOMBRE, INGRESADO_POR }, { where: { PLATO_TIPOS_ID: req.params.id } });
    if (updated) {
      const updatedPlatoTipo = await PlatoTipo.findByPk(req.params.id);
      res.status(200).json(updatedPlatoTipo);
    } else {
      res.status(404).json({ error: 'PlatoTipo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlatoTipo = async (req, res) => {
  try {
    const deleted = await PlatoTipo.destroy({ where: { PLATO_TIPOS_ID: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'PlatoTipo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};