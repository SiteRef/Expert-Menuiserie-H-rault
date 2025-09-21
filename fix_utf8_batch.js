const fs = require('fs');
const path = require('path');

// List of files to process
const filesToProcess = [
    'secteur/agde/index.html',
    'secteur/aniane/index.html',
    'secteur/aspiran/index.html',
    'secteur/balaruc-les-bains/index.html',
    'secteur/bedarieux/index.html',
    'secteur/beziers/index.html',
    'secteur/brignac/index.html',
    'secteur/cabrieres/index.html',
    'secteur/canet/index.html',
    'secteur/capestang/index.html',
    'secteur/carnon-plage/index.html',
    'secteur/castelnau-le-lez/index.html',
    'secteur/clapiers/index.html',
    'secteur/clermont-l-herault/index.html',
    'secteur/florensac/index.html',
    'secteur/frontignan/index.html',
    'secteur/gignac/index.html',
    'secteur/grabels/index.html',
    'secteur/jacou/index.html',
    'secteur/juvignac/index.html',
    'secteur/lattes/index.html',
    'secteur/lodeve/index.html',
    'secteur/lunel/index.html',
    'secteur/mauguio/index.html',
    'secteur/meze/index.html',
    'secteur/millau/index.html',
    'secteur/montpellier/index.html',
    'secteur/palavas-les-flots/index.html',
    'secteur/perols/index.html',
    'secteur/pezenas/index.html',
    'secteur/pignan/index.html',
    'secteur/saint-gely-du-fesc/index.html',
    'secteur/saint-jean-de-vedas/index.html',
    'secteur/sete/index.html',
    'secteur/vendargues/index.html',
    'secteur/villeneuve-les-maguelone/index.html'
];

// UTF-8 character mappings
const charMappings = [
    ['Ã ', 'à'],
    ['Ã©', 'é'],
    ['Ã¨', 'è'],
    ['Ãª', 'ê'],
    ['Ã´', 'ô'],
    ['Ã®', 'î'],
    ['Ã§', 'ç'],
    ['Ã¹', 'ù'],
    ['Ã»', 'û'],
    ['CÅ"ur', 'cœur'],
    ['Å"', 'œ'],
    ['À‰', 'É'],
    ['À€', 'À'],
    ['Ãˆ', 'È'],
    ['ClÃ´tures', 'Clôtures'],
    ['clÃ´tures', 'clôtures'],
    ['sÃ©curitÃ©', 'sécurité'],
    ['qualitÃ©', 'qualité'],
    ['rÃ©paration', 'réparation'],
    ['rÃ©novation', 'rénovation'],
    ['FenÃªtres', 'Fenêtres'],
    ['fenÃªtres', 'fenêtres'],
    ['PortaÃ®ls', 'Portails'],
    ['portaÃ®ls', 'portails'],
    ['Ã‰quipe', 'Équipe'],
    ['Ã©quipe', 'équipe'],
    ['expÃ©rience', 'expérience'],
    ['prÃ©cision', 'précision'],
    ['ðŸ"ž', '📞'],
    ['ðŸ"', '📍'],
    ['â˜…', '★'],
    ['â€¦', '…'],
    ['â€¹', '‹'],
    ['â€º', '›'],
    ['â‚¬', '€']
];

function fixUTF8Issues(content) {
    let fixedContent = content;

    charMappings.forEach(([wrongChar, correctChar]) => {
        fixedContent = fixedContent.replace(new RegExp(wrongChar, 'g'), correctChar);
    });

    return fixedContent;
}

function processFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return false;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const fixedContent = fixUTF8Issues(content);

        if (content !== fixedContent) {
            fs.writeFileSync(filePath, fixedContent, 'utf8');
            console.log(`✓ Fixed UTF-8 issues in: ${filePath}`);
            return true;
        } else {
            console.log(`✓ No UTF-8 issues found in: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Process all files
console.log('Starting UTF-8 batch correction...\n');

let processedCount = 0;
let fixedCount = 0;

filesToProcess.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    const wasFixed = processFile(fullPath);
    processedCount++;
    if (wasFixed) fixedCount++;
});

console.log(`\n=== UTF-8 Batch Correction Complete ===`);
console.log(`Files processed: ${processedCount}`);
console.log(`Files with fixes applied: ${fixedCount}`);
console.log(`Files already correct: ${processedCount - fixedCount}`);