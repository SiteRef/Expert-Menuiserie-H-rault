const fs = require('fs');

// Files that definitely have issues based on your examples
const problemFiles = [
  'secteur/frontignan/index.html',
  'secteur/nebian/index.html',
  'secteur/octon/index.html',
  'secteur/clermont-l-herault/index.html',
  'secteur/florensac/index.html',
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

console.log('=== DIRECT UTF-8 FIX ===');

let totalFixed = 0;
let totalChanges = 0;

problemFiles.forEach((file, index) => {
  console.log(`\n${index + 1}/${problemFiles.length}: ${file}`);

  try {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let fileChanges = 0;

    // Your exact examples that need fixing
    const fixes = [
      ['cÅ"ur', 'cœur'],           // "au cÅ"ur du" → "au cœur du"
      ['Ã‰carts', 'Écarts'],      // "Ã‰carts" → "Écarts"
      ['Ã ', 'à'],                // "Ã  Frontignan" → "à Frontignan"
      ['Ã©', 'é'],
      ['Ã¨', 'è'],
      ['Ã§', 'ç'],
      ['Ã´', 'ô'],
      ['À‰', 'É'],
      ['Å"', 'œ']
    ];

    // Apply each fix
    fixes.forEach(([wrong, right]) => {
      let matches = content.match(new RegExp(wrong, 'g'));
      if (matches) {
        content = content.replace(new RegExp(wrong, 'g'), right);
        console.log(`  Fixed ${matches.length}x: "${wrong}" → "${right}"`);
        fileChanges += matches.length;
      }
    });

    if (fileChanges > 0) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`  ✅ SAVED ${fileChanges} changes`);
      totalFixed++;
      totalChanges += fileChanges;
    } else {
      console.log(`  ✅ No issues found`);
    }

  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
});

console.log(`\n=== RESULTS ===`);
console.log(`Files processed: ${problemFiles.length}`);
console.log(`Files with fixes: ${totalFixed}`);
console.log(`Total replacements: ${totalChanges}`);

// Verification
console.log('\n=== VERIFICATION ===');
try {
  let testContent = fs.readFileSync('secteur/frontignan/index.html', 'utf8');

  if (testContent.includes('cÅ"ur')) {
    console.log('❌ STILL HAS ISSUES: Found "cÅ"ur"');
  } else if (testContent.includes('cœur')) {
    console.log('✅ SUCCESS: Found "cœur" correctly');
  }

  if (testContent.includes('Ã ')) {
    console.log('❌ STILL HAS ISSUES: Found "Ã "');
  } else {
    console.log('✅ SUCCESS: No "Ã " found');
  }

} catch (error) {
  console.log('Verification error:', error.message);
}