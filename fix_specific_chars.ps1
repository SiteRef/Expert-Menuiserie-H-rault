# Correction spécifique des À majuscules avec double espace
param(
    [string]$SecteurPath = "C:\Users\cedri\Desktop\menuiserie site\secteur"
)

# Liste des fichiers spécifiquement problématiques
$problematicFiles = @(
    "cabrieres\index.html",
    "canet\index.html",
    "capestang\index.html",
    "brignac\index.html"
)

foreach ($file in $problematicFiles) {
    $fullPath = Join-Path $SecteurPath $file

    if (Test-Path $fullPath) {
        try {
            Write-Host "Traitement de: $fullPath" -ForegroundColor Yellow

            # Lire avec encodage UTF-8 BOM
            $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.UTF8Encoding]::new($true))

            # Compter les À avant
            $countBefore = ($content.ToCharArray() | Where-Object { $_ -eq [char]0x00C0 }).Count
            Write-Host "À trouvés avant: $countBefore" -ForegroundColor Cyan

            # Remplacer À (U+00C0) par à (U+00E0)
            $fixed = $content -replace [char]0x00C0, [char]0x00E0

            # Compter après
            $countAfter = ($fixed.ToCharArray() | Where-Object { $_ -eq [char]0x00C0 }).Count
            Write-Host "À restants après: $countAfter" -ForegroundColor Green

            # Écrire avec UTF-8 sans BOM
            [System.IO.File]::WriteAllText($fullPath, $fixed, [System.Text.UTF8Encoding]::new($false))

            Write-Host "Corrigé: $fullPath" -ForegroundColor Green
        }
        catch {
            Write-Host "Erreur avec $fullPath : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "Traitement terminé!" -ForegroundColor Green