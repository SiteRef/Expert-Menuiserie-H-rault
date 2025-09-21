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
    'agde': ['beziers', 'sete', 'marseillan', 'florensac'],
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

// Quartiers data for different cities
const quartersByCity = {
    // Default quartiers for most cities
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
    },

    // Specific quartiers for major cities
    'montpellier': {
        "Centre Historique": [
            ["Écusson", "Centre historique médiéval"],
            ["Place de la Comédie", "Cœur culturel"],
            ["Gare Saint-Roch", "Quartier de la gare"]
        ],
        "Quartiers Résidentiels": [
            ["Antigone", "Architecture néo-classique"],
            ["Port Marianne", "Quartier moderne"],
            ["Beaux-Arts", "Zone résidentielle"]
        ],
        "Zones Périphériques": [
            ["Près d'Arènes", "Zone d'activités"],
            ["Richter", "Quartier d'affaires"],
            ["Millénaire", "Nouveau quartier"]
        ]
    },

    'beziers': {
        "Centre Historique": [
            ["Plateau Saint-Jacques", "Centre historique"],
            ["Cathédrale Saint-Nazaire", "Patrimoine religieux"],
            ["Allées Paul Riquet", "Avenue principale"]
        ],
        "Quartiers Résidentiels": [
            ["Devèze", "Zone pavillonnaire"],
            ["La Merced", "Quartier résidentiel"],
            ["Montimaran", "Colline résidentielle"]
        ],
        "Zones d'Activités": [
            ["Zone de Bayssan", "Parc d'activités"],
            ["Polygone", "Centre commercial"],
            ["Capiscol", "Zone industrielle"]
        ]
    },

    'sete': {
        "Centre-Ville": [
            ["Port de Sète", "Centre maritime"],
            ["Mont Saint-Clair", "Quartier historique"],
            ["Quai de Bosc", "Front de mer"]
        ],
        "Quartiers Résidentiels": [
            ["Corniche", "Bord de mer"],
            ["Plagette", "Zone résidentielle"],
            ["Les Quilles", "Quartier familial"]
        ],
        "Zones Portuaires": [
            ["Port de Commerce", "Zone industrielle"],
            ["Port de Plaisance", "Marina"],
            ["Môle Saint-Louis", "Port de pêche"]
        ]
    }
};

function generateQuartiersHTML(citySlug) {
    const quartiers = quartersByCity[citySlug] || quartersByCity.default;
    let html = `                        <h3>Quartiers &amp; Zones Couverts</h3>\n\n`;

    Object.entries(quartiers).forEach(([category, items]) => {
        html += `                        <div class="city-zone">\n`;
        html += `                            <h4 class="zone-title">${category}</h4>\n`;
        html += `                            <div class="cities-grid">\n`;

        items.forEach(([name, description]) => {
            html += `                                <div class="city-item">\n`;
            html += `                                    <div style="display: block; padding: var(--spacing-sm) var(--spacing-md); text-decoration: none; color: var(--text-dark);">\n`;
            html += `                                        <strong>${name}</strong>\n`;
            html += `                                        <span class="city-code">${description}</span>\n`;
            html += `                                    </div>\n`;
            html += `                                </div>\n`;
        });

        html += `                            </div>\n`;
        html += `                        </div>\n\n`;
    });

    return html;
}

function generateCommunesLimitrophesHTML(citySlug) {
    const validCommunes = getValidCommunes(citySlug);

    if (validCommunes.length === 0) {
        return '';
    }

    let html = `                        <!-- Communes Limitrophes Section -->\n`;
    html += `                        <div class="city-zone" style="margin-top: var(--spacing-xl);">\n`;
    html += `                            <h4 class="zone-title">Communes Limitrophes</h4>\n`;
    html += `                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr);">\n`;

    validCommunes.forEach(communeSlug => {
        const displayName = cityDisplayNames[communeSlug] || communeSlug;
        const postalCode = postalCodes[communeSlug] || '';

        html += `                                <div class="city-item">\n`;
        html += `                                    <a href="../${communeSlug}/">\n`;
        html += `                                        <strong>${displayName}</strong>\n`;
        html += `                                        <span class="city-code">${postalCode}</span>\n`;
        html += `                                    </a>\n`;
        html += `                                </div>\n`;
    });

    html += `                            </div>\n`;
    html += `                        </div>\n`;

    return html;
}

function processFile(filePath, citySlug) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Find the insertion point (after services section, before footer)
        const insertionPoint = content.lastIndexOf('</section>');

        if (insertionPoint === -1) {
            console.log(`Warning: Could not find insertion point in ${citySlug}`);
            return false;
        }

        // Check if quartiers section already exists
        const hasQuartiers = content.includes('<h3>Quartiers &amp; Zones Couverts</h3>');
        const hasCommunesLimitrophes = content.includes('<!-- Communes Limitrophes Section -->');

        // Remove existing sections if they exist
        if (hasQuartiers) {
            content = content.replace(/<h3>Quartiers &amp; Zones Couverts<\/h3>[\s\S]*?(?=<\/section>|<!-- Communes Limitrophes Section -->|$)/g, '');
        }

        if (hasCommunesLimitrophes) {
            content = content.replace(/<!-- Communes Limitrophes Section -->[\s\S]*?(?=<\/section>|$)/g, '');
        }

        // Generate new sections
        const quartiersHTML = generateQuartiersHTML(citySlug);
        const communesHTML = generateCommunesLimitrophesHTML(citySlug);

        // Insert new sections before the last </section>
        const newSections = quartiersHTML + communesHTML;
        const newContent = content.substring(0, insertionPoint) + newSections + content.substring(insertionPoint);

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

console.log('Adding Quartiers & Zones Couverts and Communes Limitrophes sections...');
console.log('='.repeat(70));

directories.forEach(dir => {
    if (dir.isDirectory()) {
        const indexPath = path.join(secteurPath, dir.name, 'index.html');
        if (fs.existsSync(indexPath)) {
            totalCount++;
            console.log(`Processing ${dir.name}...`);

            if (processFile(indexPath, dir.name)) {
                processedCount++;
                console.log(`✓ ${dir.name} - Successfully updated`);
            } else {
                console.log(`✗ ${dir.name} - Failed to update`);
            }
        }
    }
});

console.log('='.repeat(70));
console.log(`Completion: ${processedCount}/${totalCount} files processed successfully`);
console.log(`Success rate: ${Math.round((processedCount/totalCount)*100)}%`);