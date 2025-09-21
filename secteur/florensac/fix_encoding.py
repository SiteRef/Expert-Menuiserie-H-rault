#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import codecs

# Read the file with UTF-8 BOM
with open(r'C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Fix double-encoded UTF-8 sequences
# Ã  → à (double-encoded à)
content = content.replace('Ã ', 'à')

# Ã© → é (double-encoded é)
content = content.replace('Ã©', 'é')

# Ã¨ → è (double-encoded è)
content = content.replace('Ã¨', 'è')

# Ã§ → ç (double-encoded ç)
content = content.replace('Ã§', 'ç')

# Ã‰ → É (double-encoded É)
content = content.replace('Ã‰', 'É')

# CÅ"ur → Cœur (double-encoded œ)
content = content.replace('CÅ"ur', 'Cœur')

# Write back with UTF-8 BOM
with open(r'C:\Users\cedri\Desktop\menuiserie site\secteur\florensac\index.html', 'w', encoding='utf-8-sig') as f:
    f.write(content)

print("UTF-8 encoding issues fixed successfully!")
print("Fixed patterns:")
print("- Ã  → à")
print("- Ã‰ → É")
print("- CÅ"ur → Cœur")