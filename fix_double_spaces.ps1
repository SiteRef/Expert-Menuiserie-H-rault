# Correction des doubles espaces après à
param(
    [string]$SecteurPath = "C:\Users\cedri\Desktop\menuiserie site\secteur"
)

# Liste des fichiers problématiques
$problematicFiles = @(
    "cabrieres\index.html",
    "canet\index.html",
    "capestang\index.html"
)

foreach ($file in $problematicFiles) {
    $fullPath = Join-Path $SecteurPath $file

    if (Test-Path $fullPath) {
        try {
            Write-Host "Traitement des espaces dans: $fullPath" -ForegroundColor Yellow

            # Lire avec encodage UTF-8
            $content = [System.IO.File]::ReadAllText($fullPath, [System.Text.UTF8Encoding]::new($false))

            # Compter les occurrences "à  " (avec double espace)
            $countBefore = [regex]::Matches($content, "à  ").Count
            Write-Host "Occurrences 'à  ' trouvées: $countBefore" -ForegroundColor Cyan

            # Remplacer "à  " par "à "
            $fixed = $content -replace "à  ", "à "

            # Compter après
            $countAfter = [regex]::Matches($fixed, "à  ").Count
            Write-Host "Occurrences 'à  ' restantes: $countAfter" -ForegroundColor Green

            # Écrire avec UTF-8 sans BOM
            [System.IO.File]::WriteAllText($fullPath, $fixed, [System.Text.UTF8Encoding]::new($false))

            Write-Host "Espaces corrigés: $fullPath" -ForegroundColor Green
        }
        catch {
            Write-Host "Erreur avec $fullPath : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "Correction des espaces terminée!" -ForegroundColor Green