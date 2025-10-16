# Add inline-viewer.css to all remaining project HTML files

$files = @(
    # Level 3 files (../../../)
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Output\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\index.html",
    "Projects\Bank_Loan_Report_Dashboard\data\index.html",
    "Projects\Bank_Loan_Report_Dashboard\dashboard\index.html",
    
    # Level 4 files (../../../../)
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\combined\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft_mc\index.html",
    "Projects\Bank_Loan_Report_Dashboard\dashboard\dashboard_preview\index.html",
    
    # Level 5 files (../../../../../)
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\abft\abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\combined\combined\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft\light_abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft_mc\light_abft_mc\index.html"
)

$count = 0

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $fullPath) {
        # Read file content
        $content = Get-Content $fullPath -Raw
        
        # Skip if already has inline-viewer.css
        if ($content -match 'inline-viewer\.css') {
            Write-Host "Already updated: $file" -ForegroundColor Green
            continue
        }
        
        # Determine the correct path based on level
        $depth = ($file.Split('\') | Measure-Object).Count - 1
        $relativePath = "../" * ($depth - 1) + "assets/css/inline-viewer.css"
        
        # Add inline-viewer.css after styles.css
        $pattern = '(<link rel="stylesheet" href="[^"]*assets/css/styles\.css">)'
        $replacement = "`$1`n    <link rel=`"stylesheet`" href=`"$relativePath`">"
        $newContent = $content -replace $pattern, $replacement
        
        # Write back
        Set-Content -Path $fullPath -Value $newContent -NoNewline
        
        Write-Host "✓ Updated: $file" -ForegroundColor Cyan
        $count++
    } else {
        Write-Host "✗ Not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✅ Updated $count files successfully!" -ForegroundColor Green
