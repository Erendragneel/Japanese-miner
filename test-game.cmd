@echo off
setlocal
if "%TEST_LOG_FILE%"=="" set TEST_LOG_FILE=%TEMP%\japanese_miner_test.log
if exist "%TEST_LOG_FILE%" del /q "%TEST_LOG_FILE%"
node "%~dp0test-runner.mjs" %* --log "%TEST_LOG_FILE%"
set CODE=%ERRORLEVEL%
if %CODE% EQU 0 (echo EXIT_OK) else (echo EXIT_CODE=%CODE%)
echo LOG_FILE=%TEST_LOG_FILE%
exit /b %CODE%
