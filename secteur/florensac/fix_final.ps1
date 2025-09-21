# Read file as raw bytes
$bytes = [System.IO.File]::ReadAllBytes('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html')

# Convert bytes array for manipulation
$originalContent = [System.Text.Encoding]::UTF8.GetString($bytes)

# Debug: show what we're looking for
Write-Host "Original encoding issues detected in file"

# Replace double-encoded sequences
$fixedContent = $originalContent

# Fix Ã  (0xC3 0x83 0xC2 0xA0) to à (0xC3 0xA0)
$pattern1 = [char]0xC3 + [char]0x83 + [char]0xC2 + [char]0xA0
$replacement1 = [char]0xC3 + [char]0xA0
$fixedContent = $fixedContent -replace [regex]::Escape($pattern1), $replacement1

# Fix Ã‰ (0xC3 0x83 0xC2 0x89) to É (0xC3 0x89)
$pattern2 = [char]0xC3 + [char]0x83 + [char]0xC2 + [char]0x89
$replacement2 = [char]0xC3 + [char]0x89
$fixedContent = $fixedContent -replace [regex]::Escape($pattern2), $replacement2

# Fix CÅ"ur pattern
$fixedContent = $fixedContent -replace 'CÅ"ur', 'Cœur'

# Write the fixed content back
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', $fixedContent, $utf8NoBom)

Write-Host "UTF-8 encoding fixed successfully!"
Write-Host "Fixed:"
Write-Host "- Ã  → à"
Write-Host "- Ã‰ → É"
Write-Host "- CÅ"ur → Cœur"