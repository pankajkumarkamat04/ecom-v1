import errorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {

  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };

  if (err.name == "CastError") {
   const message = `Cannot Find Product. Invaild ${err.path}`;
    error = new errorHandler(message, 404);
  }
  if (err.name == "ValidationError") {
    let message = Object.values(err.errors).map((val) => val.message);
    error = new errorHandler(message, 400);
  }
  if(err.name == "JsonWebTokenError" || "TokenExpiredError"){
    error = new errorHandler(err.message, 400);
    
  }
  if(err.code == 11000){
    error = new errorHandler(`This ${err.keyValue.email} is already register`, 400);
    
  }
  if (process.env.NODE_ENV == "development") {
    res.status(error.statusCode).json({
      message: error.message,
      err,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV == "production") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};

export default errorMiddleware;
