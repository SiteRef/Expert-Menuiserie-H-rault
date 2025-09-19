#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re

# Define the character mappings
replacements = {
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
    'ðŸ"ž': '📞',
    'ðŸ ': '🏠',
    'âœ¨': '✨',
    'â€¹': '‹',
    'â€º': '›',
    'â˜…': '★',
    'â‚¬': '€',
    'â€¢': '•'
}

def fix_encoding_in_file(file_path):
    """Fix UTF-8 encoding issues in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()

        original_content = content
        changes_made = []

        for old_char, new_char in replacements.items():
            count = content.count(old_char)
            if count > 0:
                content = content.replace(old_char, new_char)
                changes_made.append(f"{old_char} -> {new_char} ({count} occurrences)")

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return changes_made
        else:
            return []

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def main():
    secteur_dir = r"C:\Users\cedri\Desktop\menuiserie site\secteur"
    total_files_processed = 0
    total_files_changed = 0

    print("Starting UTF-8 encoding fix for sector files...")

    for root, dirs, files in os.walk(secteur_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                changes = fix_encoding_in_file(file_path)
                total_files_processed += 1

                if changes:
                    total_files_changed += 1
                    print(f"\nFixed {file_path}:")
                    for change in changes:
                        print(f"  - {change}")

    print(f"\n=== SUMMARY ===")
    print(f"Total files processed: {total_files_processed}")
    print(f"Total files changed: {total_files_changed}")
    print("UTF-8 encoding fix completed!")

if __name__ == "__main__":
    main()