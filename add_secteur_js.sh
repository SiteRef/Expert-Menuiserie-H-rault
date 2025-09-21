#!/bin/bash

# Add mobile menu JavaScript to secteur pages
echo "Adding mobile menu JavaScript to secteur pages..."

cd secteur

for dir in */; do
    file="${dir}index.html"
    if [ -f "$file" ]; then
        echo "Adding mobile JS to $file..."

        # Check if mobile JS already exists
        if ! grep -q "toggleMobileMenu" "$file"; then
            # Add mobile menu JavaScript after <script> tag
            sed -i 's|    <script>|    <script>\
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
|' "$file"
        fi

        echo "Updated $file successfully"
    else
        echo "File $file not found"
    fi
done

echo "Secteur mobile JavaScript addition completed!"