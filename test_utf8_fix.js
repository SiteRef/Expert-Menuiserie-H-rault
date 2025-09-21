const fs = require('fs');

// Test on the problematic file first
const testFile = 'secteur/clermont-l-herault/index.html';

console.log('Testing UTF-8 fix on:', testFile);

try {
  // Read file
  let content = fs.readFileSync(testFile, 'utf8');

  console.log('File size before:', content.length);

  // Show first few lines to verify content
  console.log('First 200 characters:');
  console.log(content.substring(0, 200));

  // Count problematic sequences
  let aaCount = (content.match(/Ã /g) || []).length;
  console.log('Found "Ã " sequences:', aaCount);

  // Apply fixes with logging
  let beforeContent = content;

  // Replace Ã  with à
  content = content.replace(/Ã /g, 'à');

  let afterCount = (content.match(/Ã /g) || []).length;
  console.log('Remaining "Ã " after fix:', afterCount);

  if (content !== beforeContent) {
    console.log('✅ Content was modified');

    // Show the change
    console.log('First 200 characters after fix:');
    console.log(content.substring(0, 200));

    // Save the file
    fs.writeFileSync(testFile, content, 'utf8');
    console.log('✅ File saved successfully');

  } else {
    console.log('❌ No changes were made to content');
  }

} catch (error) {
  console.log('❌ Error:', error.message);
}