const express = require('express');
const bodyParser = require('body-parser');
const { Car, Bike, Booking } = require('../models/index');

const router = express.Router();
router.use(bodyParser.json());

router.post('/book', async (req, res) => {
  const { firstName, lastName, numOfWheels, vehicleType, model, startDate, endDate } = req.body;

  try {
    // Check if the vehicle type is car or bike
    let VehicleModel;
    if (vehicleType === 'car') {
      VehicleModel = Car;
    } else if (vehicleType === 'bike') {
      VehicleModel = Bike;
    } else {
      throw new Error('Invalid vehicle type');
    }

    // Check if the vehicle exists
    const vehicle = await VehicleModel.findOne({ where: { model } });
    if (!vehicle) {
      res.status(404).json({ error: 'Vehicle not found' });
      return;
    }

    // Count bookings for the model within the date range
    const bookingCount = await Booking.count({
      where: {
        model,
        startDate: { [Op.lt]: endDate },
        endDate: { [Op.gt]: startDate }
      }
    });

    // Check if the vehicle is available based on availability
    if (bookingCount >= vehicle.availability) {
      res.status(400).json({ error: 'Vehicle not available for the selected date range' });
      return;
    }

    // Book the vehicle
    await Booking.create({ firstName, lastName, numOfWheels, vehicleType, model, startDate, endDate });
    res.status(201).json({ message: 'Booking successful' });
  } catch (error) {
    console.error('Error booking vehicle:', error);
    res.status(500).json({ error: 'Failed to book vehicle' });
  }
});

router.get('/types/:vehicleType', async (req, res) => {
  const { vehicleType } = req.params;

  try {
    let types;
    if (vehicleType === 'car') {
      types = await Car.findAll({ attributes: ['type'], group: ['type'] });
    } else if (vehicleType === 'bike') {
      types = await Bike.findAll({ attributes: ['type'], group: ['type'] });
    } else {
      throw new Error('Invalid vehicle type');
    }

    res.status(200).json(types.map(type => type.type));
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
});

router.get('/models/:vehicleType/:type', async (req, res) => {
  const { vehicleType, type } = req.params;

  try {
    let models;
    if (vehicleType === 'car') {
      models = await Car.findAll({ attributes: ['model'], where: { type } });
    } else if (vehicleType === 'bike') {
      models = await Bike.findAll({ attributes: ['model'], where: { type } });
    } else {
      throw new Error('Invalid vehicle type');
    }

    res.status(200).json(models.map(model => model.model));
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle models' });
  }
});


module.exports = router;
