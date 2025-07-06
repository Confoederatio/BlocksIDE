@echo off
title Project 0707 - BlocksIDE (Autobuild)

:loop
call npm run build
pause
goto loop