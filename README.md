# Crypto Price API

A simple Express.js API for fetching cryptocurrency prices from Binance with Swagger documentation and standardized responses.

## Features

- Fetch price data for any crypto pair supported by Binance
- Default ETHUSDT endpoint
- Fetch multiple crypto prices in a single request
- **Standardized response format**: `{ status: boolean, message: string, data: any }`
- **Swagger/OpenAPI documentation** at `/api-docs`
- Error handling and validation
- CORS enabled
- Security headers with Helmet

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Start the production server:

```bash
npm start
```

## API Documentation

Interactive API documentation is available at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Health Check

```
GET /health
```

### Get ETHUSDT Price (Default)

```
GET /api/crypto/ethusdt
```

### Get Price for Any Symbol

```
GET /api/crypto/price/:symbol
```

Examples:

- `/api/crypto/price/BTCUSDT`
- `/api/crypto/price/ADAUSDT`

### Get Multiple Prices

```
POST /api/crypto/prices
Content-Type: application/json

{
  "symbols": ["ETHUSDT", "BTCUSDT", "ADAUSDT"]
}
```

## Standardized Response Format

All API responses follow this consistent format:

```json
{
  "status": boolean,
  "message": "string",
  "data": any
}
```

### Success Response Example

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

### Error Response Example

```json
{
  "status": false,
  "message": "The provided symbol is not valid or not supported by Binance",
  "data": null
}
```

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Error Handling

The API includes comprehensive error handling for:

- Invalid symbols
- Network timeouts
- Binance API errors
- Malformed requests
