#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re

# Define the character mappings - enhanced version
replacements = {
    # Double-character encoding issues
    'FenÃªtres': 'Fenêtres',
    'HÃ©rault': 'Hérault',
    'BÃ©darieux': 'Bédarieux',
    'Ã©': 'é',
    'Ã¨': 'è',
    'Ã§': 'ç',
    'Ã´': 'ô',
    'Ã¢': 'â',
    'Ã»': 'û',
    'Ã®': 'î',
    'Ã¯': 'ï',
    'Ã«': 'ë',
    'Ã¹': 'ù',
    'Ã ': 'à',
    'À‰': 'É',
    'Å"': 'œ',
    'Å'': 'Œ',
    'cÅ"ur': 'cœur',
    '��': 'à',
    # Context-specific word fixes for replacement characters
    'fen�tres': 'fenêtres',
    'Fen�tres': 'Fenêtres',
    'H�rault': 'Hérault',
    '�l�gant': 'élégant',
    '�l�gance': 'élégance',
    's�curit�': 'sécurité',
    'S�curit�': 'Sécurité',
    'sp�cialis�': 'spécialisé',
    'sp�cificit�s': 'spécificités',
    'caract�re': 'caractère',
    'exp�rience': 'expérience',
    'c�ur': 'cœur',
    'propri�t�': 'propriété',
    'esth�tiques': 'esthétiques',
    'adapt�es': 'adaptées',
    'con�ues': 'conçues',
    'motoris�s': 'motorisés',
    'r�novation': 'rénovation',
    'qualit�': 'qualité',
    '�quipe': 'équipe',
    'soign�e': 'soignée',
    'r�sident': 'résident',
    'R�sident': 'Résident',
    'd�lai': 'délai',
    'D�lai': 'Délai',
    'p�riph�rie': 'périphérie',
    'r�sidentielles': 'résidentielles',
    '�carts': 'écarts',
    'r�serv�s': 'réservés',
    't�moignages': 'témoignages',
    'T�moignages': 'Témoignages',
    'am�nagements': 'aménagements',
    'Am�nagements': 'Aménagements',
    'ext�rieurs': 'extérieurs',
    'Ext�rieurs': 'Extérieurs',
    'int�rieurs': 'intérieurs',
    'Int�rieurs': 'Intérieurs',
    'cl�tures': 'clôtures',
    'Cl�tures': 'Clôtures',
    'cr�ez': 'créez',
    'ombrag�s': 'ombrages',
    'mat�riaux': 'matériaux',
    'Mat�riaux': 'Matériaux',
    'personnalis�e': 'personnalisée',
    'paysag�re': 'paysagère',
    'compl�te': 'complète',
    'renforc�es': 'renforcées',
    'contr�le': 'contrôle',
    'automatis�e': 'automatisée',
    'adapt�e': 'adaptée',
    's�curis�es': 'sécurisées',
    'discr�te': 'discrète',
    'int�gration': 'intégration',
    'Int�gration': 'Intégration',
    's�curisation': 'sécurisation',
    'avanc�e': 'avancée',
    'verri�res': 'verrières',
    'n�vralgique': 'névralgique',
    'd�placement': 'déplacement',
    'D�placement': 'Déplacement',
    'r�paration': 'réparation',
    'd�pannage': 'dépannage',
    'entr�e': 'entrée',
    'Entr�e': 'Entrée',
    "d'entr�e": "d'entrée",
    "d'Entr�e": "d'Entrée",
    'Menuisier �': 'Menuisier à',
    'menuisier �': 'menuisier à',
    'intervention �': 'intervention à',
    'Intervention �': 'Intervention à',
    # Common phrase patterns
    'Menuisier � ': 'Menuisier à ',
    'menuisier � ': 'menuisier à ',
    'intervention � ': 'intervention à ',
    'Intervention � ': 'Intervention à ',
    '� Brignac': 'à Brignac',
    '� Cabri': 'à Cabri',
    '� Canet': 'à Canet',
    '� Capestang': 'à Capestang',
    '� Carnon': 'à Carnon',
    '� Castelnau': 'à Castelnau',
    '� Clermont': 'à Clermont',
    '� Florensac': 'à Florensac',
    '� Frontignan': 'à Frontignan',
    '� Ganges': 'à Ganges',
    '� Gignac': 'à Gignac',
    '� Jacou': 'à Jacou',
    '� Lattes': 'à Lattes',
    '� Le Cres': 'à Le Crès',
    '� Le Pouget': 'à Le Pouget',
    '� Liausson': 'à Liausson',
    '� Lieuran': 'à Lieuran',
    '� Lodeve': 'à Lodève',
    '� Lunel': 'à Lunel',
    '� Marseillan': 'à Marseillan',
    '� Mauguio': 'à Mauguio',
    '� Meze': 'à Mèze',
    '� Moureze': 'à Mourèze',
    '� Nebian': 'à Nébian',
    '� Octon': 'à Octon',
    '� Palavas': 'à Palavas',
    '� Paulhan': 'à Paulhan',
    '� Peret': 'à Péret',
    '� Perols': 'à Pérols',
    '� Pezenas': 'à Pézenas',
    '� Pignan': 'à Pignan',
    '� Saint-Andre': 'à Saint-André',
    '� Saint-Felix': 'à Saint-Félix',
    '� Saint-Guilhem': 'à Saint-Guilhem',
    '� Saint-Jean': 'à Saint-Jean',
    '� Saint-Mathieu': 'à Saint-Mathieu',
    '� Salasc': 'à Salasc',
    '� Servian': 'à Servian',
    '� Valras': 'à Valras',
    '� Vendargues': 'à Vendargues',
    '� Vias': 'à Vias',
    '� Villeneuve': 'à Villeneuve',
    # Emojis and symbols
    'ðŸ"ž': '📞',
    'ðŸ†': '🏆',
    'âš¡': '⚡',
    'ðŸ"': '📍',
    'ðŸ ': '🏠',
    'âœ¨': '✨',
    'â€¹': '‹',
    'â€º': '›',
    'â˜…': '★',
    'â‚¬': '€',
    'â€¢': '•',
    '??': '📞',
    # Arrow symbols
    '�': '▶',
    '�': '◀',
    # Stars
    '?????': '★★★★★'
}

