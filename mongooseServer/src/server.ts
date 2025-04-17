import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import app from "./index";

const PORT = process.env.PORT;
const URL = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(URL as string);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(`server error: ${(e as Error).message}`);
  }
};

startServer();
