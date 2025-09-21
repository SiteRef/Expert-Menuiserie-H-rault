# Enhanced UTF-8 Encoding Fix Script for Sector Pages
# This script fixes common UTF-8 encoding issues in HTML files

# Define replacement mappings
$replacements = @{
    # Context-specific word fixes for replacement characters
    'fen�tres' = 'fenêtres'
    'Fen�tres' = 'Fenêtres'
    'H�rault' = 'Hérault'
    '�l�gant' = 'élégant'
    '�l�gance' = 'élégance'
    's�curit�' = 'sécurité'
    'S�curit�' = 'Sécurité'
    'sp�cialis�' = 'spécialisé'
    'sp�cificit�s' = 'spécificités'
    'caract�re' = 'caractère'
    'exp�rience' = 'expérience'
    'c�ur' = 'cœur'
    'propri�t�' = 'propriété'
    'esth�tiques' = 'esthétiques'
    'adapt�es' = 'adaptées'
    'con�ues' = 'conçues'
    'motoris�s' = 'motorisés'
    'r�novation' = 'rénovation'
    'qualit�' = 'qualité'
    '�quipe' = 'équipe'
    'soign�e' = 'soignée'
    'r�sident' = 'résident'
    'R�sident' = 'Résident'
    'd�lai' = 'délai'
    'D�lai' = 'Délai'
    'p�riph�rie' = 'périphérie'
    'r�sidentielles' = 'résidentielles'
    '�carts' = 'écarts'
    'r�serv�s' = 'réservés'
    't�moignages' = 'témoignages'
    'T�moignages' = 'Témoignages'
    'am�nagements' = 'aménagements'
    'Am�nagements' = 'Aménagements'
    'ext�rieurs' = 'extérieurs'
    'Ext�rieurs' = 'Extérieurs'
    'int�rieurs' = 'intérieurs'
    'Int�rieurs' = 'Intérieurs'
    'cl�tures' = 'clôtures'
    'Cl�tures' = 'Clôtures'
    'cr�ez' = 'créez'
    'ombrag�s' = 'ombrages'
    'mat�riaux' = 'matériaux'
    'Mat�riaux' = 'Matériaux'
    'personnalis�e' = 'personnalisée'
    'paysag�re' = 'paysagère'
    'compl�te' = 'complète'
    'renforc�es' = 'renforcées'
    'contr�le' = 'contrôle'
    'automatis�e' = 'automatisée'
    'adapt�e' = 'adaptée'
    's�curis�es' = 'sécurisées'
    'discr�te' = 'discrète'
    'int�gration' = 'intégration'
    'Int�gration' = 'Intégration'
    's�curisation' = 'sécurisation'
    'avanc�e' = 'avancée'
    'verri�res' = 'verrières'
    'n�vralgique' = 'névralgique'
    'd�placement' = 'déplacement'
    'D�placement' = 'Déplacement'
    'r�paration' = 'réparation'
    'd�pannage' = 'dépannage'
    'entr�e' = 'entrée'
    'Entr�e' = 'Entrée'
    "d'entr�e" = "d'entrée"
    "d'Entr�e" = "d'Entrée"
    'Menuisier � ' = 'Menuisier à '
    'menuisier � ' = 'menuisier à '
    'intervention � ' = 'intervention à '
    'Intervention � ' = 'Intervention à '
    # Double-character encoding issues
    'Ã ' = 'à'
    'Ã©' = 'é'
    'Ã¨' = 'è'
    'Ã§' = 'ç'
    'Ã´' = 'ô'
    'Ã¢' = 'â'
    'Ã®' = 'î'
    'Ã»' = 'û'
    'Ã¹' = 'ù'
    'À‰' = 'É'
    'Å"' = 'œ'
    'Å'' = 'Œ'
    'cÅ"ur' = 'cœur'
    '��' = 'à'
    # Symbols and emojis
    'â˜…' = '★'
    'ðŸ"ž' = '📞'
    'ðŸ†' = '🏆'
    'âš¡' = '⚡'
    'ðŸ"' = '📍'
    '??' = '📞'
    '?????' = '★★★★★'
}

