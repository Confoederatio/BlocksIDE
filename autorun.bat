@echo off
title UF Browser Testbed
echo [UF Browser] Auto-run is starting ..
:main
npm start
timeout /t 30
echo [UF Browser] Crashed! Restarting ..
goto main
