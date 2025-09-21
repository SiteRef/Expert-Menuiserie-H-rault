const fs = require('fs');

// Load existing cities from step 1
const existingCities = JSON.parse(fs.readFileSync('existing_cities.json', 'utf8'));

console.log('=== FIXING COMMUNES LIMITROPHES ===');
console.log(`Available cities for linking: ${existingCities.length}`);

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

// Geographic proximity mapping for better commune selection
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

function selectNearbyCommunes(currentCity, existingCities) {
  // Remove current city from available options
  const available = existingCities.filter(city => city !== currentCity);

  // Try to use proximity mapping first
  if (proximityMap[currentCity]) {
    const nearbyOptions = proximityMap[currentCity].filter(city =>
      available.includes(city)
    );

    if (nearbyOptions.length >= 4) {
      return nearbyOptions.slice(0, 4);
    }

    // If not enough nearby, fill with other available cities
    const remaining = available.filter(city => !nearbyOptions.includes(city));
    return [...nearbyOptions, ...remaining.slice(0, 4 - nearbyOptions.length)];
  }

  // Default: select first 4 available cities
  return available.slice(0, 4);
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

  // If not in map, capitalize first letter of each word
  return nameMap[citySlug] || citySlug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join('-');
}

let totalFixed = 0;

filesToFix.forEach((filePath, index) => {
  console.log(`\n${index + 1}/${filesToFix.length}: ${filePath}`);

  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract current city name from file path
    const currentCity = filePath.split('/')[1];

    // Select 4 nearby communes that exist
    const selectedCommunes = selectNearbyCommunes(currentCity, existingCities);

    if (selectedCommunes.length < 4) {
      console.log(`  Warning: Only ${selectedCommunes.length} communes available`);
    }

    // Generate new HTML for Communes Limitrophes section
    const communesHTML = selectedCommunes.map(commune => {
      const displayName = getCityDisplayName(commune);
      return `                        <div class="commune-item">
                            <a href="../${commune}/">
                                <strong>${displayName}</strong>
                                <span>34XXX</span>
                            </a>
                        </div>`;
    }).join('\n');

    // Find and replace the Communes Limitrophes section
    const communesRegex = /(Communes Limitrophes.*?<div class="cities-grid">)(.*?)(<\/div>)/s;
    const match = content.match(communesRegex);

    if (match) {
      const newSection = match[1] + '\n' + communesHTML + '\n                    ' + match[3];
      content = content.replace(communesRegex, newSection);

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  ✅ Updated with communes: ${selectedCommunes.join(', ')}`);
      totalFixed++;
    } else {
      console.log(`  ❌ Could not find Communes Limitrophes section`);
    }

  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Files processed: ${filesToFix.length}`);
console.log(`Files updated: ${totalFixed}`);
console.log('All communes now link to existing /secteur/ pages');