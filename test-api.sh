#!/bin/bash

echo "🚀 Testing Crypto Price API with Standardized Responses"
echo "========================================================="

echo ""
echo "1. Health Check:"
curl -s "http://localhost:3000/health" | jq .

echo ""
echo "2. ETHUSDT Price (Default endpoint):"
curl -s "http://localhost:3000/api/crypto/ethusdt" | jq .

echo ""
echo "3. BTCUSDT Price:"
curl -s "http://localhost:3000/api/crypto/price/BTCUSDT" | jq .

echo ""
echo "4. Multiple Prices:"
curl -s -X POST "http://localhost:3000/api/crypto/prices" \
  -H "Content-Type: application/json" \
  -d '{"symbols": ["ETHUSDT", "BTCUSDT", "ADAUSDT"]}' | jq .

echo ""
echo "5. Testing Error Response (Invalid Symbol):"
curl -s "http://localhost:3000/api/crypto/price/INVALID" | jq .

echo ""
echo "6. API Documentation URL:"
echo "   📚 http://localhost:3000/api-docs"

echo ""
echo "✅ All tests completed!"
echo ""
echo "📋 Response Format:"
echo "   All responses follow: { status: boolean, message: string, data: any }"