def fix_encoding_in_file(file_path):
    """Fix UTF-8 encoding issues in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()

        original_content = content
        changes_made = []
        total_replacements = 0

        for old_char, new_char in replacements.items():
            count = content.count(old_char)
            if count > 0:
                content = content.replace(old_char, new_char)
                changes_made.append(f"{old_char} -> {new_char} ({count} occurrences)")
                total_replacements += count

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes_made, total_replacements
        else:
            return [], 0

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return [], 0

def main():
    # Define the specific files to process
    files_to_process = [
        "C:/Users/cedri/Desktop/menuiserie site/secteur/brignac/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/cabrieres/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/canet/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/capestang/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/carnon-plage/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/castelnau-le-lez/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/clermont-l-herault/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/florensac/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/frontignan/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/ganges/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/gignac/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/jacou/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/lattes/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/le-cres/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/le-pouget/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/liausson/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/lieuran-cabrieres/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/lodeve/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/lunel/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/marseillan/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/mauguio/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/meze/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/moureze/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/nebian/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/octon/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/palavas-les-flots/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/paulhan/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/peret/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/perols/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/pezenas/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/pignan/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/saint-andre-de-sangonis/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/saint-felix-de-lodez/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/saint-guilhem-le-desert/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/saint-jean-de-fos/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/saint-mathieu-de-treviers/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/salasc/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/servian/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/valras-plage/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/vendargues/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/vias/index.html",
        "C:/Users/cedri/Desktop/menuiserie site/secteur/villeneuve-les-maguelone/index.html"
    ]

    total_files_processed = 0
    total_files_changed = 0
    total_corrections = 0
    file_summary = {}

    print("Starting comprehensive UTF-8 encoding fix for sector files...")
    print(f"Processing {len(files_to_process)} files...")

    for file_path in files_to_process:
        if os.path.exists(file_path):
            changes, correction_count = fix_encoding_in_file(file_path)
            total_files_processed += 1

            city_name = os.path.basename(os.path.dirname(file_path))
            file_summary[city_name] = correction_count
            total_corrections += correction_count

            if changes:
                total_files_changed += 1
                print(f"\nFixed {city_name} ({correction_count} corrections):")
                # Show first few changes as sample
                for change in changes[:5]:
                    print(f"  - {change}")
                if len(changes) > 5:
                    print(f"  ... and {len(changes) - 5} more changes")
            else:
                print(f"No changes needed for {city_name}")
        else:
            print(f"File not found: {file_path}")

    print(f"\n=== COMPREHENSIVE SUMMARY ===")
    print(f"Total files processed: {total_files_processed}")
    print(f"Total files changed: {total_files_changed}")
    print(f"Total corrections made: {total_corrections}")

    print(f"\n=== Files with most corrections ===")
    sorted_summary = sorted(file_summary.items(), key=lambda x: x[1], reverse=True)
    for i, (city, count) in enumerate(sorted_summary):
        if count > 0:
            print(f"{i+1:2d}. {city}: {count} corrections")
        if i >= 15:  # Show top 15
            break

    print("\nUTF-8 encoding fix completed successfully!")

if __name__ == "__main__":
    main()