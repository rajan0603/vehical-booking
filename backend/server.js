const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const bookingRoutes = require('./routes/booking');

const app = express();
app.use(bodyParser.json());

app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

