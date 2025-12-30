@echo off
REM Asset Organization Script for Next.js (Windows)
REM This script is optional - assets work fine in current location

echo.
echo 🎨 Red Flag Car Club - Asset Organization
echo ==========================================
echo.
echo Good news! Your assets are already in the correct location.
echo Next.js will serve them from the project root automatically.
echo.
echo Current structure is perfect:
echo   ✅ \css    → \css
echo   ✅ \img    → \img
echo   ✅ \fonts  → \fonts
echo   ✅ \js     → \js
echo.
echo Optional: Copy to \public for explicit organization
echo (Not required, but some developers prefer this)
echo.

set /p choice="Copy to \public folder? (y/N): "

if /i "%choice%"=="y" (
    echo.
    echo 📦 Copying assets to \public...
    
    if not exist "public" mkdir public
    
    if not exist "public\css" (
        xcopy /E /I /Y css public\css > nul
        echo   ✅ Copied css\
    )
    
    if not exist "public\img" (
        xcopy /E /I /Y img public\img > nul
        echo   ✅ Copied img\
    )
    
    if not exist "public\fonts" (
        xcopy /E /I /Y fonts public\fonts > nul
        echo   ✅ Copied fonts\
    )
    
    if not exist "public\js" (
        xcopy /E /I /Y js public\js > nul
        echo   ✅ Copied js\
    )
    
    echo.
    echo ✨ Done! Assets copied to \public
    echo.
    echo Note: You may need to update paths in globals.css:
    echo   Old: url(../img/...)  →  New: url(/img/...)
    echo.
) else (
    echo.
    echo ✅ No problem! Your current structure works perfectly.
    echo    Next.js serves files from the root directory.
    echo.
)

echo 🚀 Next steps:
echo   1. npm install
echo   2. npm run dev
echo   3. Check http://localhost:3000
echo.
echo Happy coding! 🎉
echo.
pause

