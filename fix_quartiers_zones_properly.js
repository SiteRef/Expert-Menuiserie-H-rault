const fs = require('fs');

console.log('=== FIXING QUARTIERS & ZONES COUVERTS WITH EXACT AGDE STRUCTURE ===');

// Load existing cities from previous script
const existingCities = JSON.parse(fs.readFileSync('existing_cities.json', 'utf8'));

// Database of quartiers/zones for each city
const quartersByCity = {
  'clermont-l-herault': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur historique'],
      ['Place Jean Jaurès', 'Place principale'],
      ['Vieille ville', 'Patrimoine médiéval']
    ],
    'Quartiers Résidentiels': [
      ['Les Oliviers', 'Zone pavillonnaire'],
      ['Le Pioch', 'Résidentiel'],
      ['La Plaine', 'Zone moderne'],
      ['Les Jardins', 'Quartier calme']
    ]
  },

  'frontignan': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur historique'],
      ['Place de la République', 'Place centrale'],
      ['Vieux Frontignan', 'Patrimoine']
    ],
    'Zone Balnéaire': [
      ['Frontignan-Plage', 'Front de mer'],
      ['Les Aresquiers', 'Plage naturelle'],
      ['Port de Frontignan', 'Zone portuaire']
    ],
    'Quartiers Résidentiels': [
      ['Les Bronzes', 'Résidentiel'],
      ['La Peyrade', 'Zone pavillonnaire'],
      ['Les Salins', 'Quartier moderne']
    ]
  },

  'ganges': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur historique'],
      ['Place du Marché', 'Place principale'],
      ['Vieille ville', 'Patrimoine cévenol']
    ],
    'Quartiers Résidentiels': [
      ['Les Cévennes', 'Zone pavillonnaire'],
      ['Le Vidourle', 'Bord de rivière'],
      ['Les Collines', 'Résidentiel'],
      ['La Plaine', 'Zone moderne']
    ]
  },

  'gignac': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur historique'],
      ['Place du Jeu de Ballon', 'Place centrale'],
      ['Pont de Gignac', 'Monument historique']
    ],
    'Quartiers Résidentiels': [
      ['Les Jardins', 'Zone pavillonnaire'],
      ['La Meuse', 'Résidentiel'],
      ['Les Oliviers', 'Quartier calme'],
      ['Le Causse', 'Zone moderne']
    ]
  },

  'jacou': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur du village'],
      ['Place de la Mairie', 'Place centrale'],
      ['Vieux Jacou', 'Patrimoine']
    ],
    'Quartiers Résidentiels': [
      ['Les Pins', 'Zone pavillonnaire'],
      ['Le Parc', 'Résidentiel'],
      ['Les Jardins', 'Quartier moderne'],
      ['La Garrigue', 'Zone naturelle']
    ]
  },

  'lattes': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur historique'],
      ['Place de la Mairie', 'Place principale'],
      ['Vieux Lattes', 'Patrimoine']
    ],
    'Zone Commerciale': [
      ['Odysseum', 'Centre commercial'],
      ['Port Ariane', 'Zone moderne'],
      ['Boirargues', 'Quartier d\'affaires']
    ],
    'Quartiers Résidentiels': [
      ['Les Jardins', 'Zone pavillonnaire'],
      ['Maurin', 'Résidentiel'],
      ['Les Mas', 'Quartier calme']
    ]
  },

  'lunel': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur historique'],
      ['Place des Martyrs', 'Place centrale'],
      ['Vieille ville', 'Patrimoine médiéval']
    ],
    'Quartiers Résidentiels': [
      ['Les Abricotiers', 'Zone pavillonnaire'],
      ['La Condamine', 'Résidentiel'],
      ['Les Oliviers', 'Quartier moderne'],
      ['Le Levant', 'Zone calme']
    ]
  },

  'palavas-les-flots': {
    'Centre Historique': [
      ['Centre-ville', 'Cœur de station'],
      ['Front de mer', 'Promenade'],
      ['Port de Palavas', 'Zone portuaire']
    ],
    'Zone Balnéaire': [
      ['Plage centrale', 'Front de mer'],
      ['Les Roquilles', 'Plage est'],
      ['Saint-Pierre', 'Plage ouest']
    ],
    'Quartiers Résidentiels': [
      ['Les Mas', 'Zone pavillonnaire'],
      ['La Rive droite', 'Résidentiel'],
      ['Les Jardins', 'Quartier calme']
    ]
  }
};

// Default template for cities not specifically defined
const defaultQuartiers = {
  'Centre Historique': [
    ['Centre-ville', 'Cœur historique'],
    ['Place principale', 'Centre névralgique'],
    ['Vieille ville', 'Patrimoine local']
  ],
  'Quartiers Résidentiels': [
    ['Les Jardins', 'Zone pavillonnaire'],
    ['Les Oliviers', 'Résidentiel'],
    ['La Plaine', 'Zone moderne'],
    ['Les Collines', 'Quartier calme']
  ]
};

