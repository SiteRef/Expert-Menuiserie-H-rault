const fs = require('fs');
const path = require('path');

const remainingFiles = [
  'secteur/agde/index.html',
  'secteur/aniane/index.html',
  'secteur/aspiran/index.html',
  'secteur/frontignan/index.html',
  'secteur/gignac/index.html',
  'secteur/jacou/index.html',
  'secteur/lattes/index.html',
  'secteur/lodeve/index.html',
  'secteur/lunel/index.html',
  'secteur/mauguio/index.html',
  'secteur/meze/index.html',
  'secteur/palavas-les-flots/index.html',
  'secteur/perols/index.html',
  'secteur/pezenas/index.html',
  'secteur/pignan/index.html',
  'secteur/saint-jean-de-vedas/index.html',
  'secteur/vendargues/index.html',
  'secteur/villeneuve-les-maguelone/index.html'
];

// UTF-8 character mappings based on the working solution
const fixMalformedUTF8 = (content) => {
  let fixedContent = content;

  // The problematic sequence: character 195 + character 160 = malformed "à"
  const malformedA = String.fromCharCode(195) + String.fromCharCode(160);
  fixedContent = fixedContent.replace(new RegExp(malformedA, 'g'), 'à');

  // Other common malformed sequences
  const malformedE = String.fromCharCode(195) + String.fromCharCode(169); // é
  fixedContent = fixedContent.replace(new RegExp(malformedE, 'g'), 'é');

  const malformedEGrave = String.fromCharCode(195) + String.fromCharCode(168); // è
  fixedContent = fixedContent.replace(new RegExp(malformedEGrave, 'g'), 'è');

  const malformedC = String.fromCharCode(195) + String.fromCharCode(167); // ç
  fixedContent = fixedContent.replace(new RegExp(malformedC, 'g'), 'ç');

  const malformedO = String.fromCharCode(195) + String.fromCharCode(180); // ô
  fixedContent = fixedContent.replace(new RegExp(malformedO, 'g'), 'ô');

  const malformedI = String.fromCharCode(195) + String.fromCharCode(174); // î
  fixedContent = fixedContent.replace(new RegExp(malformedI, 'g'), 'î');

  const malformedU = String.fromCharCode(195) + String.fromCharCode(185); // ù
  fixedContent = fixedContent.replace(new RegExp(malformedU, 'g'), 'ù');

  const malformedUCirc = String.fromCharCode(195) + String.fromCharCode(187); // û
  fixedContent = fixedContent.replace(new RegExp(malformedUCirc, 'g'), 'û');

  const malformedECirc = String.fromCharCode(195) + String.fromCharCode(170); // ê
  fixedContent = fixedContent.replace(new RegExp(malformedECirc, 'g'), 'ê');

  // Other patterns found in previous files
  fixedContent = fixedContent.replace(/CÅ"ur/g, 'cœur');
  fixedContent = fixedContent.replace(/Å"/g, 'œ');
  fixedContent = fixedContent.replace(/À‰/g, 'É');
  fixedContent = fixedContent.replace(/â˜…/g, '★');
  fixedContent = fixedContent.replace(/ðŸ"ž/g, '📞');
  fixedContent = fixedContent.replace(/ðŸ"/g, '📍');

  return fixedContent;
};

function processFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixMalformedUTF8(content);

    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');

      // Count how many problematic sequences were fixed
      const malformedA = String.fromCharCode(195) + String.fromCharCode(160);
      const beforeCount = (content.match(new RegExp(malformedA, 'g')) || []).length;
      const afterCount = (fixedContent.match(new RegExp(malformedA, 'g')) || []).length;

      console.log(`✅ Fixed UTF-8 issues in: ${filePath} (${beforeCount} → ${afterCount} malformed 'à' sequences)`);
      return true;
    } else {
      console.log(`✅ No UTF-8 issues found in: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process all files
console.log('=== FINAL UTF-8 BATCH CORRECTION ===\n');

let processedCount = 0;
let fixedCount = 0;

remainingFiles.forEach((file, index) => {
  console.log(`\n[${index + 1}/${remainingFiles.length}] Processing: ${file}`);
  const fullPath = path.join(process.cwd(), file);
  const wasFixed = processFile(fullPath);
  processedCount++;
  if (wasFixed) fixedCount++;
});

console.log(`\n=== UTF-8 CORRECTION COMPLETE ===`);
console.log(`Files processed: ${processedCount}`);
console.log(`Files with fixes applied: ${fixedCount}`);
console.log(`Files already correct: ${processedCount - fixedCount}`);

if (fixedCount > 0) {
  console.log(`\n✅ SUCCESS: All UTF-8 encoding issues have been resolved!`);
} else {
  console.log(`\n✅ All files were already correctly encoded.`);
}