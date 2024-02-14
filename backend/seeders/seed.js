const { Car, Bike, sequelize } = require('../models/index');

const seedDatabase = async () => {
  try {
    // Seed car types and vehicles
    await Car.bulkCreate([
      { vehicleType: 'car', model: 'Toyota Corolla', availability: 5, type: 'sedan' },
      { vehicleType: 'car', model: 'Honda Civic', availability: 3, type: 'sedan' },
      { vehicleType: 'car', model: 'Toyota RAV4', availability: 2, type: 'suv' },
      { vehicleType: 'car', model: 'Honda CR-V', availability: 4, type: 'suv' },
      { vehicleType: 'car', model: 'Volkswagen Golf', availability: 3, type: 'hatchback' }
    ]);

    // Seed bike types and vehicles
    await Bike.bulkCreate([
      { vehicleType: 'bike', model: 'Harley-Davidson Street Glide', availability: 2, type: 'cruiser' },
      { vehicleType: 'bike', model: 'Yamaha YZF-R1', availability: 3, type: 'sports' }
    ]);

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Call the seedDatabase function
seedDatabase();

