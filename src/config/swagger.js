const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Price API",
      version: "1.0.0",
      description:
        "A simple Express API for fetching cryptocurrency prices from Binance",
      contact: {
        name: "API Support",
        email: "support@cryptoapi.com",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "https://craw-crypto.onrender.com",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              description: "Indicates if the request was successful",
            },
            message: {
              type: "string",
              description: "Response message",
            },
            data: {
              type: "object",
              description: "Response data",
            },
          },
          required: ["status", "message", "data"],
        },
        CryptoPrice: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "Trading pair symbol",
              example: "ETHUSDT",
            },
            price: {
              type: "number",
              description: "Current price",
              example: 3902.6,
            },
            change: {
              type: "number",
              description: "24h price change",
              example: 105.05,
            },
            changePercent: {
              type: "number",
              description: "24h price change percentage",
              example: 2.766,
            },
            high: {
              type: "number",
              description: "24h high price",
              example: 3969.06,
            },
            low: {
              type: "number",
              description: "24h low price",
              example: 3780.54,
            },
            volume: {
              type: "number",
              description: "24h trading volume",
              example: 676943.4478,
            },
            openPrice: {
              type: "number",
              description: "24h open price",
              example: 3797.55,
            },
            period: {
              type: "string",
              description: "Price period",
              example: "24h",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              description: "Response timestamp",
              example: "2025-08-08T10:17:52.642Z",
            },
          },
        },
        MultiplePricesRequest: {
          type: "object",
          properties: {
            symbols: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Array of crypto symbols",
              example: ["ETHUSDT", "BTCUSDT", "ADAUSDT"],
            },
          },
          required: ["symbols"],
        },
        MultiplePricesResponse: {
          type: "object",
          properties: {
            period: {
              type: "string",
              example: "24h",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
            results: {
              type: "array",
              items: {
                allOf: [
                  { $ref: "#/components/schemas/CryptoPrice" },
                  {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description: "Whether the price fetch was successful",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        HealthResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "OK",
            },
            message: {
              type: "string",
              example: "Crypto Price API is running",
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              description: "Error message",
            },
            data: {
              type: "object",
              nullable: true,
              description: "Error details",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js", "./src/app.js"], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

module.exports = specs;
