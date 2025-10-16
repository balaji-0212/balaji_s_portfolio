# Add inline-viewer.css to all remaining project HTML files

$files = @(
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Output\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\index.html",
    "Projects\Bank_Loan_Report_Dashboard\data\index.html",
    "Projects\Bank_Loan_Report_Dashboard\dashboard\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\combined\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft_mc\index.html",
    "Projects\Bank_Loan_Report_Dashboard\dashboard\dashboard_preview\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\abft\abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\combined\combined\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft\light_abft\index.html",
    "Projects\FAULT_TOLERANCE_TECHNIQUES\Code\light_abft_mc\light_abft_mc\index.html"
)

$count = 0

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        if ($content -match 'inline-viewer') {
            Write-Host "Already updated: $file"
            continue
        }
        
        $depth = ($file.Split('\') | Measure-Object).Count - 1
        $relativePath = ("..\/" * ($depth - 1)) + "assets/css/inline-viewer.css"
        
        $pattern = '(<link rel="stylesheet" href="[^"]*assets/css/styles\.css">)'
        $replacement = '$1' + "`n    " + '<link rel="stylesheet" href="' + $relativePath + '">'
        $newContent = $content -replace $pattern, $replacement
        
        Set-Content -Path $fullPath -Value $newContent -NoNewline
        
        Write-Host "Updated: $file"
        $count++
    }
}

Write-Host "Updated $count files"
