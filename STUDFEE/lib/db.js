import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/stutentfeesmanagement'
    );
    console.log("mongodb connected sucess....")
  } catch (error) {
    console.log(error.message);
  }
};

export default  connectdb;