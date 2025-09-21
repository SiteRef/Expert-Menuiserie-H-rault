# Read file content
$content = Get-Content 'C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html' -Raw -Encoding UTF8

# Fix double-encoded UTF-8 sequences using byte patterns
$pattern1 = [char]0xC3 + [char]0x83 + [char]0xC2 + [char]0xA0
$replacement1 = [char]0xC3 + [char]0xA0
$content = $content -replace [regex]::Escape($pattern1), $replacement1

$pattern2 = [char]0xC3 + [char]0x83 + [char]0xC2 + [char]0x89
$replacement2 = [char]0xC3 + [char]0x89
$content = $content -replace [regex]::Escape($pattern2), $replacement2

# Save without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', $content, $utf8NoBom)

Write-Host "Encoding fixed successfully"