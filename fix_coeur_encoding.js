const fs = require('fs');

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

console.log('=== FIXING Å" TO œ ISSUE ===');
console.log(`Processing ${filesToFix.length} files...`);

let totalFilesWithIssues = 0;
let totalReplacements = 0;

filesToFix.forEach((filePath, index) => {
  console.log(`\n${index + 1}/${filesToFix.length}: ${filePath}`);

  try {
    if (!fs.existsSync(filePath)) {
      console.log(`  FILE NOT FOUND - Skipping`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Count occurrences before fix
    const beforeCount = (content.match(/Å"/g) || []).length;

    if (beforeCount > 0) {
      // Apply the fix
      content = content.replace(/Å"/g, 'œ');

      // Verify fix was applied
      const afterCount = (content.match(/Å"/g) || []).length;

      // Save the file
      fs.writeFileSync(filePath, content, 'utf8');

      console.log(`  ✅ Fixed ${beforeCount} occurrences of "Å"" → "œ"`);
      totalFilesWithIssues++;
      totalReplacements += beforeCount;
    } else {
      console.log(`  ✅ No "Å"" sequences found`);
    }

  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
});

console.log('\n=== SUMMARY ===');
console.log(`Files processed: ${filesToFix.length}`);
console.log(`Files with issues fixed: ${totalFilesWithIssues}`);
console.log(`Total replacements made: ${totalReplacements}`);
console.log('All "CÅ"ur" should now display as "cœur"');