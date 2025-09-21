const fs = require('fs');
const path = require('path');

// Perfect structure template based on Agde
const perfectZonesStructureTemplate = `                <!-- Two column layout: Left = Large Image + Communes, Right = Quartiers -->
                <div class="grid grid-2" style="gap: var(--spacing-2xl); align-items: start;">

                    <!-- LEFT COLUMN: Large Image + Communes Limitrophes -->
                    <div class="zones-left-column">
                        <div class="zones-info">
                            <img src="../../Images/Nos%20Zones%20d'Intervention%20dans%20l'Hérault.jpg"
                                 alt="Carte intervention {{CITY_NAME}}"
                                 class="intervention-map"
                                 style="width: 100%; max-width: 100%; display: block;">

                            <div class="zones-stats">
                                <div class="stat-item">
                                    <span class="stat-number">12+</span>
                                    <span class="stat-label">Quartiers couverts</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">24h</span>
                                    <span class="stat-label">Délai intervention</span>
                                </div>
                            </div>
                        </div>

                        <!-- Communes Limitrophes -->
                        <div style="margin-top: 2rem;">
                            {{COMMUNES_SECTION}}
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Quartiers & Zones Couverts -->
                    <div class="zones-right-column">
                        {{QUARTIERS_SECTION}}
                    </div>

                </div>`;

const secteurDir = 'secteur';
const directories = fs.readdirSync(secteurDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let processedCount = 0;

console.log(`Found ${directories.length} secteur directories to process...`);

directories.forEach(dir => {
    const filePath = path.join(secteurDir, dir, 'index.html');

    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${dir} - no index.html found`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Extract city name for alt text
        const cityName = dir.charAt(0).toUpperCase() + dir.slice(1).replace(/-/g, ' ');

        // Find and extract existing communes and quartiers sections if they exist
        const communesMatch = content.match(/<h3[^>]*>Communes Limitrophes<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*<div class="zones-right-column"|<\/div>\s*<\/div>\s*<!-- RIGHT COLUMN|$)/);
        const quartiersMatch = content.match(/<h3[^>]*>Quartiers[^<]*<\/h3>[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>|<\/div>\s*<\/section>|$)/);

        let communesSection = '';
        let quartiersSection = '';

        if (communesMatch) {
            communesSection = communesMatch[0].trim();
        } else {
            // Default communes section
            communesSection = `<h3 style="color: #1B365D; margin-bottom: 1.5rem; font-size: 1.25rem;">Communes Limitrophes</h3>
                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                                <div class="city-item">
                                    <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; background: white;">
                                        <strong style="color: #2d3748;">Montpellier</strong>
                                        <span style="color: #718096; font-size: 0.9rem;">34000</span>
                                    </div>
                                </div>
                            </div>`;
        }

        if (quartiersMatch) {
            quartiersSection = quartiersMatch[0].trim();
        } else {
            // Default quartiers section
            quartiersSection = `<h3 style="color: #1B365D; margin-bottom: 1.5rem; font-size: 1.25rem;">Quartiers & Zones Couverts</h3>
                        <div style="margin-top: 2rem;">
                            <h4 style="color: #1B365D; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">Centre-Ville</h4>
                            <div class="cities-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                                <div class="city-item">
                                    <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background: white;">
                                        <strong style="color: #2d3748; display: block; margin-bottom: 6px;">${cityName} Centre</strong>
                                        <span style="color: #718096; font-size: 0.85rem;">Zone principale</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }

        // Create the perfect structure with extracted content
        const perfectStructure = perfectZonesStructureTemplate
            .replace(/{{CITY_NAME}}/g, cityName)
            .replace('{{COMMUNES_SECTION}}', communesSection)
            .replace('{{QUARTIERS_SECTION}}', quartiersSection);

        // Find the zones section and replace it completely
        const zonesRegex = /<!-- Two column layout[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

        if (zonesRegex.test(content)) {
            // Replace existing zones structure with perfect structure
            content = content.replace(zonesRegex, perfectStructure + `
            </div>
        </section>`);
        } else {
            console.log(`Warning: Could not find zones section in ${dir}`);
            return;
        }

        fs.writeFileSync(filePath, content, 'utf8');
        processedCount++;
        console.log(`✓ Applied perfect structure to ${dir}`);

    } catch (error) {
        console.error(`Error processing ${dir}:`, error.message);
    }
});

console.log(`\nCompleted! Applied perfect zones structure to ${processedCount}/${directories.length} files.`);