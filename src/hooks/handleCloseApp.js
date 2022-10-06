import mongoose from 'mongoose';

async function handleCloseApp() {
  await mongoose.connection.close();
}

export { handleCloseApp };
