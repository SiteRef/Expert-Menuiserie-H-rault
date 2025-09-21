#!/bin/bash

# Update all service pages with mobile navigation
echo "Updating service pages with mobile navigation..."

# Service directories
services=(
    "services/portes-entree-sur-mesure-herault"
    "services/volets-sur-mesure-herault"
    "services/portes-garage-herault"
    "services/portails-clotures-herault"
    "services/amenagements-exterieurs-herault"
    "services/amenagements-interieurs-herault"
)

for service in "${services[@]}"; do
    file="$service/index.html"
    if [ -f "$file" ]; then
        echo "Updating $file..."

        # Add mobile menu toggle button
        sed -i 's|            <!-- Navigation Bar -->|            <!-- Mobile Menu Toggle -->\
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Menu de navigation mobile" aria-expanded="false">\
                <span class="hamburger-line"></span>\
                <span class="hamburger-line"></span>\
                <span class="hamburger-line"></span>\
            </button>\
\
            <!-- Navigation Bar -->|' "$file"

        # Add ID to main-nav
        sed -i 's|<nav class="main-nav">|<nav class="main-nav" id="mainNav">|' "$file"

        echo "Updated $file successfully"
    else
        echo "File $file not found"
    fi
done

echo "Service pages update completed!"