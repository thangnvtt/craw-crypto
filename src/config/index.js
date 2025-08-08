/**
 * Configuration module for environment variables
 * Centralizes all environment variable handling with validation and defaults
 */

require("dotenv").config();

const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // API configuration
  binance: {
    baseUrl: process.env.BINANCE_BASE_URL || "https://api.binance.com/api/v3",
    timeout: parseInt(process.env.BINANCE_TIMEOUT) || 10000,
    retries: parseInt(process.env.BINANCE_RETRIES) || 3,
  },

  // Rate limiting (for future use)
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // limit each IP to 100 requests per windowMs
  },

  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: process.env.CORS_CREDENTIALS === "true",
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
};

// Validation function
function validateConfig() {
  const errors = [];

  // Validate required configurations
  if (!config.binance.baseUrl.startsWith("https://")) {
    errors.push("BINANCE_BASE_URL must be a valid HTTPS URL");
  }

  if (config.port < 1 || config.port > 65535) {
    errors.push("PORT must be between 1 and 65535");
  }

  if (config.binance.timeout < 1000) {
    errors.push("BINANCE_TIMEOUT must be at least 1000ms");
  }

  if (errors.length > 0) {
    console.error("❌ Configuration validation failed:");
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  }

  return true;
}

// Log configuration in development
function logConfig() {
  if (config.nodeEnv === "development") {
    console.log("🔧 Configuration loaded:");
    console.log(`  - Environment: ${config.nodeEnv}`);
    console.log(`  - Port: ${config.port}`);
    console.log(`  - Binance URL: ${config.binance.baseUrl}`);
    console.log(`  - Binance Timeout: ${config.binance.timeout}ms`);
    console.log(`  - CORS Origin: ${config.cors.origin}`);
  }
}

// Initialize configuration
validateConfig();
logConfig();

module.exports = config;
