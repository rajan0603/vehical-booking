const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
const bookingRoutes = require('./routes/booking.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api/vehicles', bookingRoutes);

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

