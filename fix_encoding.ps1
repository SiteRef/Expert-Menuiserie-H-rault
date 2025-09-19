# Script pour corriger l'encodage des fichiers HTML
# Corrige les caractères accentués mal encodés

$secteurPath = "C:\Users\cedri\Desktop\menuiserie site\secteur"

# Mapping des caractères mal encodés
$encodingFixes = @{
    'Ã©' = 'é'
    'Ã¨' = 'è'
    'Ã ' = 'à'
    'Ã§' = 'ç'
    'Ãª' = 'ê'
    'Ã´' = 'ô'
    'Ã®' = 'î'
    'Ã»' = 'û'
    'â‚¬' = '€'
    'Ã±' = 'ñ'
    'À  ' = 'à '
}

# Fonction pour corriger l'encodage d'un fichier
function Fix-FileEncoding {
    param([string]$filePath)

    try {
        # Lire le contenu du fichier
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8

        # Appliquer les corrections d'encodage
        foreach ($fix in $encodingFixes.GetEnumerator()) {
            $content = $content -replace [regex]::Escape($fix.Key), $fix.Value
        }

        # Réécrire le fichier avec le bon encodage
        $content | Out-File -FilePath $filePath -Encoding UTF8 -NoNewline

        Write-Host "Encodage corrigé pour: $filePath" -ForegroundColor Green
    }
    catch {
        Write-Host "Erreur lors de la correction de: $filePath" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

# Corriger tous les fichiers index.html dans le dossier secteur
Get-ChildItem -Path $secteurPath -Recurse -Name "index.html" | ForEach-Object {
    $fullPath = Join-Path $secteurPath $_
    Fix-FileEncoding -filePath $fullPath
}

Write-Host "Correction d'encodage terminée !" -ForegroundColor Cyan