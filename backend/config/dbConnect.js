import mongoose from "mongoose";

const dbConnect = () => {
  let dbUrl = "";
  if (process.env.NODE_ENV === "development") {
    dbUrl = "mongodb://localhost:27017/ecom2";
  }
  if (process.env.NODE_ENV === "production") {
    dbUrl = process.env.MONGO_DB_URL;
  }
  mongoose
    .connect(dbUrl)
};

export default dbConnect;
