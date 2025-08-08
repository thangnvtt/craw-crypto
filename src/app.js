const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
require("dotenv").config();

const cryptoRoutes = require("./routes/crypto");
const {
  sendSuccess,
  sendNotFound,
  sendInternalError,
} = require("./utils/response");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Crypto Price API Documentation",
  })
);

// Routes
app.use("/api/crypto", cryptoRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Check if the API is running and healthy
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               status: true
 *               message: "Crypto Price API is running"
 *               data:
 *                 status: "OK"
 *                 timestamp: "2025-08-08T10:17:52.295Z"
 */
// Health check endpoint
app.get("/health", (req, res) => {
  sendSuccess(
    res,
    {
      status: "OK",
      timestamp: new Date().toISOString(),
    },
    "Crypto Price API is running"
  );
});

// 404 handler
app.use("*", (req, res) => {
  sendNotFound(res, "The requested endpoint does not exist");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  sendInternalError(res, "Something went wrong on our end");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Crypto API available at http://localhost:${PORT}/api/crypto`);
  console.log(
    `📚 API Documentation available at http://localhost:${PORT}/api-docs`
  );
});

module.exports = app;
