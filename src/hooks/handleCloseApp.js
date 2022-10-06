import mongoose from 'mongoose';

const handleCloseApp = async () => {
  await mongoose.connection.close();
};

export { handleCloseApp };
