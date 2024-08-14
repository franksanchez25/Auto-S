const Plato = require('../model/plato');
const PlatoTipo = require('../model/platoTipo'); // Importa el modelo PlatoTipo

exports.createPlato = async (req, res) => {
  try {
    console.log('Se agrego plato')
    console.log(req.body)
    const plato = await Plato.create(req.body);
    res.status(201).json(plato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlatos = async (req, res) => {
  try {
    const platos = await Plato.findAll({
      include: [PlatoTipo]  // Incluir el tipo de plato en la consulta
    });
    res.status(200).json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlatoById = async (req, res) => {
  try {
    const plato = await Plato.findByPk(req.params.id);
    if (plato) {
      res.status(200).json(plato);
    } else {
      res.status(404).json({ error: 'Plato not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlato = async (req, res) => {
  try {
    const [updated] = await Plato.update(req.body, { where: { PLATO_ID: req.params.id } });
    if (updated) {
      const updatedPlato = await Plato.findByPk(req.params.id);
      res.status(200).json(updatedPlato);
    } else {
      res.status(404).json({ error: 'Plato not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlato = async (req, res) => {
  try {
    const deleted = await Plato.destroy({ where: { PLATO_ID: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Plato not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};