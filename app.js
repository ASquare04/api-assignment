const express = require('express');

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const trainRoutes = require('./routes/trainRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const bodyParser = require('body-parser');

const sequelize = require('./common/database');

require('dotenv').config();

const app = express();
const port = process.env.APP_PORT || 5000;

app.use(bodyParser.json());

app.use('/accounts', userRoutes);
app.use('/admin', adminRoutes);
app.use('/services', trainRoutes);
app.use('/reservations', bookingRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Database connection successful.');
  });
}).catch(err => {
  console.error('Database connection failed:', err);
});
