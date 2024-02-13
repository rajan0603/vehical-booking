const db = require('./models/index');

const seed = async () => {
  try {
    // Seed car types
    const carTypes = await db.car.bulkCreate([
      { model: 'Toyota Yaris', type: 'hatchback', numberOfWheels: 4 },
      { model: 'Toyota RAV4', type: 'suv', numberOfWheels: 4 },
      { model: 'Toyota Camry', type: 'sedan', numberOfWheels: 4 }
    ]);

    // Seed bike type
    const bikeType = await db.bikes.bulkCreate([
      { model: 'Harley-Davidson Street Glide', type: 'cruiser', numberOfWheels: 2 }
    ]);

    // Seed users
    const users = await db.users.bulkCreate([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' }
    ]);

    // Seed bookings
    const bookings = await db.bookings.bulkCreate([
      { startDate: new Date(), endDate: new Date(), UserId: users[0].id, CarId: carTypes[0].id },
      { startDate: new Date(), endDate: new Date(), UserId: users[1].id, BikeId: bikeType[0].id }
    ]);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    await db.sequelize.close();
  }
};

seed();