# Files to process
$filesToProcess = @(
    "secteur\brignac\index.html",
    "secteur\cabrieres\index.html",
    "secteur\canet\index.html",
    "secteur\capestang\index.html",
    "secteur\carnon-plage\index.html",
    "secteur\castelnau-le-lez\index.html",
    "secteur\clermont-l-herault\index.html",
    "secteur\florensac\index.html",
    "secteur\frontignan\index.html",
    "secteur\ganges\index.html",
    "secteur\gignac\index.html",
    "secteur\jacou\index.html",
    "secteur\lattes\index.html",
    "secteur\le-cres\index.html",
    "secteur\le-pouget\index.html",
    "secteur\liausson\index.html",
    "secteur\lieuran-cabrieres\index.html",
    "secteur\lodeve\index.html",
    "secteur\lunel\index.html",
    "secteur\marseillan\index.html",
    "secteur\mauguio\index.html",
    "secteur\meze\index.html",
    "secteur\moureze\index.html",
    "secteur\nebian\index.html",
    "secteur\octon\index.html",
    "secteur\palavas-les-flots\index.html",
    "secteur\paulhan\index.html",
    "secteur\peret\index.html",
    "secteur\perols\index.html",
    "secteur\pezenas\index.html",
    "secteur\pignan\index.html",
    "secteur\saint-andre-de-sangonis\index.html",
    "secteur\saint-felix-de-lodez\index.html",
    "secteur\saint-guilhem-le-desert\index.html",
    "secteur\saint-jean-de-fos\index.html",
    "secteur\saint-mathieu-de-treviers\index.html",
    "secteur\salasc\index.html",
    "secteur\servian\index.html",
    "secteur\valras-plage\index.html",
    "secteur\vendargues\index.html",
    "secteur\vias\index.html",
    "secteur\villeneuve-les-maguelone\index.html"
)

# Summary tracking
$summary = @{}
$totalFiles = 0
$totalChanges = 0
$filesChanged = 0

Write-Host "Starting UTF-8 encoding fix for sector pages..." -ForegroundColor Green
Write-Host "Processing $($filesToProcess.Count) files..." -ForegroundColor Yellow

foreach ($file in $filesToProcess) {
    if (Test-Path $file) {
        $totalFiles++
        $content = Get-Content $file -Encoding UTF8 -Raw
        $originalContent = $content
        $changesCount = 0

        # Apply all replacements
        foreach ($old in $replacements.Keys) {
            $new = $replacements[$old]
            if ($content.Contains($old)) {
                $beforeCount = ($content -split [regex]::Escape($old)).Count - 1
                $content = $content.Replace($old, $new)
                $changesCount += $beforeCount
            }
        }

        # Save if changes were made
        if ($content -ne $originalContent) {
            Set-Content $file -Value $content -Encoding UTF8
            $filesChanged++
            $cityName = Split-Path (Split-Path $file -Parent) -Leaf
            $summary[$cityName] = $changesCount
            $totalChanges += $changesCount
            Write-Host "Fixed $cityName`: $changesCount corrections" -ForegroundColor Cyan
        } else {
            $cityName = Split-Path (Split-Path $file -Parent) -Leaf
            $summary[$cityName] = 0
            Write-Host "No changes needed for $cityName" -ForegroundColor Gray
        }
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n=== COMPREHENSIVE SUMMARY ===" -ForegroundColor Green
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Total files changed: $filesChanged" -ForegroundColor White
Write-Host "Total corrections made: $totalChanges" -ForegroundColor White

Write-Host "`n=== Files with most corrections ===" -ForegroundColor Yellow
$sortedSummary = $summary.GetEnumerator() | Sort-Object Value -Descending
$counter = 1
foreach ($entry in $sortedSummary) {
    if ($entry.Value -gt 0) {
        Write-Host "$counter. $($entry.Key): $($entry.Value) corrections" -ForegroundColor Cyan
        $counter++
        if ($counter -gt 15) { break }
    }
}

Write-Host "`nUTF-8 encoding fix completed successfully!" -ForegroundColor Green