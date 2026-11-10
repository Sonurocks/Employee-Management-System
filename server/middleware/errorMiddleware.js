const { ZodError } = require("zod");

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    errors = [message];
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `An employee with this ${field} already exists`;
    errors = [message];
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => e.message);
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errors = err.errors.map((e) => {
      const field = e.path.join(".");
      return field ? `${field}: ${e.message}` : e.message;
    });
  } else {
    errors = [message];
  }

  const response = {
    success: false,
    message,
    errors,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    response.message = "Internal Server Error";
    response.errors = ["Something went wrong on the server"];
  }

  res.status(statusCode).json(response);
};

module.exports = { errorHandler };
