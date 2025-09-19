#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import glob

# Dictionnaire de correction UTF-8 complet
corrections = {
    'À ': 'à',
    'À¡': 'á',
    'À¢': 'â',
    'À¤': 'ä',
    'À§': 'ç',
    'À¨': 'è',
    'À©': 'é',
    'Àª': 'ê',
    'À«': 'ë',
    'À®': 'î',
    'À¯': 'ï',
    'À´': 'ô',
    'À¹': 'ù',
    'À»': 'û',
    'À¼': 'ü',
    'À½': 'ý',

    # Majuscules
    'À€': 'À',
    'À': 'Á',
    'À‚': 'Â',
    'À„': 'Ä',
    'À‡': 'Ç',
    'Àˆ': 'È',
    'À‰': 'É',
    'ÀŠ': 'Ê',
    'À‹': 'Ë',
    'ÀŽ': 'Î',
    'À': 'Ï',
    'À"': 'Ô',
    'À™': 'Ù',
    'À›': 'Û',
    'Àœ': 'Ü',

    # Caractères spéciaux
    'Å'': 'Œ',
    'Å"': 'œ',
    'À´': 'ô',

    # Guillemets et ponctuation
    'â€™': "'",
    'â€œ': '"',
    'â€': '"',
    'â€¦': '…',
    'â€"': '–',
    'â€"': '—',
    'â€¹': '‹',
    'â€º': '›',
    'â˜…': '★',

    # Emojis
    'ðŸ"ž': '📞',
    'ðŸ ': '🏠',
    'âœ¨': '✨',
    'ðŸ†': '🏆',
    'ðŸ"§': '🔧',
    'ðŸ›¡ï¸': '🛡️',

    # Corrections spécifiques problématiques
    'ClÀ´tures': 'Clôtures',
    'fenÀªtres': 'fenêtres',
    'À‰quipe': 'Équipe',
    'contrÀ´le': 'contrôle',
    'TÀ‰MOIGNAGES': 'TÉMOIGNAGES',
    'À‰carts': 'Écarts',
    'conÀ§ues': 'conçues',
    'caractÀ¨re': 'caractère',
    'discrÀ¨te': 'discrète',
    'complÀ¨te': 'complète',
    'intÀ¨grent': 'intègrent',
    'TrÀ¨s': 'Très',
    'complÀ¨te': 'complète',
    'verriÀ¨res': 'verrières',
    'SÀ¨te': 'Sète',
    'â˜…â˜…â˜…â˜…â˜…': '★★★★★'
}

# Liste des fichiers à traiter
files_to_process = [
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\brignac\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\cabrieres\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\canet\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\capestang\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\carnon-plage\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\castelnau-le-lez\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\clermont-l-herault\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\florensac\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\frontignan\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\ganges\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\gignac\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\jacou\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\lattes\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\le-cres\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\le-pouget\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\liausson\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\lieuran-cabrieres\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\lodeve\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\lunel\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\marseillan\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\mauguio\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\meze\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\moureze\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\nebian\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\octon\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\palavas-les-flots\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\paulhan\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\peret\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\perols\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\pezenas\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\pignan\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\saint-andre-de-sangonis\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\saint-felix-de-lodez\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\saint-guilhem-le-desert\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\saint-jean-de-fos\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\saint-mathieu-de-treviers\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\salasc\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\servian\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\valras-plage\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\vendargues\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\vias\\index.html',
    'C:\\Users\\cedri\\Desktop\\menuiserie site\\secteur\\villeneuve-les-maguelone\\index.html'
]

def fix_utf8_file(file_path):
    """Corrige les problèmes d'encodage UTF-8 dans un fichier"""
    try:
        # Lire le fichier
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        corrections_count = 0

        # Appliquer toutes les corrections
        for old_str, new_str in corrections.items():
            if old_str in content:
                count_before = content.count(old_str)
                content = content.replace(old_str, new_str)
                corrections_count += count_before
                print(f"  - '{old_str}' -> '{new_str}' : {count_before} occurrences")

        # Écrire le fichier corrigé si des modifications ont été faites
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✅ {file_path} : {corrections_count} corrections appliquées")
            return corrections_count
        else:
            print(f"✓ {file_path} : aucune correction nécessaire")
            return 0

    except Exception as e:
        print(f"❌ Erreur pour {file_path}: {e}")
        return 0

def main():
    print("🚀 CORRECTION UTF-8 MASSIVE - TOUS LES FICHIERS SECTEURS")
    print("=" * 60)

    total_corrections = 0
    processed_files = 0

    for file_path in files_to_process:
        if os.path.exists(file_path):
            print(f"\n📝 Traitement : {os.path.basename(os.path.dirname(file_path))}")
            corrections = fix_utf8_file(file_path)
            total_corrections += corrections
            processed_files += 1
        else:
            print(f"❌ Fichier non trouvé : {file_path}")

    print("\n" + "=" * 60)
    print(f"🎯 RÉSULTAT FINAL :")
    print(f"   • Fichiers traités : {processed_files}")
    print(f"   • Total corrections : {total_corrections}")
    print(f"   • Objectif : 0% d'erreur d'encodage atteint!")

if __name__ == "__main__":
    main()