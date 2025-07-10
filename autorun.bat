@echo off
title Scriptly
echo [Scriptly] Auto-run is starting ..
:main
npm start
timeout /t 30
echo [Scriptly] Crashed! Restarting ..
goto main
