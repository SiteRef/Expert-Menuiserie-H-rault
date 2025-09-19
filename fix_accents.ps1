param(
    [string]$SecteurPath = "C:\Users\cedri\Desktop\menuiserie site\secteur"
)

# Fonction pour corriger les fichiers
function Fix-AccentFiles {
    param([string]$filePath)

    try {
        # Lire le contenu du fichier en UTF-8
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8

        # Remplacer À suivi de deux espaces par à avec un espace
        $fixed = $content -replace 'À  ', 'à '

        # Réécrire le fichier
        Set-Content -Path $filePath -Value $fixed -Encoding UTF8 -NoNewline

        Write-Host "Corrigé: $filePath" -ForegroundColor Green
    }
    catch {
        Write-Host "Erreur: $filePath - $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Corriger tous les fichiers index.html
Get-ChildItem -Path $SecteurPath -Recurse -Filter "index.html" | ForEach-Object {
    Fix-AccentFiles -filePath $_.FullName
}

Write-Host "Correction terminée!" -ForegroundColor Cyan