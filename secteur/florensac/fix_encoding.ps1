$content = Get-Content 'C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html' -Raw -Encoding UTF8

# Fix double-encoded UTF-8 issues
$content = $content -replace 'Ã ', 'à'
$content = $content -replace 'Ã©', 'é'
$content = $content -replace 'Ã¨', 'è'
$content = $content -replace 'Ã§', 'ç'
$content = $content -replace 'Ã‰', 'É'
$content = $content -replace 'CÅ"ur', 'Cœur'

[System.IO.File]::WriteAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', $content, [System.Text.Encoding]::UTF8)

Write-Host "UTF-8 encoding issues fixed successfully"