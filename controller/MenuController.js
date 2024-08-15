const sequelize = require('../config/database');
const Menu = require('../model/Menu');
const MenuPlato = require('../model/menuplato');
const Plato = require('../model/plato');

exports.createMenu = async (req, res) => {
    const { MENU_FECHA, MENU_DIAS, INGRESADO_POR, platos } = req.body;


    console.log(req.body)
    // Inicia una transacción
    const t = await sequelize.transaction();

    try {
        // Crear el menú
        const nuevoMenu = await Menu.create({
            MENU_FECHA,
            MENU_DIAS,
            INGRESADO_POR,
            FECHA_REGISTRO: new Date()
        }, { transaction: t });

        // Crear las entradas en la tabla menu_platos
        const menuPlatos = platos.map(plato => ({
            MENU_ID: nuevoMenu.MENU_ID,
            PLATO_ID: plato.PLATO_ID
        }));

        await MenuPlato.bulkCreate(menuPlatos, { transaction: t });

        // Si todo va bien, confirma la transacción
        await t.commit();

        res.status(201).json({ message: 'Menú creado correctamente', menu: nuevoMenu });

    } catch (error) {
        // Si algo sale mal, revierte la transacción
        await t.rollback();

        console.error('Error al crear el menú:', error);
        res.status(500).json({ message: 'Error al crear el menú', error });
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