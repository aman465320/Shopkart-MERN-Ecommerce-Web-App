const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    console.log(
      `connected to database ${connect.connection.name}`.bgMagenta.white
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
