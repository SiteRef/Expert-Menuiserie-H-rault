#!/bin/bash
# Comprehensive UTF-8 encoding fix script for all sector pages

# List of files to process
files=(
    "secteur/brignac/index.html"
    "secteur/cabrieres/index.html"
    "secteur/canet/index.html"
    "secteur/capestang/index.html"
    "secteur/carnon-plage/index.html"
    "secteur/castelnau-le-lez/index.html"
    "secteur/clermont-l-herault/index.html"
    "secteur/florensac/index.html"
    "secteur/frontignan/index.html"
    "secteur/ganges/index.html"
    "secteur/gignac/index.html"
    "secteur/jacou/index.html"
    "secteur/lattes/index.html"
    "secteur/le-cres/index.html"
    "secteur/le-pouget/index.html"
    "secteur/liausson/index.html"
    "secteur/lieuran-cabrieres/index.html"
    "secteur/lodeve/index.html"
    "secteur/lunel/index.html"
    "secteur/marseillan/index.html"
    "secteur/mauguio/index.html"
    "secteur/meze/index.html"
    "secteur/moureze/index.html"
    "secteur/nebian/index.html"
    "secteur/octon/index.html"
    "secteur/palavas-les-flots/index.html"
    "secteur/paulhan/index.html"
    "secteur/peret/index.html"
    "secteur/perols/index.html"
    "secteur/pezenas/index.html"
    "secteur/pignan/index.html"
    "secteur/saint-andre-de-sangonis/index.html"
    "secteur/saint-felix-de-lodez/index.html"
    "secteur/saint-guilhem-le-desert/index.html"
    "secteur/saint-jean-de-fos/index.html"
    "secteur/saint-mathieu-de-treviers/index.html"
    "secteur/salasc/index.html"
    "secteur/servian/index.html"
    "secteur/valras-plage/index.html"
    "secteur/vendargues/index.html"
    "secteur/vias/index.html"
    "secteur/villeneuve-les-maguelone/index.html"
)

total_files=0
files_processed=0
total_corrections=0

echo "Starting comprehensive UTF-8 encoding fix..."
echo "Processing ${#files[@]} files..."

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -n "Processing $(basename $(dirname $file))... "

        corrections=0

        # Count occurrences before fixing
        before_count=$(grep -o "�" "$file" | wc -l)

        # Apply all the critical fixes
        sed -i 's/fen�tres/fenêtres/g' "$file"
        sed -i 's/Fen�tres/Fenêtres/g' "$file"
        sed -i 's/H�rault/Hérault/g' "$file"
        sed -i 's/Entr�e/Entrée/g' "$file"
        sed -i 's/entr�e/entrée/g' "$file"
        sed -i 's/�� /à /g' "$file"
        sed -i 's/��/à/g' "$file"
        sed -i 's/sp�cialis�/spécialisé/g' "$file"
        sed -i 's/sp�cificit�s/spécificités/g' "$file"
        sed -i 's/s�curit�/sécurité/g' "$file"
        sed -i 's/S�curit�/Sécurité/g' "$file"
        sed -i 's/�l�gant/élégant/g' "$file"
        sed -i 's/�l�gance/élégance/g' "$file"
        sed -i 's/caract�re/caractère/g' "$file"
        sed -i 's/exp�rience/expérience/g' "$file"
        sed -i 's/c�ur/cœur/g' "$file"
        sed -i 's/propri�t�/propriété/g' "$file"
        sed -i 's/esth�tiques/esthétiques/g' "$file"
        sed -i 's/adapt�es/adaptées/g' "$file"
        sed -i 's/con�ues/conçues/g' "$file"
        sed -i 's/motoris�s/motorisés/g' "$file"
        sed -i 's/r�novation/rénovation/g' "$file"
        sed -i 's/qualit�/qualité/g' "$file"
        sed -i 's/�quipe/équipe/g' "$file"
        sed -i 's/soign�e/soignée/g' "$file"
        sed -i 's/r�sident/résident/g' "$file"
        sed -i 's/R�sident/Résident/g' "$file"
        sed -i 's/d�lai/délai/g' "$file"
        sed -i 's/D�lai/Délai/g' "$file"
        sed -i 's/p�riph�rie/périphérie/g' "$file"
        sed -i 's/r�sidentielles/résidentielles/g' "$file"
        sed -i 's/�carts/écarts/g' "$file"
        sed -i 's/r�serv�s/réservés/g' "$file"
        sed -i 's/t�moignages/témoignages/g' "$file"
        sed -i 's/T�moignages/Témoignages/g' "$file"
        sed -i 's/am�nagements/aménagements/g' "$file"
        sed -i 's/Am�nagements/Aménagements/g' "$file"
        sed -i 's/ext�rieurs/extérieurs/g' "$file"
        sed -i 's/Ext�rieurs/Extérieurs/g' "$file"
        sed -i 's/int�rieurs/intérieurs/g' "$file"
        sed -i 's/Int�rieurs/Intérieurs/g' "$file"
        sed -i 's/cl�tures/clôtures/g' "$file"
        sed -i 's/Cl�tures/Clôtures/g' "$file"
        sed -i 's/cr�ez/créez/g' "$file"
        sed -i 's/ombrag�s/ombrages/g' "$file"
        sed -i 's/mat�riaux/matériaux/g' "$file"
        sed -i 's/Mat�riaux/Matériaux/g' "$file"
        sed -i 's/personnalis�e/personnalisée/g' "$file"
        sed -i 's/paysag�re/paysagère/g' "$file"
        sed -i 's/compl�te/complète/g' "$file"
        sed -i 's/renforc�es/renforcées/g' "$file"
        sed -i 's/contr�le/contrôle/g' "$file"
        sed -i 's/automatis�e/automatisée/g' "$file"
        sed -i 's/adapt�e/adaptée/g' "$file"
        sed -i 's/s�curis�es/sécurisées/g' "$file"
        sed -i 's/discr�te/discrète/g' "$file"
        sed -i 's/int�gration/intégration/g' "$file"
        sed -i 's/Int�gration/Intégration/g' "$file"
        sed -i 's/s�curisation/sécurisation/g' "$file"
        sed -i 's/avanc�e/avancée/g' "$file"
        sed -i 's/verri�res/verrières/g' "$file"
        sed -i 's/n�vralgique/névralgique/g' "$file"
        sed -i 's/d�placement/déplacement/g' "$file"
        sed -i 's/D�placement/Déplacement/g' "$file"
        sed -i 's/r�paration/réparation/g' "$file"
        sed -i 's/d�pannage/dépannage/g' "$file"
        sed -i 's/Sp�cialiste/Spécialiste/g' "$file"
        sed -i 's/tranquillit�/tranquillité/g' "$file"
        sed -i 's/??/📞/g' "$file"
        sed -i 's/?????/★★★★★/g' "$file"

        # Count corrections made
        after_count=$(grep -o "�" "$file" | wc -l)
        corrections=$((before_count - after_count))

        files_processed=$((files_processed + 1))
        total_corrections=$((total_corrections + corrections))

        echo "${corrections} corrections"

    else
        echo "File not found: $file"
    fi
    total_files=$((total_files + 1))
done

echo ""
echo "=== SUMMARY ==="
echo "Total files: $total_files"
echo "Files processed: $files_processed"
echo "Total corrections: $total_corrections"
echo ""
echo "UTF-8 encoding fix completed!"