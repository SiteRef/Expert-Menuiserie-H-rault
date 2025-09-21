const fs = require('fs');

const testFile = 'secteur/clermont-l-herault/index.html';

try {
  let content = fs.readFileSync(testFile, 'utf8');

  // Find lines containing "Menuisier" and "Clermont"
  const lines = content.split('\n');

  console.log('Searching for problematic lines...\n');

  lines.forEach((line, index) => {
    if (line.includes('Menuisier') && line.includes('Clermont')) {
      console.log(`Line ${index + 1}:`);
      console.log(`Content: ${line.trim()}`);

      // Show character codes for the suspicious part
      const chars = line.trim().split('');
      console.log('Character analysis:');
      chars.forEach((char, i) => {
        if (i > 0 && chars[i-1] === 'r' && i < chars.length - 5) {
          console.log(`  [${i}] "${char}" (code: ${char.charCodeAt(0)})`);
        }
      });
      console.log('---');
    }
  });

  // Also check for any line containing both words
  lines.forEach((line, index) => {
    if ((line.includes('Menuisier') || line.includes('description')) && line.includes('Clermont')) {
      console.log(`\nFound line ${index + 1}: ${line.trim()}`);

      // Look for the specific pattern around "à"
      const match = line.match(/Menuisier.*Clermont/);
      if (match) {
        console.log('Match found:', match[0]);
        // Show bytes around where "à" should be
        for (let i = 0; i < match[0].length; i++) {
          const char = match[0][i];
          console.log(`  "${char}" = ${char.charCodeAt(0)}`);
        }
      }
    }
  });

} catch (error) {
  console.log('Error:', error.message);
}