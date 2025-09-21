const fs = require('fs');

const allFiles = [
  'secteur/frontignan/index.html',
  'secteur/nebian/index.html',
  'secteur/octon/index.html'
];

console.log('=== FINAL CÅ"UR FIX ===');

allFiles.forEach((file, index) => {
  console.log(`\n${index + 1}/${allFiles.length}: ${file}`);

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
    } else {
      console.log(`  ✅ No "cÅ"ur" found`);
    }

  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
});

console.log('\n=== FINAL VERIFICATION ===');
console.log('Checking for any remaining issues...');

// Check a few files for verification
const testFiles = ['secteur/frontignan/index.html', 'secteur/nebian/index.html', 'secteur/octon/index.html'];

testFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    const hasCoeurIssue = content.includes('cÅ"ur');
    const hasProperCoeur = content.includes('cœur');

    console.log(`${file}:`);
    console.log(`  Has cÅ"ur issue: ${hasCoeurIssue ? '❌ YES' : '✅ NO'}`);
    console.log(`  Has proper cœur: ${hasProperCoeur ? '✅ YES' : '❌ NO'}`);

  } catch (error) {
    console.log(`  Error checking ${file}: ${error.message}`);
  }
});