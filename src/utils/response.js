/**
 * Standardized response utility for the crypto API
 * All responses follow the format: { status: boolean, message: string, data: any }
 */

/**
 * Send a successful response
 * @param {Object} res - Express response object
 * @param {any} data - Data to send
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 */
const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    message: message,
    data: data,
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {any} data - Optional error data
 */
const sendError = (res, message, statusCode = 500, data = null) => {
  res.status(statusCode).json({
    status: false,
    message: message,
    data: data,
  });
};

/**
 * Send a validation error response
 * @param {Object} res - Express response object
 * @param {string} message - Validation error message
 * @param {any} data - Optional validation error details
 */
const sendValidationError = (res, message, data = null) => {
  sendError(res, message, 400, data);
};

/**
 * Send a not found error response
 * @param {Object} res - Express response object
 * @param {string} message - Not found message
 */
const sendNotFound = (res, message = "Resource not found") => {
  sendError(res, message, 404);
};

/**
 * Send an internal server error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
const sendInternalError = (res, message = "Internal server error") => {
  sendError(res, message, 500);
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendInternalError,
};
