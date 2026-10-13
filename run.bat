@echo off
title Uncle Tom - Astronomy Platform
cls
echo ===================================================================
echo   UNCLE TOM - Astronomy Experience Platform
echo ===================================================================
echo.
echo   Starting local server on http://localhost:3000 ...
echo   Opening browser automatically...
echo.
echo   Press Ctrl+C to stop the server when done.
echo ===================================================================
echo.

start "" "http://localhost:3000"
node server.js

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo An error occurred. Please make sure Node.js is installed.
  pause
)
