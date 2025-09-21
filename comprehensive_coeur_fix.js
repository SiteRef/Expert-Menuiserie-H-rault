const fs = require('fs');

// All files that need cÅ"ur → cœur fix
const filesToFix = [
  'secteur/saint-mathieu-de-treviers/index.html',
  'secteur/salasc/index.html',
  'secteur/villeneuve-les-maguelone/index.html',
  'secteur/vias/index.html',
  'secteur/vendargues/index.html',
  'secteur/servian/index.html',
  'secteur/valras-plage/index.html',
  'secteur/pezenas/index.html',
  'secteur/perols/index.html',
  'secteur/saint-jean-de-vedas/index.html',
  'secteur/saint-jean-de-fos/index.html',
  'secteur/saint-guilhem-le-desert/index.html',
  'secteur/pignan/index.html',
  'secteur/saint-andre-de-sangonis/index.html',
  'secteur/saint-felix-de-lodez/index.html',
  'secteur/peret/index.html',
  'secteur/meze/index.html',
  'secteur/paulhan/index.html',
  'secteur/palavas-les-flots/index.html',
  'secteur/le-pouget/index.html',
  'secteur/moureze/index.html',
  'secteur/lieuran-cabrieres/index.html',
  'secteur/le-cres/index.html',
  'secteur/marseillan/index.html',
  'secteur/lodeve/index.html',
  'secteur/lattes/index.html',
  'secteur/lunel/index.html',
  'secteur/jacou/index.html',
  'secteur/ganges/index.html',
  'secteur/gignac/index.html',
  'secteur/liausson/index.html'
];

console.log('=== COMPREHENSIVE CŒUR FIX ===');
console.log(`Processing ${filesToFix.length} files...`);

let totalFixed = 0;
let totalReplacements = 0;

filesToFix.forEach((file, index) => {
  console.log(`\n${index + 1}/${filesToFix.length}: ${file}`);

  try {
    let content = fs.readFileSync(file, 'utf8');

    // Count before
    const beforeCount = (content.match(/cÅ"ur/g) || []).length;

    if (beforeCount > 0) {
      // Fix the specific sequence
      content = content.replace(/cÅ"ur/g, 'cœur');

      // Save the file
      fs.writeFileSync(file, content, 'utf8');

      console.log(`  ✅ Fixed ${beforeCount} occurrences of "cÅ"ur" → "cœur"`);
      totalFixed++;
      totalReplacements += beforeCount;
    } else {
      console.log(`  ✅ No "cÅ"ur" found`);
    }

  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
});

console.log(`\n=== COMPREHENSIVE RESULTS ===`);
console.log(`Files processed: ${filesToFix.length}`);
console.log(`Files with fixes: ${totalFixed}`);
console.log(`Total replacements: ${totalReplacements}`);