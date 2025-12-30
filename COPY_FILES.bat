@echo off
REM Quick file copy script for Windows
REM Run this from your CURRENT directory to copy Next.js files to a new folder

echo.
echo 📦 Red Flag Car Club - New Repository Setup
echo ==========================================
echo.

REM Ask for destination folder
set /p DEST="Enter new folder name (e.g., redflag-nextjs): "

if "%DEST%"=="" (
    echo ❌ Error: Folder name cannot be empty
    pause
    exit /b
)

REM Create destination folder
if not exist "..\%DEST%" (
    mkdir "..\%DEST%"
    echo ✅ Created folder: %DEST%
) else (
    echo ⚠️  Folder already exists: %DEST%
    set /p continue="Continue anyway? (y/N): "
    if /i not "%continue%"=="y" (
        echo Cancelled.
        pause
        exit /b
    )
)

echo.
echo 📋 Copying files...
echo.

REM Copy root configuration files
echo [1/4] Copying configuration files...
copy /Y "package.json" "..\%DEST%\" >nul
copy /Y "next.config.js" "..\%DEST%\" >nul
copy /Y "tsconfig.json" "..\%DEST%\" >nul
copy /Y "vercel.json" "..\%DEST%\" >nul
copy /Y ".eslintrc.json" "..\%DEST%\" >nul
copy /Y ".gitignore" "..\%DEST%\" >nul
copy /Y "README.md" "..\%DEST%\" >nul
copy /Y "DEPLOYMENT.md" "..\%DEST%\" >nul
copy /Y "SETUP.md" "..\%DEST%\" >nul
copy /Y "🚀_START_HERE.md" "..\%DEST%\" >nul
copy /Y "NEW_REPO_SETUP.md" "..\%DEST%\" >nul
echo    ✅ Configuration files copied

REM Copy Next.js folders
echo [2/4] Copying Next.js structure...
xcopy /E /I /Y "app" "..\%DEST%\app" >nul
xcopy /E /I /Y "components" "..\%DEST%\components" >nul
xcopy /E /I /Y "lib" "..\%DEST%\lib" >nul
echo    ✅ Next.js structure copied

REM Copy assets
echo [3/4] Copying assets...
xcopy /E /I /Y "css" "..\%DEST%\css" >nul
xcopy /E /I /Y "img" "..\%DEST%\img" >nul
xcopy /E /I /Y "fonts" "..\%DEST%\fonts" >nul
echo    ✅ Assets copied

REM Optional: Copy js folder
if exist "js" (
    echo [4/4] Copying JavaScript files...
    xcopy /E /I /Y "js" "..\%DEST%\js" >nul
    echo    ✅ JavaScript files copied
) else (
    echo [4/4] Skipping js folder (not found)
)

echo.
echo ✅ All files copied successfully!
echo.
echo 📁 New project location: ..\%DEST%
echo.
echo 🚀 Next steps:
echo    1. cd ..\%DEST%
echo    2. Follow NEW_REPO_SETUP.md (inside the new folder)
echo    3. Run: npm install
echo    4. Run: npm run dev
echo.
echo Happy coding! 🎉
echo.
pause

