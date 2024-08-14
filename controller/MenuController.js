const Menu = require('../model/Menu');
const Plato = require('../model/plato');

exports.createMenu = async (req, res) => {
  const { MENU_FECHA, MENU_DIAS, INGRESADO_POR, platoIds } = req.body;
  
  try {
    // Crear el menú
    const menu = await Menu.create({
      MENU_FECHA,
      MENU_DIAS,
      INGRESADO_POR,
      FECHA_REGISTRO: new Date()
    });

    // Asignar los platos al menú
    if (platoIds && platoIds.length > 0) {
      const platos = await Plato.findAll({
        where: { PLATO_ID: platoIds }
      });
      await menu.addPlatos(platos);
    }

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({
      include: [Plato]
    });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};