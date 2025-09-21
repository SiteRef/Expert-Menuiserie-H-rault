# Read file as bytes
$bytes = [System.IO.File]::ReadAllBytes('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html')

# Convert to string for manipulation
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Fix the specific double-encoded UTF-8 sequences
# Ã  (C3 83 C2 A0) -> à (C3 A0)
$content = $content -replace [char]0xC3 + [char]0x83 + [char]0xC2 + [char]0xA0, [char]0xC3 + [char]0xA0

# Ã‰ (C3 83 C2 89) -> É (C3 89)
$content = $content -replace [char]0xC3 + [char]0x83 + [char]0xC2 + [char]0x89, [char]0xC3 + [char]0x89

# CÅ"ur -> Cœur
$content = $content -replace 'CÅ"ur', 'Cœur'

# Write back as UTF-8
[System.IO.File]::WriteAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', $content, [System.Text.Encoding]::UTF8)

Write-Host "UTF-8 encoding issues fixed with byte-level replacement"