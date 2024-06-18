const mongoose = require('mongoose');
const DB_CNN = process.env.DB_CNN;

const connectionDB = async () => {
  try {
    await mongoose.connect( DB_CNN );
    console.log('DB ONLINE');
  } catch (error) {
    console.log('database error:', error);
    throw new Error('Error in the time to init BD');
  }
}

module.exports = {
  connectionDB,
}
