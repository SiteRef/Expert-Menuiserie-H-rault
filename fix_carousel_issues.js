const fs = require('fs');
const path = require('path');

// Gallery section template
const gallerySection = `
        <!-- RÉALISATIONS SECTION -->
        <section class="gallery-carousel-section">
            <div class="container">
                <div class="section-header">
                    <h2>Nos Réalisations</h2>
                    <p class="section-subtitle">Découvrez nos menuiseries installées dans l'Hérault</p>
                </div>

                <div class="gallery-carousel-container">
                    <div class="gallery-carousel">
                        <div class="carousel-track" id="galleryCarouselTrack">
                            <div class="carousel-slide">
                                <img src="../../Images/fenetres-sur-mesure-herault.jpg" alt="Fenêtres sur mesure">
                                <div class="carousel-caption">Fenêtres sur mesure PVC</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/portes-entree-sur-mesure-herault.jpg" alt="Porte d'entrée">
                                <div class="carousel-caption">Porte d'entrée sécurisée</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/volets-sur-mesure-herault.jpg" alt="Volets roulants">
                                <div class="carousel-caption">Volets roulants motorisés</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/porte-garage-sectionnelle-herault.jpg" alt="Porte de garage">
                                <div class="carousel-caption">Porte de garage sectionnelle</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/Portails Aluminium herault.jpg" alt="Portail aluminium">
                                <div class="carousel-caption">Portail aluminium motorisé</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/pergola-bioclimatique-herault.jpg" alt="Pergola">
                                <div class="carousel-caption">Pergola bioclimatique</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/dressing-sur-mesure-herault.jpg" alt="Dressing">
                                <div class="carousel-caption">Dressing sur mesure</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/fenetres-pvc-herault.jpg" alt="Fenêtres PVC">
                                <div class="carousel-caption">Fenêtres PVC double vitrage</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/porte-entree-aluminium-herault.jpg" alt="Porte aluminium">
                                <div class="carousel-caption">Porte d'entrée aluminium</div>
                            </div>
                            <div class="carousel-slide">
                                <img src="../../Images/volet-roulant-herault.jpg" alt="Volet roulant">
                                <div class="carousel-caption">Volet roulant avec coffre</div>
                            </div>
                        </div>
                        <button class="carousel-nav carousel-nav-prev" onclick="moveGalleryCarousel(-1)">‹</button>
                        <button class="carousel-nav carousel-nav-next" onclick="moveGalleryCarousel(1)">›</button>
                    </div>
                    <div class="carousel-indicators">
                        <button class="indicator active" onclick="goToGallerySlide(0)"></button>
                        <button class="indicator" onclick="goToGallerySlide(1)"></button>
                        <button class="indicator" onclick="goToGallerySlide(2)"></button>
                        <button class="indicator" onclick="goToGallerySlide(3)"></button>
                        <button class="indicator" onclick="goToGallerySlide(4)"></button>
                        <button class="indicator" onclick="goToGallerySlide(5)"></button>
                        <button class="indicator" onclick="goToGallerySlide(6)"></button>
                        <button class="indicator" onclick="goToGallerySlide(7)"></button>
                        <button class="indicator" onclick="goToGallerySlide(8)"></button>
                        <button class="indicator" onclick="goToGallerySlide(9)"></button>
                    </div>
                </div>
            </div>
        </section>

`;

// Complete JavaScript ending
const completeJSEnding = `;
        }, 5000);

        setInterval(() => {
            moveGalleryCarousel(1);
        }, 4000);
    </script>
</body>
</html>`;

const secteurDir = 'secteur';
const directories = fs.readdirSync(secteurDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let processedCount = 0;
let galleryAddedCount = 0;
let jsFixedCount = 0;

console.log(`Checking ${directories.length} secteur pages for carousel issues...`);

directories.forEach(dir => {
    const filePath = path.join(secteurDir, dir, 'index.html');

    if (!fs.existsSync(filePath)) {
        console.log(`❌ Skipping ${dir} - no index.html found`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let fileModified = false;

        // Check if gallery section is missing
        const hasGallerySection = content.includes('gallery-carousel-section') || content.includes('RÉALISATIONS');

        if (!hasGallerySection) {
            // Add gallery section before ZONES section
            const zonesPattern = /(\s*<!-- ZONES COUVERTES SECTION -->)/;
            if (zonesPattern.test(content)) {
                content = content.replace(zonesPattern, gallerySection + '$1');
                galleryAddedCount++;
                fileModified = true;
                console.log(`✅ Added gallery section to ${dir}`);
            }
        }

        // Check for incomplete JavaScript
        const incompletePatterns = [
            /moveHeroCarousel\(1\)\s*$/m,
            /moveHeroCarouse\s*$/m,
            /setInterval\(\(\) => \{\s*$/m,
            /\}, 5000\);\s*$/m,
            /\}\s*$/m
        ];

        let hasIncompleteJS = false;
        for (const pattern of incompletePatterns) {
            if (pattern.test(content) && !content.includes('</html>')) {
                hasIncompleteJS = true;
                break;
            }
        }

        if (hasIncompleteJS) {
            // Fix incomplete JavaScript
            // Remove everything after the last complete function and add proper ending
            const lastCompleteFunction = content.lastIndexOf('        }');
            if (lastCompleteFunction > 0) {
                const beforeFunction = content.substring(0, lastCompleteFunction + 9);
                content = beforeFunction + `

        // Auto-advance carousels
        setInterval(() => {
            moveHeroCarousel(1);
        }, 5000);

        setInterval(() => {
            moveGalleryCarousel(1);
        }, 4000);
    </script>
</body>
</html>`;
                jsFixedCount++;
                fileModified = true;
                console.log(`✅ Fixed JavaScript in ${dir}`);
            }
        }

        if (fileModified) {
            fs.writeFileSync(filePath, content, 'utf8');
            processedCount++;
        }

    } catch (error) {
        console.error(`❌ Error processing ${dir}:`, error.message);
    }
});

console.log(`\n🎉 CAROUSEL FIX COMPLETE!`);
console.log(`📊 Pages processed: ${processedCount}`);
console.log(`🖼️  Gallery sections added: ${galleryAddedCount}`);
console.log(`⚙️  JavaScript fixes applied: ${jsFixedCount}`);