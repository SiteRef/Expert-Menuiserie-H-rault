const fs = require('fs');
const path = require('path');

// Load existing cities data
const existingCitiesPath = './existing_cities.json';
let existingCities = [];
if (fs.existsSync(existingCitiesPath)) {
    existingCities = JSON.parse(fs.readFileSync(existingCitiesPath, 'utf8'));
}

// Geographic proximity mapping for communes limitrophes
const communesLimitrophes = {
    'agde': ['beziers', 'sete', 'frontignan', 'montpellier'],
    'aniane': ['gignac', 'saint-guilhem-le-desert', 'clermont-l-herault', 'paulhan'],
    'aspiran': ['paulhan', 'clermont-l-herault', 'nebian', 'lieuran-cabrieres'],
    'balaruc-les-bains': ['sete', 'meze', 'frontignan', 'marseillan'],
    'bedarieux': ['clermont-l-herault', 'lodeve', 'pezenas', 'paulhan'],
    'beziers': ['agde', 'pezenas', 'servian', 'florensac'],
    'brignac': ['gignac', 'clermont-l-herault', 'aniane', 'saint-andre-de-sangonis'],
    'cabrieres': ['clermont-l-herault', 'aspiran', 'lieuran-cabrieres', 'peret'],
    'canet': ['pezenas', 'beziers', 'florensac', 'aspiran'],
    'capestang': ['beziers', 'pezenas', 'florensac', 'nissan-lez-enserune'],
    'carnon-plage': ['palavas-les-flots', 'lattes', 'perols', 'mauguio'],
    'castelnau-le-lez': ['montpellier', 'jacou', 'le-cres', 'vendargues'],
    'clermont-l-herault': ['paulhan', 'aspiran', 'lodeve', 'gignac'],
    'florensac': ['agde', 'pezenas', 'beziers', 'marseillan'],
    'frontignan': ['sete', 'balaruc-les-bains', 'meze', 'mauguio'],
    'ganges': ['saint-mathieu-de-treviers', 'le-vigan', 'sumene', 'quissac'],
    'gignac': ['clermont-l-herault', 'aniane', 'saint-andre-de-sangonis', 'brignac'],
    'jacou': ['castelnau-le-lez', 'montpellier', 'le-cres', 'vendargues'],
    'lattes': ['montpellier', 'palavas-les-flots', 'perols', 'saint-jean-de-vedas'],
    'le-cres': ['castelnau-le-lez', 'jacou', 'vendargues', 'montpellier'],
    'le-pouget': ['gignac', 'aniane', 'clermont-l-herault', 'saint-andre-de-sangonis'],
    'liausson': ['clermont-l-herault', 'lodeve', 'octon', 'salasc'],
    'lieuran-cabrieres': ['aspiran', 'cabrieres', 'clermont-l-herault', 'peret'],
    'lodeve': ['clermont-l-herault', 'bedarieux', 'octon', 'liausson'],
    'lunel': ['mauguio', 'vendargues', 'castelnau-le-lez', 'baillargues'],
    'marseillan': ['agde', 'florensac', 'sete', 'meze'],
    'mauguio': ['lunel', 'palavas-les-flots', 'carnon-plage', 'frontignan'],
    'meze': ['sete', 'balaruc-les-bains', 'marseillan', 'frontignan'],
    'montpellier': ['lattes', 'castelnau-le-lez', 'jacou', 'saint-jean-de-vedas'],
    'moureze': ['clermont-l-herault', 'villeneuvette', 'salasc', 'liausson'],
    'nebian': ['aspiran', 'clermont-l-herault', 'paulhan', 'fouzilhon'],
    'octon': ['lodeve', 'clermont-l-herault', 'salasc', 'liausson'],
    'palavas-les-flots': ['lattes', 'carnon-plage', 'perols', 'mauguio'],
    'paulhan': ['clermont-l-herault', 'aspiran', 'pezenas', 'aniane'],
    'peret': ['cabrieres', 'lieuran-cabrieres', 'pignan', 'aniane'],
    'perols': ['lattes', 'palavas-les-flots', 'carnon-plage', 'mauguio'],
    'pezenas': ['beziers', 'clermont-l-herault', 'paulhan', 'servian'],
    'pignan': ['montpellier', 'saint-jean-de-vedas', 'peret', 'cournonterral'],
    'saint-andre-de-sangonis': ['gignac', 'clermont-l-herault', 'aniane', 'brignac'],
    'saint-felix-de-lodez': ['gignac', 'clermont-l-herault', 'aniane', 'le-pouget'],
    'saint-guilhem-le-desert': ['aniane', 'gignac', 'saint-jean-de-fos', 'causse-de-la-selle'],
    'saint-jean-de-fos': ['gignac', 'aniane', 'saint-guilhem-le-desert', 'montpeyroux'],
    'saint-jean-de-vedas': ['montpellier', 'lattes', 'pignan', 'fabregues'],
    'saint-mathieu-de-treviers': ['saint-vincent-de-barbeyrargues', 'saint-bauzille-de-montmel', 'ganges', 'assas'],
    'salasc': ['moureze', 'clermont-l-herault', 'octon', 'liausson'],
    'servian': ['beziers', 'pezenas', 'abeilhan', 'espondeilhan'],
    'sete': ['agde', 'frontignan', 'balaruc-les-bains', 'meze'],
    'valras-plage': ['beziers', 'serignan', 'vendres', 'portiragnes'],
    'vendargues': ['castelnau-le-lez', 'le-cres', 'jacou', 'lunel'],
    'vias': ['agde', 'beziers', 'portiragnes', 'valras-plage'],
    'villeneuve-les-maguelone': ['palavas-les-flots', 'villeneuve-les-maguelone', 'fabrègues', 'montpellier']
};

