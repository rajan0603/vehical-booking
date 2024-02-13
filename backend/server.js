const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/index');
// const bookingRoutes = require('./routes/booking.routes');

const app = express();
app.use(bodyParser.json());

// app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

