/**
 * Lightweight Schema Validation Middleware (Senior Standard)
 * Provides declarative request validation without external library bloat
 */
const validate = (schema) => (req, res, next) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.body[field];

    if (
      rules.required &&
      (value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === ""))
    ) {
      errors.push(`${field} is required`);
      continue;
    }

    if (value !== undefined && value !== null && value !== "") {
      if (rules.type && typeof value !== rules.type) {
        errors.push(`${field} must be of type ${rules.type}`);
      }
      if (
        rules.minLength &&
        typeof value === "string" &&
        value.trim().length < rules.minLength
      ) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      if (
        rules.url &&
        typeof value === "string" &&
        !/^https?:\/\/.+/.test(value.trim())
      ) {
        errors.push(`${field} must be a valid URL starting with http:// or https://`);
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Request validation failed",
      errors,
    });
  }

  next();
};

module.exports = { validate };