// Filter communes to only include existing ones
function getValidCommunes(citySlug) {
    const communes = communesLimitrophes[citySlug] || [];
    return communes.filter(commune => existingCities.includes(commune));
}

// City display names with proper French formatting
const cityDisplayNames = {
    'agde': 'Agde',
    'aniane': 'Aniane',
    'aspiran': 'Aspiran',
    'balaruc-les-bains': 'Balaruc-les-Bains',
    'bedarieux': 'Bédarieux',
    'beziers': 'Béziers',
    'brignac': 'Brignac',
    'cabrieres': 'Cabrières',
    'canet': 'Canet',
    'capestang': 'Capestang',
    'carnon-plage': 'Carnon-Plage',
    'castelnau-le-lez': 'Castelnau-le-Lez',
    'clermont-l-herault': 'Clermont-l\'Hérault',
    'florensac': 'Florensac',
    'frontignan': 'Frontignan',
    'ganges': 'Ganges',
    'gignac': 'Gignac',
    'jacou': 'Jacou',
    'lattes': 'Lattes',
    'le-cres': 'Le Crès',
    'le-pouget': 'Le Pouget',
    'liausson': 'Liausson',
    'lieuran-cabrieres': 'Lieuran-Cabrières',
    'lodeve': 'Lodève',
    'lunel': 'Lunel',
    'marseillan': 'Marseillan',
    'mauguio': 'Mauguio',
    'meze': 'Mèze',
    'montpellier': 'Montpellier',
    'moureze': 'Mourèze',
    'nebian': 'Nébian',
    'octon': 'Octon',
    'palavas-les-flots': 'Palavas-les-Flots',
    'paulhan': 'Paulhan',
    'peret': 'Péret',
    'perols': 'Pérols',
    'pezenas': 'Pézenas',
    'pignan': 'Pignan',
    'saint-andre-de-sangonis': 'Saint-André-de-Sangonis',
    'saint-felix-de-lodez': 'Saint-Félix-de-Lodez',
    'saint-guilhem-le-desert': 'Saint-Guilhem-le-Désert',
    'saint-jean-de-fos': 'Saint-Jean-de-Fos',
    'saint-jean-de-vedas': 'Saint-Jean-de-Védas',
    'saint-mathieu-de-treviers': 'Saint-Mathieu-de-Tréviers',
    'salasc': 'Salasc',
    'servian': 'Servian',
    'sete': 'Sète',
    'valras-plage': 'Valras-Plage',
    'vendargues': 'Vendargues',
    'vias': 'Vias',
    'villeneuve-les-maguelone': 'Villeneuve-lès-Maguelone'
};

