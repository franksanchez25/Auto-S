const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const platoRoutes = require('./routes/platoRoutes');
const ordenRoutes = require('./routes/ordenRoutes');  // Importa las rutas de órdenes
const platoTipoRoutes = require('./routes/platoTipoRoutes');  // Importa las rutas de PlatoTipo
const menuRoutes = require('./routes/menuRoutes');
// Similarmente importa las otras rutas aquí

const app = express();


app.use(express.json());
app.use(cors());
app.use('/api/platos', platoRoutes);
// Similarmente usa las otras rutas aquí
app.use('/api/menus', menuRoutes); 
app.use('/api/plato-tipos', platoTipoRoutes);  // Usa las rutas de PlatoTipo
app.use('/api/ordenes', ordenRoutes);  // Usa las rutas de órdenes

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});