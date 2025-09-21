# Read the file
$content = [System.IO.File]::ReadAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', [System.Text.Encoding]::UTF8)

# Fix encoding issues
$content = $content.Replace('Ã ', 'à')
$content = $content.Replace('Ã©', 'é')
$content = $content.Replace('Ã¨', 'è')
$content = $content.Replace('Ã§', 'ç')
$content = $content.Replace('Ã‰', 'É')

# Write back
[System.IO.File]::WriteAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', $content, [System.Text.Encoding]::UTF8)

Write-Output "Fixed UTF-8 encoding issues"