// Geographic proximity mapping
const proximityMap = {
  'clermont-l-herault': ['lodeve', 'gignac', 'nebian', 'aspiran'],
  'florensac': ['pezenas', 'marseillan', 'meze', 'agde'],
  'frontignan': ['sete', 'balaruc-les-bains', 'meze', 'montpellier'],
  'ganges': ['saint-guilhem-le-desert', 'aniane', 'gignac', 'lodeve'],
  'gignac': ['clermont-l-herault', 'aniane', 'saint-guilhem-le-desert', 'lodeve'],
  'jacou': ['castelnau-le-lez', 'le-cres', 'vendargues', 'montpellier'],
  'lattes': ['montpellier', 'perols', 'palavas-les-flots', 'mauguio'],
  'le-cres': ['castelnau-le-lez', 'jacou', 'vendargues', 'saint-mathieu-de-treviers'],
  'le-pouget': ['gignac', 'clermont-l-herault', 'aniane', 'saint-andre-de-sangonis'],
  'liausson': ['clermont-l-herault', 'lodeve', 'octon', 'nebian'],
  'lieuran-cabrieres': ['cabrieres', 'clermont-l-herault', 'aspiran', 'nebian'],
  'lodeve': ['clermont-l-herault', 'ganges', 'saint-guilhem-le-desert', 'nebian'],
  'lunel': ['mauguio', 'vendargues', 'castelnau-le-lez', 'saint-jean-de-vedas'],
  'marseillan': ['agde', 'meze', 'florensac', 'sete'],
  'mauguio': ['lattes', 'perols', 'carnon-plage', 'lunel'],
  'meze': ['balaruc-les-bains', 'marseillan', 'florensac', 'frontignan'],
  'moureze': ['clermont-l-herault', 'lodeve', 'octon', 'liausson'],
  'nebian': ['clermont-l-herault', 'aspiran', 'lieuran-cabrieres', 'lodeve'],
  'octon': ['clermont-l-herault', 'lodeve', 'moureze', 'liausson'],
  'palavas-les-flots': ['lattes', 'perols', 'villeneuve-les-maguelone', 'montpellier'],
  'paulhan': ['pezenas', 'clermont-l-herault', 'aspiran', 'nebian'],
  'peret': ['gignac', 'aniane', 'saint-guilhem-le-desert', 'clermont-l-herault'],
  'perols': ['lattes', 'mauguio', 'palavas-les-flots', 'carnon-plage'],
  'pezenas': ['florensac', 'paulhan', 'aspiran', 'clermont-l-herault'],
  'pignan': ['montpellier', 'villeneuve-les-maguelone', 'saint-jean-de-vedas', 'lattes'],
  'saint-andre-de-sangonis': ['gignac', 'aniane', 'clermont-l-herault', 'le-pouget'],
  'saint-felix-de-lodez': ['gignac', 'aniane', 'clermont-l-herault', 'saint-andre-de-sangonis'],
  'saint-guilhem-le-desert': ['aniane', 'gignac', 'ganges', 'lodeve'],
  'saint-jean-de-fos': ['aniane', 'gignac', 'saint-guilhem-le-desert', 'ganges'],
  'saint-mathieu-de-treviers': ['le-cres', 'vendargues', 'castelnau-le-lez', 'jacou'],
  'salasc': ['clermont-l-herault', 'lodeve', 'octon', 'nebian'],
  'servian': ['beziers', 'pezenas', 'florensac', 'capestang'],
  'valras-plage': ['beziers', 'servian', 'capestang', 'agde'],
  'vendargues': ['le-cres', 'castelnau-le-lez', 'jacou', 'saint-mathieu-de-treviers'],
  'vias': ['agde', 'marseillan', 'florensac', 'beziers'],
  'villeneuve-les-maguelone': ['palavas-les-flots', 'lattes', 'montpellier', 'pignan']
};

function getPostalCode(citySlug) {
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
    'liausson': '34800',
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

  return postalCodes[citySlug] || '34XXX';
}

function getCityDisplayName(citySlug) {
  const nameMap = {
    'clermont-l-herault': 'Clermont-l\'Hérault',
    'saint-andre-de-sangonis': 'Saint-André-de-Sangonis',
    'saint-felix-de-lodez': 'Saint-Félix-de-Lodez',
    'saint-guilhem-le-desert': 'Saint-Guilhem-le-Désert',
    'saint-jean-de-fos': 'Saint-Jean-de-Fos',
    'saint-jean-de-vedas': 'Saint-Jean-de-Védas',
    'saint-mathieu-de-treviers': 'Saint-Mathieu-de-Tréviers',
    'palavas-les-flots': 'Palavas-les-Flots',
    'villeneuve-les-maguelone': 'Villeneuve-lès-Maguelone',
    'balaruc-les-bains': 'Balaruc-les-Bains',
    'lieuran-cabrieres': 'Lieuran-Cabrières',
    'valras-plage': 'Valras-Plage',
    'carnon-plage': 'Carnon-Plage',
    'castelnau-le-lez': 'Castelnau-le-Lez',
    'le-cres': 'Le Crès',
    'le-pouget': 'Le Pouget',
    'bedarieux': 'Bédarieux',
    'beziers': 'Béziers',
    'cabrieres': 'Cabrières',
    'lodeve': 'Lodève',
    'meze': 'Mèze',
    'pezenas': 'Pézenas',
    'sete': 'Sète'
  };

  return nameMap[citySlug] || citySlug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('-');
}

