@echo off
echo ========================================
echo Portfolio Fixes - Applying Changes
echo ========================================
echo.

echo [1/3] Backing up original files...
copy projects.html projects_backup.html >nul 2>&1
echo     - projects.html backed up

echo.
echo [2/3] Applying fixes...
copy /Y projects_fixed.html projects.html >nul 2>&1
echo     - OpenWISP project removed
echo     - View Files buttons removed
echo     - Project icons added
echo     - IoT project path fixed
echo     - Project count updated to 5

echo.
echo [3/3] Cleaning up...
del projects_fixed.html >nul 2>&1
echo     - Temporary files removed

echo.
echo ========================================
echo Fixes Applied Successfully!
echo ========================================
echo.
echo Changes made:
echo   - Removed OpenWISP Monitoring project
echo   - Removed all "View Files" buttons
echo   - Added Font Awesome icons to project titles
echo   - Fixed IoT Energy Meter image path
echo   - Updated project statistics (6+ to 5)
echo.
echo Your portfolio is now updated!
echo Refresh your browser to see the changes.
echo.
pause
