const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        message: err.message,
        stackTrace: err.stack,
        statusCode,
        title: "Validation Found",
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        message: err.message,
        stackTrace: err.stack,
        statusCode,
        title: "Not Found",
      });
      break;
    case constants.UNAUTHORISED:
      res.json({
        message: err.message,
        stackTrace: err.stack,
        statusCode,
        title: "Wrong Data",
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        message: err.message,
        stackTrace: err.stack,
        statusCode,
        title: "Forbidden",
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        message: err.message,
        stackTrace: err.stack,
        statusCode,
        title: "Server Error",
      });
      break;
    default:
      console.log("All good");
      break;
  }
};

module.exports = errorHandler;
