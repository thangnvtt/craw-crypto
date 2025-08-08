/**
 * Example usage of the Crypto Price API
 * This file demonstrates how to interact with all API endpoints
 */

const axios = require("axios");

const BASE_URL = "http://localhost:3000";

// Example 1: Health Check
async function healthCheck() {
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    console.log("✅ Health Check:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Health Check failed:",
      error.response?.data || error.message
    );
  }
}

// Example 2: Get ETHUSDT Price
async function getETHUSDTPrice() {
  try {
    const response = await axios.get(`${BASE_URL}/api/crypto/ethusdt`);
    console.log("✅ ETHUSDT Price:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ ETHUSDT Price failed:",
      error.response?.data || error.message
    );
  }
}

// Example 3: Get any crypto price
async function getCryptoPrice(symbol) {
  try {
    const response = await axios.get(`${BASE_URL}/api/crypto/price/${symbol}`);
    console.log(`✅ ${symbol} Price:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `❌ ${symbol} Price failed:`,
      error.response?.data || error.message
    );
  }
}

// Example 4: Get multiple crypto prices
async function getMultiplePrices(symbols) {
  try {
    const response = await axios.post(`${BASE_URL}/api/crypto/prices`, {
      symbols: symbols,
    });
    console.log("✅ Multiple Prices:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Multiple Prices failed:",
      error.response?.data || error.message
    );
  }
}

// Example 5: Error handling
async function testErrorHandling() {
  try {
    const response = await axios.get(`${BASE_URL}/api/crypto/price/INVALID`);
    console.log("This should not be reached");
  } catch (error) {
    console.log("✅ Error Response:", error.response?.data);
  }
}

// Run all examples
async function runExamples() {
  console.log("🚀 Running Crypto API Examples\n");

  await healthCheck();
  console.log("");

  await getETHUSDTPrice();
  console.log("");

  await getCryptoPrice("BTCUSDT");
  console.log("");

  await getMultiplePrices(["ETHUSDT", "BTCUSDT", "ADAUSDT"]);
  console.log("");

  console.log("Testing error handling:");
  await testErrorHandling();

  console.log("\n✅ All examples completed!");
  console.log(
    "\n📚 Visit http://localhost:3000/api-docs for interactive API documentation"
  );
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples().catch(console.error);
}

module.exports = {
  healthCheck,
  getETHUSDTPrice,
  getCryptoPrice,
  getMultiplePrices,
  testErrorHandling,
};
