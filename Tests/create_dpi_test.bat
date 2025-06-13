@echo off
cd /d "%~dp0"

:: Set a timeout limit (in seconds) for Angular server startup
set TIMEOUT_LIMIT=60
set TIMEOUT_COUNTER=0

:: Start Angular server
start cmd /k "cd ../Front && ng serve"

:: Wait for Angular server to start
echo Waiting for Angular server to start...
:waitForNg
netstat -an | find ":4200" | find "LISTENING" > nul
if %ERRORLEVEL% EQU 0 (
    echo Angular server detected on port 4200
    goto ngStarted
) else (
    timeout /t 1 /nobreak > nul
    set /a TIMEOUT_COUNTER+=1

    :: Show progress
    echo Waiting... %TIMEOUT_COUNTER%/%TIMEOUT_LIMIT% seconds

    :: Check if we've exceeded the timeout limit
    if %TIMEOUT_COUNTER% GEQ %TIMEOUT_LIMIT% (
        echo Timeout waiting for Angular server to start!
        echo Please check if there are any errors in the Angular console.
        pause
        exit /b 1
    )
    goto waitForNg
)

:ngStarted
echo Angular server is running. Proceeding...

:: Add a small delay to ensure Angular is fully initialized
timeout /t 5 /nobreak > nul

:: Start the backend server
start cmd /k "cd ../Back && python manage.py runserver"

:: Add a small delay before starting the Python script
timeout /t 5 /nobreak > nul

:: Run the frontend Selenium test script
start cmd /k "python test_dpi_creation.py"

:: Add a delay to ensure backend processes complete
timeout /t 5 /nobreak > nul

:: Run the backend API test script
start cmd /k "python test_backend_dpi.py"

echo All services and tests have been executed!
pause



:: Just a test line : memoryCTF{n0st41g1c_d4y5}
