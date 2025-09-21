const fs = require('fs');

// Test on the problematic file first
const testFile = 'secteur/clermont-l-herault/index.html';

console.log('Testing UTF-8 fix on:', testFile);

try {
  // Read file
  let content = fs.readFileSync(testFile, 'utf8');

  console.log('File size before:', content.length);

  // The actual problematic sequence is character 195 followed by character 160
  // This represents the malformed UTF-8 for "à"
  const problematicChar = String.fromCharCode(195) + String.fromCharCode(160);

  console.log('Searching for problematic character sequence...');
  console.log('Problematic char codes: 195, 160');

  // Count problematic sequences
  let problemCount = (content.match(new RegExp(problematicChar, 'g')) || []).length;
  console.log('Found problematic sequences:', problemCount);

  // Show examples of the problematic text
  console.log('\nProblematic text examples:');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes(problematicChar)) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    }
  });

  // Apply fixes with logging
  let beforeContent = content;

  // Replace the malformed UTF-8 sequence with correct "à"
  content = content.replace(new RegExp(problematicChar, 'g'), 'à');

  let afterCount = (content.match(new RegExp(problematicChar, 'g')) || []).length;
  console.log('\nAfter replacement:');
  console.log('Remaining problematic sequences:', afterCount);

  if (content !== beforeContent) {
    console.log('✅ Content was modified');

    // Show the fixed examples
    console.log('\nFixed text examples:');
    const newLines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes(problematicChar)) {
        console.log(`Line ${index + 1}: ${newLines[index].trim()}`);
      }
    });

    // Save the file
    fs.writeFileSync(testFile, content, 'utf8');
    console.log('✅ File saved successfully');

  } else {
    console.log('❌ No changes were made to content');
  }

} catch (error) {
  console.log('❌ Error:', error.message);
}