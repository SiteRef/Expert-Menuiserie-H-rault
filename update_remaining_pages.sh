#!/bin/bash

# Update remaining pages with mobile navigation
echo "Updating remaining pages with mobile navigation..."

# List of remaining pages to update
pages=(
    "contact/index.html"
    "devis-gratuit/index.html"
    "devis-gratuit/merci/index.html"
)

for page in "${pages[@]}"; do
    if [ -f "$page" ]; then
        echo "Updating $page..."

        # Add mobile menu toggle button (only if not already present)
        if ! grep -q "mobile-menu-toggle" "$page"; then
            sed -i 's|            <!-- Navigation Bar -->|            <!-- Mobile Menu Toggle -->\
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Menu de navigation mobile" aria-expanded="false">\
                <span class="hamburger-line"></span>\
                <span class="hamburger-line"></span>\
                <span class="hamburger-line"></span>\
            </button>\
\
            <!-- Navigation Bar -->|' "$page"
        fi

        # Add ID to main-nav (only if not already present)
        if ! grep -q 'id="mainNav"' "$page"; then
            sed -i 's|<nav class="main-nav">|<nav class="main-nav" id="mainNav">|' "$page"
        fi

        # Add mobile menu JavaScript (only if not already present)
        if ! grep -q "toggleMobileMenu" "$page"; then
            sed -i 's|</body>|    <script>\
    // Mobile Menu Functions\
    function toggleMobileMenu() {\
        const nav = document.getElementById('\''mainNav'\'');\
        const toggle = document.getElementById('\''mobileMenuToggle'\'');\
\
        const isOpen = nav.classList.toggle('\''mobile-open'\'');\
        toggle.classList.toggle('\''active'\'');\
\
        // Update aria-expanded for accessibility\
        toggle.setAttribute('\''aria-expanded'\'', isOpen);\
    }\
\
    // Initialize mobile menu\
    document.addEventListener('\''DOMContentLoaded'\'', function() {\
        // Mobile menu toggle\
        const mobileToggle = document.getElementById('\''mobileMenuToggle'\'');\
        if (mobileToggle) {\
            mobileToggle.addEventListener('\''click'\'', toggleMobileMenu);\
        }\
\
        // Close mobile menu when clicking on a link\
        const navLinks = document.querySelectorAll('\''.nav-menu a'\'');\
        navLinks.forEach(link => {\
            link.addEventListener('\''click'\'', () => {\
                const nav = document.getElementById('\''mainNav'\'');\
                const toggle = document.getElementById('\''mobileMenuToggle'\'');\
                nav.classList.remove('\''mobile-open'\'');\
                toggle.classList.remove('\''active'\'');\
                toggle.setAttribute('\''aria-expanded'\'', false);\
            });\
        });\
    });\
    </script>\
</body>|' "$page"
        fi

        echo "Updated $page successfully"
    else
        echo "File $page not found"
    fi
done

echo "Remaining pages update completed!"