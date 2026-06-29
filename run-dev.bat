@echo off

set NODE_HOME=C:\Users\alauddin.mazumder.x\OneDrive - Akij Venture Ltd\Desktop\node-portable\node24

cd /d %~dp0

echo ===== Using Portable Node =====
"%NODE_HOME%\node.exe" -v

echo ===== Using Portable NPM =====
"%NODE_HOME%\npm.cmd" -v

echo ===== Installing Dependencies =====
"%NODE_HOME%\npm.cmd" install

echo ===== Starting Dev Server =====
"%NODE_HOME%\npm.cmd" run dev

pause