// Postal codes for Hérault cities
const postalCodes = {
    'agde': '34300',
    'aniane': '34150',
    'aspiran': '34800',
    'balaruc-les-bains': '34540',
    'bedarieux': '34600',
    'beziers': '34500',
    'brignac': '34800',
    'cabrieres': '34800',
    'canet': '34800',
    'capestang': '34310',
    'carnon-plage': '34280',
    'castelnau-le-lez': '34170',
    'clermont-l-herault': '34800',
    'florensac': '34510',
    'frontignan': '34110',
    'ganges': '34190',
    'gignac': '34150',
    'jacou': '34830',
    'lattes': '34970',
    'le-cres': '34920',
    'le-pouget': '34230',
    'liausson': '34700',
    'lieuran-cabrieres': '34800',
    'lodeve': '34700',
    'lunel': '34400',
    'marseillan': '34340',
    'mauguio': '34130',
    'meze': '34140',
    'montpellier': '34000',
    'moureze': '34800',
    'nebian': '34800',
    'octon': '34800',
    'palavas-les-flots': '34250',
    'paulhan': '34230',
    'peret': '34800',
    'perols': '34470',
    'pezenas': '34120',
    'pignan': '34570',
    'saint-andre-de-sangonis': '34725',
    'saint-felix-de-lodez': '34725',
    'saint-guilhem-le-desert': '34150',
    'saint-jean-de-fos': '34150',
    'saint-jean-de-vedas': '34430',
    'saint-mathieu-de-treviers': '34270',
    'salasc': '34800',
    'servian': '34290',
    'sete': '34200',
    'valras-plage': '34350',
    'vendargues': '34740',
    'vias': '34450',
    'villeneuve-les-maguelone': '34750'
};

// Quartiers data specific to each city - using your exact content for Agde
const quartersByCity = {
    'agde': {
        "Centre Historique": [
            ["Cité d'Agde", "Patrimoine historique"],
            ["Cathédrale Saint-Étienne", "Centre médiéval"],
            ["Quartier du Port", "Bord d'Hérault"]
        ],
        "Cap d'Agde": [
            ["Station Balnéaire", "Front de mer"],
            ["Port de Plaisance", "Marina"],
            ["Rochelongue", "Résidentiel"]
        ],
        "Quartiers Résidentiels": [
            ["Badens", "Résidentiel"],
            ["Les Cayennes", "Zone pavillonnaire"],
            ["Grau d'Agde", "Port de pêche"],
            ["La Plagette", "Littoral"]
        ]
    },

    // Default quartiers for other cities
    default: {
        "Centre Historique": [
            ["Centre-Ville", "Cœur historique"],
            ["Vieille Ville", "Patrimoine architectural"],
            ["Place du Marché", "Commerce traditionnel"]
        ],
        "Quartiers Résidentiels": [
            ["Les Jardins", "Zone pavillonnaire"],
            ["Les Oliviers", "Résidentiel calme"],
            ["La Colline", "Vue panoramique"]
        ],
        "Zones d'Activités": [
            ["Zone Artisanale", "Secteur professionnel"],
            ["Zone Commerciale", "Centre commercial"],
            ["Parc d'Activités", "Entreprises locales"]
        ]
    }
};

