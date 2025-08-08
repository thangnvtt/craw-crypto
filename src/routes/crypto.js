const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("../config");
const {
  sendSuccess,
  sendValidationError,
  sendInternalError,
} = require("../utils/response");

const { baseUrl: BINANCE_BASE_URL, timeout: BINANCE_TIMEOUT } = config.binance;

/**
 * @swagger
 * tags:
 *   name: Crypto
 *   description: Cryptocurrency price endpoints
 */

/**
 * @swagger
 * /api/crypto/price/{symbol}:
 *   get:
 *     summary: Get price for a specific crypto pair
 *     description: Fetch current price data for any cryptocurrency pair supported by Binance
 *     tags: [Crypto]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         description: Trading pair symbol (e.g., BTCUSDT, ETHUSDT)
 *         schema:
 *           type: string
 *           example: BTCUSDT
 *     responses:
 *       200:
 *         description: Successfully retrieved crypto price
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               status: true
 *               message: "Price data retrieved successfully"
 *               data:
 *                 symbol: "BTCUSDT"
 *                 price: 116630.26
 *                 change: 1033.38
 *                 changePercent: 0.894
 *                 high: 117630
 *                 low: 115550
 *                 volume: 14485.96007
 *                 openPrice: 115596.88
 *                 period: "24h"
 *                 timestamp: "2025-08-08T10:17:01.651Z"
 *       400:
 *         description: Invalid symbol
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Get price for a specific crypto pair
router.get("/price/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    // Validate symbol format (should be like ETHUSDT, BTCUSDT, etc.)
    if (!symbol || symbol.length < 6) {
      return sendValidationError(
        res,
        "Symbol should be in format like ETHUSDT, BTCUSDT"
      );
    }

    const response = await axios.get(`${BINANCE_BASE_URL}/ticker/24hr`, {
      params: {
        symbol: symbol.toUpperCase(),
      },
      timeout: BINANCE_TIMEOUT,
    });

    const data = response.data;

    const priceData = {
      symbol: data.symbol,
      price: parseFloat(data.lastPrice),
      change: parseFloat(data.priceChange),
      changePercent: parseFloat(data.priceChangePercent),
      high: parseFloat(data.highPrice),
      low: parseFloat(data.lowPrice),
      volume: parseFloat(data.volume),
      openPrice: parseFloat(data.openPrice),
      period: "24h",
      timestamp: new Date().toISOString(),
    };

    sendSuccess(res, priceData, "Price data retrieved successfully");
  } catch (error) {
    console.error("Error fetching crypto price:", error.message);

    if (error.response && error.response.status === 400) {
      return sendValidationError(
        res,
        "The provided symbol is not valid or not supported by Binance"
      );
    }

    sendInternalError(res, "Unable to retrieve price data from Binance API");
  }
});

/**
 * @swagger
 * /api/crypto/ethusdt:
 *   get:
 *     summary: Get ETHUSDT price (default endpoint)
 *     description: Fetch current ETHUSDT price data from Binance
 *     tags: [Crypto]
 *     responses:
 *       200:
 *         description: Successfully retrieved ETHUSDT price
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               status: true
 *               message: "ETHUSDT price data retrieved successfully"
 *               data:
 *                 symbol: "ETHUSDT"
 *                 price: 3903.09
 *                 change: 108.29
 *                 changePercent: 2.854
 *                 high: 3969.06
 *                 low: 3780.54
 *                 volume: 679739.3467
 *                 openPrice: 3794.8
 *                 period: "24h"
 *                 timestamp: "2025-08-08T10:17:06.572Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Get price for ETHUSDT (default endpoint as per your requirement)
router.get("/ethusdt", async (req, res) => {
  try {
    const response = await axios.get(`${BINANCE_BASE_URL}/ticker/24hr`, {
      params: {
        symbol: "ETHUSDT",
      },
      timeout: BINANCE_TIMEOUT,
    });

    const data = response.data;

    const priceData = {
      symbol: data.symbol,
      price: parseFloat(data.lastPrice),
      change: parseFloat(data.priceChange),
      changePercent: parseFloat(data.priceChangePercent),
      high: parseFloat(data.highPrice),
      low: parseFloat(data.lowPrice),
      volume: parseFloat(data.volume),
      openPrice: parseFloat(data.openPrice),
      period: "24h",
      timestamp: new Date().toISOString(),
    };

    sendSuccess(res, priceData, "ETHUSDT price data retrieved successfully");
  } catch (error) {
    console.error("Error fetching ETHUSDT price:", error.message);
    sendInternalError(
      res,
      "Unable to retrieve ETHUSDT price data from Binance API"
    );
  }
});

/**
 * @swagger
 * /api/crypto/prices:
 *   post:
 *     summary: Get multiple crypto prices
 *     description: Fetch price data for multiple cryptocurrency pairs in a single request
 *     tags: [Crypto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MultiplePricesRequest'
 *           example:
 *             symbols: ["ETHUSDT", "BTCUSDT", "ADAUSDT"]
 *     responses:
 *       200:
 *         description: Successfully retrieved multiple crypto prices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               status: true
 *               message: "Multiple price data retrieved successfully"
 *               data:
 *                 period: "24h"
 *                 timestamp: "2025-08-08T10:17:11.651Z"
 *                 results:
 *                   - symbol: "ETHUSDT"
 *                     price: 3903.08
 *                     change: 108.6
 *                     changePercent: 2.862
 *                     high: 3969.06
 *                     low: 3780.54
 *                     volume: 679662.0566
 *                     openPrice: 3794.48
 *                     success: true
 *                   - symbol: "BTCUSDT"
 *                     price: 116630.2
 *                     change: 1050.19
 *                     changePercent: 0.909
 *                     high: 117630
 *                     low: 115550
 *                     volume: 14486.03447
 *                     openPrice: 115580.01
 *                     success: true
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Get multiple crypto prices
router.post("/prices", async (req, res) => {
  try {
    const { symbols } = req.body;

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return sendValidationError(
        res,
        "symbols array is required and should contain at least one symbol"
      );
    }

    const pricePromises = symbols.map(async (symbol) => {
      try {
        const response = await axios.get(`${BINANCE_BASE_URL}/ticker/24hr`, {
          params: {
            symbol: symbol.toUpperCase(),
          },
          timeout: BINANCE_TIMEOUT,
        });

        const data = response.data;
        return {
          symbol: data.symbol,
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChange),
          changePercent: parseFloat(data.priceChangePercent),
          high: parseFloat(data.highPrice),
          low: parseFloat(data.lowPrice),
          volume: parseFloat(data.volume),
          openPrice: parseFloat(data.openPrice),
          success: true,
        };
      } catch (error) {
        return {
          symbol: symbol.toUpperCase(),
          error: "Failed to fetch price",
          success: false,
        };
      }
    });

    const results = await Promise.all(pricePromises);

    const responseData = {
      period: "24h",
      timestamp: new Date().toISOString(),
      results: results,
    };

    sendSuccess(
      res,
      responseData,
      "Multiple price data retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching multiple crypto prices:", error.message);
    sendInternalError(res, "Unable to retrieve price data from Binance API");
  }
});

module.exports = router;
