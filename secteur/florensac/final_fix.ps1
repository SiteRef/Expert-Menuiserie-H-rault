# Read the file as UTF-8 with BOM detection
$content = [System.IO.File]::ReadAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', [System.Text.Encoding]::UTF8)

Write-Host "Original content length: $($content.Length)"

# Count occurrences before fixing
$count_antes = ($content -split 'Ã ', -1).Count - 1
$count_e_antes = ($content -split 'Ã‰', -1).Count - 1
$count_coeur_antes = ($content -split 'CÅ"ur', -1).Count - 1

Write-Host "Found $count_antes occurrences of 'Ã '"
Write-Host "Found $count_e_antes occurrences of 'Ã‰'"
Write-Host "Found $count_coeur_antes occurrences of 'CÅ"ur'"

# Fix the encoding issues by replacing the problematic strings directly
$content = $content.Replace('Ã ', 'à')
$content = $content.Replace('Ã©', 'é')
$content = $content.Replace('Ã¨', 'è')
$content = $content.Replace('Ã§', 'ç')
$content = $content.Replace('Ã‰', 'É')
$content = $content.Replace('CÅ"ur', 'Cœur')

# Count occurrences after fixing
$count_a_after = ($content -split 'à', -1).Count - 1
$count_e_after = ($content -split 'É', -1).Count - 1
$count_coeur_after = ($content -split 'Cœur', -1).Count - 1

Write-Host "After fixing - Found $count_a_after occurrences of 'à'"
Write-Host "After fixing - Found $count_e_after occurrences of 'É'"
Write-Host "After fixing - Found $count_coeur_after occurrences of 'Cœur'"

# Write back with UTF-8 encoding (no BOM)
[System.IO.File]::WriteAllText('C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', $content, [System.Text.Encoding]::UTF8)

Write-Host "UTF-8 encoding issues fixed successfully!"