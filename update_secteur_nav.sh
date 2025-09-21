#!/bin/bash

# Update all secteur pages with mobile navigation
echo "Updating secteur pages with mobile navigation..."

cd secteur

# Find all secteur directories with index.html files
for dir in */; do
    file="${dir}index.html"
    if [ -f "$file" ]; then
        echo "Updating $file..."

        # Add mobile menu toggle button (only if not already present)
        if ! grep -q "mobile-menu-toggle" "$file"; then
            sed -i 's|            <!-- Navigation Bar -->|            <!-- Mobile Menu Toggle -->\
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Menu de navigation mobile" aria-expanded="false">\
                <span class="hamburger-line"></span>\
                <span class="hamburger-line"></span>\
                <span class="hamburger-line"></span>\
            </button>\
\
            <!-- Navigation Bar -->|' "$file"
        fi

        # Add ID to main-nav (only if not already present)
        if ! grep -q 'id="mainNav"' "$file"; then
            sed -i 's|<nav class="main-nav">|<nav class="main-nav" id="mainNav">|' "$file"
        fi

        echo "Updated $file successfully"
    else
        echo "File $file not found"
    fi
done

echo "Secteur pages navigation update completed!"