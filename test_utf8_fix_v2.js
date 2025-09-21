const fs = require('fs');

// Test on the problematic file first
const testFile = 'secteur/clermont-l-herault/index.html';

console.log('Testing UTF-8 fix on:', testFile);

try {
  // Read file
  let content = fs.readFileSync(testFile, 'utf8');

  console.log('File size before:', content.length);

  // Count problematic sequences
  let aaCount = (content.match(/Ã /g) || []).length;
  console.log('Found "Ã " sequences:', aaCount);

  // Show examples of the problematic text
  console.log('\nProblematic text examples:');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('Ã ')) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    }
  });

  // Apply fixes with logging
  let beforeContent = content;

  // Replace Ã  with à
  content = content.replace(/Ã /g, 'à');

  let afterCount = (content.match(/Ã /g) || []).length;
  console.log('\nAfter replacement:');
  console.log('Remaining "Ã " after fix:', afterCount);

  if (content !== beforeContent) {
    console.log('✅ Content was modified');

    // Show the fixed examples
    console.log('\nFixed text examples:');
    const newLines = content.split('\n');
    lines.forEach((line, index) => {
      if (line.includes('Ã ')) {
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