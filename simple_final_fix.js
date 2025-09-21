const fs = require('fs');
const path = require('path');

console.log('=== SIMPLE FINAL UTF-8 FIX ===');

// List all sector files directly
const secteurDir = 'secteur';
const allDirs = fs.readdirSync(secteurDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => path.join(secteurDir, dirent.name, 'index.html'))
  .filter(filePath => fs.existsSync(filePath));

console.log(`Processing ${allDirs.length} sector files...`);

let totalFixed = 0;
let totalChanges = 0;

allDirs.forEach((file, index) => {
  console.log(`\n${index + 1}/${allDirs.length}: ${file}`);

  try {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    let fileChanges = 0;

    // Check if file has issues first
    const hasIssues = content.includes('cÅ"ur') || content.includes('Ã ');

    if (hasIssues) {
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
        ['Å"', 'œ']
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
        console.log(`  ✅ No changes needed after pattern checks`);
      }
    } else {
      console.log(`  ✅ No UTF-8 issues found`);
    }

  } catch (error) {
    console.log(`  ❌ ERROR: ${error.message}`);
  }
});

console.log(`\n=== FINAL RESULTS ===`);
console.log(`Files processed: ${allDirs.length}`);
console.log(`Files with fixes: ${totalFixed}`);
console.log(`Total replacements: ${totalChanges}`);

// Quick verification on a few key files
console.log('\n=== SPOT CHECK ===');
const testFiles = ['secteur/vias/index.html', 'secteur/villeneuve-les-maguelone/index.html'];

testFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const hasCoeurIssue = content.includes('cÅ"ur');
      const hasAIssue = content.includes('Ã ');

      console.log(`${file}:`);
      console.log(`  Has cÅ"ur issue: ${hasCoeurIssue ? '❌ YES' : '✅ NO'}`);
      console.log(`  Has Ã  issue: ${hasAIssue ? '❌ YES' : '✅ NO'}`);
    }
  } catch (error) {
    console.log(`  Error checking ${file}: ${error.message}`);
  }
});