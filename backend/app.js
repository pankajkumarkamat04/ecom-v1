import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dbConnect from "./config/dbConnect.js";
import authRouter from "./routes/authRoute.js";
import orderRotue from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import errorHandler from "./utils/errorHandler.js";
import path from "path"
import { fileURLToPath } from "url";

dbConnect();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express();
if(process.env.NODE_ENV === "development"){
  dotenv.config({ path: "./backend/config/.env" });
}

const port = process.env.PORT || 8000;
const mode = process.env.NODE_ENV;
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());
app.use("/api/v1/", productRouter);
app.use("/api/v1/", authRouter);
app.use("/api/v1/", orderRotue);
app.use("/api/v1/", paymentRoute);

app.use(errorMiddleware);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*" , (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
  })
}

const server = app.listen(port, () => {
  console.log(`Server is runing on port ${port} in ${mode} mode`);
});

process.on("unhandledRejection", (err) => {
  new errorHandler(err, 500);
  console.log(`error : ${err.message}`);
  console.log("Server Shuting Down Due To Unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  new errorHandler(err, 500);
  console.log(`error : ${err.message}`);
  console.log("Server Shuting Down Due To Unhandled Rejection");
  server.close(() => {
    process.exit(1);
  });
});
