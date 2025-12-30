#!/bin/bash
# Asset Organization Script for Next.js
# This script is optional - assets work fine in current location

echo "🎨 Red Flag Car Club - Asset Organization"
echo "=========================================="
echo ""
echo "Good news! Your assets are already in the correct location."
echo "Next.js will serve them from the project root automatically."
echo ""
echo "Current structure is perfect:"
echo "  ✅ /css    → /css"
echo "  ✅ /img    → /img"
echo "  ✅ /fonts  → /fonts"
echo "  ✅ /js     → /js"
echo ""
echo "Optional: Copy to /public for explicit organization"
echo "(Not required, but some developers prefer this)"
echo ""

read -p "Copy to /public folder? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📦 Copying assets to /public..."
    
    mkdir -p public
    
    # Copy folders if they don't exist in public
    [ ! -d "public/css" ] && cp -r css public/ && echo "  ✅ Copied css/"
    [ ! -d "public/img" ] && cp -r img public/ && echo "  ✅ Copied img/"
    [ ! -d "public/fonts" ] && cp -r fonts public/ && echo "  ✅ Copied fonts/"
    [ ! -d "public/js" ] && cp -r js public/ && echo "  ✅ Copied js/"
    
    echo ""
    echo "✨ Done! Assets copied to /public"
    echo ""
    echo "Note: You may need to update paths in globals.css:"
    echo "  Old: url(../img/...)  →  New: url(/img/...)"
    echo ""
else
    echo ""
    echo "✅ No problem! Your current structure works perfectly."
    echo "   Next.js serves files from the root directory."
    echo ""
fi

echo "🚀 Next steps:"
echo "  1. npm install"
echo "  2. npm run dev"
echo "  3. Check http://localhost:3000"
echo ""
echo "Happy coding! 🎉"

