#!/bin/bash

echo "🔍 Checking deployment readiness..."
echo "=================================="

# Check if required files exist
echo "📁 Checking required files:"

if [ -f "render.yaml" ]; then
    echo "✅ render.yaml found"
else
    echo "❌ render.yaml missing"
fi

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "❌ vercel.json missing"
fi

if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json missing"
    exit 1
fi

if [ -f "src/app.js" ]; then
    echo "✅ src/app.js found"
else
    echo "❌ src/app.js missing"
    exit 1
fi

echo ""
echo "📦 Checking package.json scripts:"

# Check if start script exists
if grep -q '"start"' package.json; then
    echo "✅ start script defined"
else
    echo "❌ start script missing"
fi

echo ""
echo "🌐 Environment variables check:"

# Check if PORT is handled
if grep -q "process.env.PORT" src/app.js; then
    echo "✅ PORT environment variable handled"
else
    echo "❌ PORT environment variable not handled"
fi

echo ""
echo "🚀 Ready for deployment to:"
echo "   • Render: https://render.com"
echo "   • Railway: https://railway.app"
echo "   • Vercel: https://vercel.com"

echo ""
echo "📚 Next steps:"
echo "   1. Push to GitHub: git push origin main"
echo "   2. Connect your repository to hosting platform"
echo "   3. Deploy and test your live API!"

echo ""
echo "✅ Deployment check complete!"
