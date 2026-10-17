```bat
@echo off
title Smart AI Campus - Push to testing
color 0A

cd /d "C:\Users\banus\Documents\antigravity\valiant-davinci\smart_ai_campus"

echo Checking Git repository...
git rev-parse --show-toplevel
if errorlevel 1 (
    echo ERROR: This folder is not connected to a Git repository.
    echo Do not initialize or push yet.
    pause
    exit /b 1
)

echo.
echo Checking remote...
git remote -v
echo.
echo Checking branches...
git branch -a
echo.
echo Checking changes...
git status
echo.
echo Review the information above before continuing.
pause

echo.
echo Fetching latest branches...
git fetch origin
if errorlevel 1 goto failed

echo.
echo Switching to testing branch...
git switch testing
if errorlevel 1 (
    echo Could not switch to testing.
    echo Check whether origin/testing exists.
    pause
    exit /b 1
)

echo.
echo Review your changes before staging.
git status
echo.
echo If the files are correct, stage and commit them manually.
echo Then run: git push origin testing
pause
exit /b 0

:failed
echo Fetch failed. Check your connection and GitHub access.
pause
exit /b 1
```