function generateTwoColumnZonesSectionWithProperCSS(citySlug) {
    const cityDisplayName = cityDisplayNames[citySlug] || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    const validCommunes = getValidCommunes(citySlug);
    const quartiers = quartersByCity[citySlug] || quartersByCity.default;

    let html = `        <!-- ZONES COUVERTES SECTION -->
        <section class="zones-section">
            <div class="container">
                <div class="section-header">
                    <h2>Zones d'Intervention à ${cityDisplayName}</h2>
                    <p class="section-subtitle">Expert Menuiserie Hérault intervient dans tous les quartiers de ${cityDisplayName}</p>
                </div>

                <!-- Two column layout: Left = Large Image + Communes, Right = Quartiers -->
                <div class="grid grid-2" style="gap: var(--spacing-2xl); align-items: start;">

                    <!-- LEFT COLUMN: Large Image + Communes Limitrophes -->
                    <div class="zones-left-column">
                        <div class="zones-content">
                            <div class="zones-info">
                                <img src="../../Images/Nos%20Zones%20d'Intervention%20dans%20l'Hérault.jpg"
                                     alt="Carte intervention ${cityDisplayName}"
                                     class="intervention-map">

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
                        </div>

                        <!-- Communes Limitrophes -->
                        <div style="margin-top: 2rem;">
                            <h3 style="color: #1B365D; margin-bottom: 1.5rem; font-size: 1.25rem;">Communes Limitrophes</h3>
                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr); gap: 1rem;">`;

    // Add communes limitrophes
    validCommunes.forEach(communeSlug => {
        const displayName = cityDisplayNames[communeSlug] || communeSlug;
        const postalCode = postalCodes[communeSlug] || '';

        html += `
                                <div class="city-item">
                                    <a href="../${communeSlug}/" style="text-decoration: none; color: inherit;">
                                        <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; transition: all 0.3s ease; background: white; hover: box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                            <strong style="color: #2d3748; display: block; margin-bottom: 4px;">${displayName}</strong>
                                            <span style="color: #718096; font-size: 0.9rem;">${postalCode}</span>
                                        </div>
                                    </a>
                                </div>`;
    });

    html += `
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Quartiers & Zones Couverts -->
                    <div class="zones-right-column">
                        <h3 style="color: #1B365D; margin-bottom: 1.5rem; font-size: 1.25rem;">Quartiers &amp; Zones Couverts</h3>`;

    // Add quartiers sections
    Object.entries(quartiers).forEach(([category, items]) => {
        html += `
                        <div style="margin-top: 2rem;">
                            <h4 style="color: #1B365D; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">${category}</h4>
                            <div class="cities-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">`;

        items.forEach(([name, description]) => {
            html += `
                                <div class="city-item">
                                    <div style="padding: 1rem; border: 1px solid #e2e8f0; border-radius: 8px; background: white; transition: all 0.3s ease;">
                                        <strong style="color: #2d3748; display: block; margin-bottom: 6px; font-size: 0.95rem;">${name}</strong>
                                        <span style="color: #718096; font-size: 0.85rem; line-height: 1.3;">${description}</span>
                                    </div>
                                </div>`;
        });

        html += `
                            </div>
                        </div>`;
    });

    html += `
                    </div>
                </div>
            </div>
        </section>`;

    return html;
}

function processFile(filePath, citySlug) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove any existing zones sections
        content = content.replace(/<!-- ZONES COUVERTES SECTION -->[\s\S]*?<\/section>/g, '');
        content = content.replace(/<section class="zones-section">[\s\S]*?<\/section>/g, '');

        // Find insertion point (before final CTA section)
        const ctaIndex = content.indexOf('<!-- CTA FINAL SECTION -->');
        if (ctaIndex === -1) {
            console.log(`Warning: Could not find CTA section in ${citySlug}`);
            return false;
        }

        // Generate two-column zones section with proper CSS classes
        const zonesHTML = generateTwoColumnZonesSectionWithProperCSS(citySlug);

        // Insert the new section
        const newContent = content.substring(0, ctaIndex) + zonesHTML + '\n\n        ' + content.substring(ctaIndex);

        fs.writeFileSync(filePath, newContent, 'utf8');
        return true;

    } catch (error) {
        console.log(`Error processing ${citySlug}: ${error.message}`);
        return false;
    }
}

// Main execution
const secteurPath = './secteur';
const directories = fs.readdirSync(secteurPath, { withFileTypes: true });

let processedCount = 0;
let totalCount = 0;

console.log('Fixing image size using proper CSS classes...');
console.log('='.repeat(60));

directories.forEach(dir => {
    if (dir.isDirectory()) {
        const indexPath = path.join(secteurPath, dir.name, 'index.html');
        if (fs.existsSync(indexPath)) {
            totalCount++;
            console.log(`Processing ${dir.name}...`);

            if (processFile(indexPath, dir.name)) {
                processedCount++;
                console.log(`✓ ${dir.name} - CSS classes fixed`);
            } else {
                console.log(`✗ ${dir.name} - Failed to update`);
            }
        }
    }
});

console.log('='.repeat(60));
console.log(`Completion: ${processedCount}/${totalCount} files processed successfully`);
console.log(`Success rate: ${Math.round((processedCount/totalCount)*100)}%`);