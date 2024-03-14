const mongoose = require("mongoose");

const connectMongodb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://customersegmentpro:customersegmentpro23@csm.sxhshkm.mongodb.net/?retryWrites=true&w=majority&appName=CSM/user"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectMongodb;
