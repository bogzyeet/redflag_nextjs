#!/bin/bash
# Quick file copy script for Mac/Linux
# Run this from your CURRENT directory to copy Next.js files to a new folder

echo ""
echo "📦 Red Flag Car Club - New Repository Setup"
echo "=========================================="
echo ""

# Ask for destination folder
read -p "Enter new folder name (e.g., redflag-nextjs): " DEST

if [ -z "$DEST" ]; then
    echo "❌ Error: Folder name cannot be empty"
    exit 1
fi

# Create destination folder
if [ ! -d "../$DEST" ]; then
    mkdir "../$DEST"
    echo "✅ Created folder: $DEST"
else
    echo "⚠️  Folder already exists: $DEST"
    read -p "Continue anyway? (y/N): " continue
    if [[ ! $continue =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

echo ""
echo "📋 Copying files..."
echo ""

# Copy root configuration files
echo "[1/4] Copying configuration files..."
cp package.json "../$DEST/"
cp next.config.js "../$DEST/"
cp tsconfig.json "../$DEST/"
cp vercel.json "../$DEST/"
cp .eslintrc.json "../$DEST/"
cp .gitignore "../$DEST/"
cp README.md "../$DEST/"
cp DEPLOYMENT.md "../$DEST/"
cp SETUP.md "../$DEST/"
cp "🚀_START_HERE.md" "../$DEST/"
cp NEW_REPO_SETUP.md "../$DEST/"
echo "   ✅ Configuration files copied"

# Copy Next.js folders
echo "[2/4] Copying Next.js structure..."
cp -r app "../$DEST/"
cp -r components "../$DEST/"
cp -r lib "../$DEST/"
echo "   ✅ Next.js structure copied"

# Copy assets
echo "[3/4] Copying assets..."
cp -r css "../$DEST/"
cp -r img "../$DEST/"
cp -r fonts "../$DEST/"
echo "   ✅ Assets copied"

# Optional: Copy js folder
if [ -d "js" ]; then
    echo "[4/4] Copying JavaScript files..."
    cp -r js "../$DEST/"
    echo "   ✅ JavaScript files copied"
else
    echo "[4/4] Skipping js folder (not found)"
fi

echo ""
echo "✅ All files copied successfully!"
echo ""
echo "📁 New project location: ../$DEST"
echo ""
echo "🚀 Next steps:"
echo "   1. cd ../$DEST"
echo "   2. Follow NEW_REPO_SETUP.md (inside the new folder)"
echo "   3. Run: npm install"
echo "   4. Run: npm run dev"
echo ""
echo "Happy coding! 🎉"
echo ""

