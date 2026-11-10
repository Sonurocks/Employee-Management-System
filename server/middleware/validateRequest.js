const { ZodError } = require("zod");

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => {
          const field = err.path.join(".");
          return field ? `${field}: ${err.message}` : err.message;
        });
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
      }
      next(error);
    }
  };
};

module.exports = validateRequest;
