# Project Structure

```
craw-crypto/
├── src/                    # Source code
│   ├── app.js             # Main Express application
│   ├── config/            # Configuration files
│   │   └── swagger.js     # Swagger/OpenAPI configuration
│   ├── routes/            # Route handlers
│   │   └── crypto.js      # Crypto API endpoints
│   └── utils/             # Utility functions
│       └── response.js    # Standardized response utilities
├── examples/              # Usage examples
│   └── api-usage.js       # API usage examples
├── package.json           # Project dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
├── test-api.sh           # API testing script
└── STRUCTURE.md          # This file
```

## Key Features

### 1. **Standardized Response Format**

All API responses follow the format:

```json
{
  "status": boolean,
  "message": "string",
  "data": any
}
```

### 2. **Swagger Documentation**

- Interactive API documentation at `/api-docs`
- Complete endpoint documentation with examples
- Request/response schemas defined

### 3. **API Endpoints**

- `GET /health` - Health check
- `GET /api/crypto/ethusdt` - ETHUSDT price
- `GET /api/crypto/price/:symbol` - Any crypto price
- `POST /api/crypto/prices` - Multiple crypto prices

### 4. **Error Handling**

- Validation errors (400)
- Not found errors (404)
- Internal server errors (500)
- All errors follow standardized format

### 5. **Security & Performance**

- Helmet.js for security headers
- CORS enabled
- Request timeouts
- Error logging

## Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Test API endpoints
npm run test:api

# Run usage examples
npm run examples
```

## Response Examples

### Success Response

```json
{
  "status": true,
  "message": "ETHUSDT price data retrieved successfully",
  "data": {
    "symbol": "ETHUSDT",
    "price": 3896.5,
    "change": 105.5,
    "changePercent": 2.783,
    "high": 3969.06,
    "low": 3780.54,
    "volume": 672500.845,
    "openPrice": 3791,
    "period": "24h",
    "timestamp": "2025-08-08T10:23:21.756Z"
  }
}
```

### Error Response

```json
{
  "status": false,
  "message": "The provided symbol is not valid or not supported by Binance",
  "data": null
}
```
