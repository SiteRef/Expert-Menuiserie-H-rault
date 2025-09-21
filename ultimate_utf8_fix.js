const fs = require('fs');
const { execSync } = require('child_process');

console.log('=== ULTIMATE UTF-8 FIX ===');

// Get all files that need fixing
const filesWithIssues = execSync('cd "C:\\Users\\cedri\\Desktop\\menuiserie site" && rg -l "cÅ|Ã " secteur/*/index.html', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(file => file.length > 0);

console.log(`Found ${filesWithIssues.length} files with UTF-8 issues to fix:`);
filesWithIssues.forEach(file => console.log(`  - ${file}`));

let totalFixed = 0;
let totalChanges = 0;

filesWithIssues.forEach((file, index) => {
  console.log(`\n${index + 1}/${filesWithIssues.length}: ${file}`);

  try {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let fileChanges = 0;

    // Apply all UTF-8 fixes
    const fixes = [
      ['cÅ"ur', 'cœur'],
      ['Ã ', 'à'],
      ['Ã©', 'é'],
      ['Ã¨', 'è'],
      ['Ã§', 'ç'],
      ['Ã´', 'ô'],
      ['Ã®', 'î'],
      ['Ã»', 'û'],
      ['Ã¹', 'ù'],
      ['Ãª', 'ê'],
      ['À‰', 'É'],
      ['À€', 'À'],
      ['Ãˆ', 'È'],
      ['Å"', 'œ'],
      ['Ã‰carts', 'Écarts']
    ];

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

console.log(`\n=== ULTIMATE RESULTS ===`);
console.log(`Files processed: ${filesWithIssues.length}`);
console.log(`Files with fixes: ${totalFixed}`);
console.log(`Total replacements: ${totalChanges}`);

// Final verification
console.log('\n=== FINAL VERIFICATION ===');
try {
  const remainingIssues = execSync('cd "C:\\Users\\cedri\\Desktop\\menuiserie site" && rg -c "cÅ|Ã " secteur/*/index.html | wc -l', { encoding: 'utf8' }).trim();

  if (remainingIssues === '0') {
    console.log('✅ SUCCESS: All UTF-8 encoding issues have been resolved!');
  } else {
    console.log(`❌ ${remainingIssues} files still have UTF-8 issues`);
  }
} catch (error) {
  console.log('Verification completed - check manually for any remaining issues');
}