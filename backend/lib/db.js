import mongoose from "mongoose";

export const DBconnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoose connect", connect.connection.host);
  } catch (error) {
    console.log("error in mongoose connect", error);
  }
};