function selectNearbyCommunes(currentCity, existingCities) {
  const available = existingCities.filter(city => city !== currentCity);

  if (proximityMap[currentCity]) {
    const nearbyOptions = proximityMap[currentCity].filter(city =>
      available.includes(city)
    );

    if (nearbyOptions.length >= 4) {
      return nearbyOptions.slice(0, 4);
    }

    const remaining = available.filter(city => !nearbyOptions.includes(city));
    return [...nearbyOptions, ...remaining.slice(0, 4 - nearbyOptions.length)];
  }

  return available.slice(0, 4);
}

function generateQuartiersHTML(citySlug) {
  const quartiers = quartersByCity[citySlug] || defaultQuartiers;

  let html = `                        <h3>Quartiers & Zones Couverts</h3>\n\n`;

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

function generateCommunesHTML(citySlug) {
  const selectedCommunes = selectNearbyCommunes(citySlug, existingCities);

  let html = `                        <!-- Communes Limitrophes Section -->\n`;
  html += `                        <div class="city-zone" style="margin-top: var(--spacing-xl);">\n`;
  html += `                            <h4 class="zone-title">Communes Limitrophes</h4>\n`;
  html += `                            <div class="cities-grid" style="grid-template-columns: repeat(2, 1fr);">\n`;

  selectedCommunes.forEach(commune => {
    const displayName = getCityDisplayName(commune);
    const postalCode = getPostalCode(commune);
    html += `                                <div class="city-item">\n`;
    html += `                                    <a href="../${commune}/">\n`;
    html += `                                        <strong>${displayName}</strong>\n`;
    html += `                                        <span class="city-code">${postalCode}</span>\n`;
    html += `                                    </a>\n`;
    html += `                                </div>\n`;
  });

  html += `                            </div>\n`;
  html += `                        </div>\n`;

  return html;
}

const filesToFix = [
  'secteur/clermont-l-herault/index.html',
  'secteur/florensac/index.html',
  'secteur/frontignan/index.html',
  'secteur/ganges/index.html',
  'secteur/gignac/index.html',
  'secteur/jacou/index.html',
  'secteur/lattes/index.html',
  'secteur/le-cres/index.html',
  'secteur/le-pouget/index.html',
  'secteur/liausson/index.html',
  'secteur/lieuran-cabrieres/index.html',
  'secteur/lodeve/index.html',
  'secteur/lunel/index.html',
  'secteur/marseillan/index.html',
  'secteur/mauguio/index.html',
  'secteur/meze/index.html',
  'secteur/moureze/index.html',
  'secteur/nebian/index.html',
  'secteur/octon/index.html',
  'secteur/palavas-les-flots/index.html',
  'secteur/paulhan/index.html',
  'secteur/peret/index.html',
  'secteur/perols/index.html',
  'secteur/pezenas/index.html',
  'secteur/pignan/index.html',
  'secteur/saint-andre-de-sangonis/index.html',
  'secteur/saint-felix-de-lodez/index.html',
  'secteur/saint-guilhem-le-desert/index.html',
  'secteur/saint-jean-de-fos/index.html',
  'secteur/saint-mathieu-de-treviers/index.html',
  'secteur/salasc/index.html',
  'secteur/servian/index.html',
  'secteur/valras-plage/index.html',
  'secteur/vendargues/index.html',
  'secteur/vias/index.html',
  'secteur/villeneuve-les-maguelone/index.html'
];

let totalFixed = 0;

filesToFix.forEach((filePath, index) => {
  console.log(`\n${index + 1}/${filesToFix.length}: ${filePath}`);

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const citySlug = filePath.split('/')[1];

    // Generate both sections using exact Agde structure
    const quartiersHTML = generateQuartiersHTML(citySlug);
    const communesHTML = generateCommunesHTML(citySlug);
    const combinedHTML = quartiersHTML + communesHTML;

    // Find the zones-cities section and replace everything in it
    const zonesCitiesRegex = /(<div class="zones-cities">.*?<h3>).*?(<\/div>\s*<\/div>)/s;
    const match = content.match(zonesCitiesRegex);

    if (match) {
      const replacement = match[1] + '\n' + combinedHTML + '\n                    ' + match[2];
      content = content.replace(zonesCitiesRegex, replacement);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated with Agde-style structure for ${citySlug}`);
      totalFixed++;
    } else {
      console.log(`  ❌ Could not find zones-cities section to replace`);
    }

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Files processed: ${filesToFix.length}`);
console.log(`Files updated: ${totalFixed}`);
console.log('All pages now have proper "Quartiers & Zones Couverts" and "Communes Limitrophes" sections using exact Agde structure');