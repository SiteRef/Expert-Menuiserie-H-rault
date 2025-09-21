const fs = require('fs');
const path = require('path');

console.log('=== SCANNING EXISTING SECTOR PAGES ===');

// Get all directories in /secteur/
const secteurPath = 'secteur';
const existingCities = [];

try {
  const directories = fs.readdirSync(secteurPath, { withFileTypes: true });

  directories.forEach(dir => {
    if (dir.isDirectory()) {
      const indexPath = path.join(secteurPath, dir.name, 'index.html');
      if (fs.existsSync(indexPath)) {
        existingCities.push(dir.name);
      }
    }
  });

  console.log('Found existing sector pages:');
  existingCities.sort().forEach(city => {
    console.log(`  - ${city}`);
  });

  console.log(`\nTotal: ${existingCities.length} existing sector pages`);

  // Save to file for next step
  fs.writeFileSync('existing_cities.json', JSON.stringify(existingCities, null, 2));

} catch (error) {
  console.log('Error scanning directories:', error.message);
}