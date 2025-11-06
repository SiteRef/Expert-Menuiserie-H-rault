const fs = require('fs');
const path = require('path');

// List of broken URL patterns to remove/fix
const brokenUrlPatterns = [
    'vendemian',
    'menuisier-urgence-weekend-herault',
    'serignan',
    'olonzac',
    'poussan',
    'roujan',
    'vendres',
    'grabels',
    'portiragnes',
    'saint-chinian',
    'saint-martin-de-londres',
    'depannage-volet-roulant-herault',
    'montarnaud',
    'bouzigues',
    'reparation-fenetre-urgence-herault',
    'clapiers',
    'baillargues',
    'reparation-menuiserie-urgence-herault',
    'saint-pons-de-thomieres',
    'saint-clement-de-riviere',
    'cournonterral',
    'saint-gely-du-fesc',
    'montpeyroux'
];

// Results tracking
const results = {
    filesModified: [],
    changes: [],
    otherBrokenLinks: new Set(),
    existingPages: new Set()
};

// Recursively find all HTML files
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Skip node_modules and hidden directories
            if (!file.startsWith('.') && file !== 'node_modules') {
                findHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html') || file.endsWith('.htm')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Build a map of existing pages
function buildExistingPagesMap(rootDir) {
    const htmlFiles = findHtmlFiles(rootDir);

    htmlFiles.forEach(filePath => {
        const relativePath = path.relative(rootDir, filePath)
            .replace(/\\/g, '/')
            .replace(/\/index\.html?$/, '/')
            .replace(/\.html?$/, '/');

        // Add various forms of the URL
        results.existingPages.add('/' + relativePath);
        results.existingPages.add('/' + relativePath.replace(/\/$/, ''));

        // Special case for index.html at root
        if (relativePath === 'index.html') {
            results.existingPages.add('/');
        }
    });
}

// Check if a URL is broken
function isBrokenUrl(href) {
    const normalized = href.trim();

    // Skip external URLs, anchors, mailto, tel, javascript
    if (normalized.startsWith('http://') ||
        normalized.startsWith('https://') ||
        normalized.startsWith('mailto:') ||
        normalized.startsWith('tel:') ||
        normalized.startsWith('#') ||
        normalized.startsWith('javascript:')) {
        return false;
    }

    // Extract the last segment of the path
    const segments = normalized.replace(/\/$/, '').split('/');
    const lastSegment = segments[segments.length - 1];

    // Check if the last segment matches any broken URL pattern
    return brokenUrlPatterns.some(pattern => {
        return lastSegment === pattern;
    });
}

// Extract text content from HTML, stripping tags
function extractTextContent(html) {
    // Remove HTML tags and decode HTML entities
    return html
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
}

// Process a single HTML file
function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    const fileChanges = [];

    // Find all <a> tags with href attributes (using dotAll flag for multiline)
    // The 's' flag makes . match newlines
    const linkRegex = /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/a>/gi;

    let newContent = content;
    const replacements = [];

    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const beforeHref = match[1];
        const href = match[2];
        const afterHref = match[3];
        const textContent = match[4];

        // Check if this is a broken link
        if (isBrokenUrl(href)) {
            // Extract clean text content
            const cleanText = extractTextContent(textContent);

            // Only replace if there's text content
            if (cleanText) {
                replacements.push({
                    original: fullMatch,
                    replacement: cleanText,
                    href: href,
                    text: cleanText
                });

                fileChanges.push({
                    before: fullMatch.substring(0, 100) + (fullMatch.length > 100 ? '...' : ''),
                    after: cleanText,
                    url: href
                });

                modified = true;
            }
        }
    }

    // Apply replacements
    if (replacements.length > 0) {
        // Sort by length descending to replace longer strings first
        replacements.sort((a, b) => b.original.length - a.original.length);

        replacements.forEach(repl => {
            newContent = newContent.split(repl.original).join(repl.replacement);
        });

        // Save the file
        fs.writeFileSync(filePath, newContent, 'utf-8');
        results.filesModified.push(filePath);
        results.changes.push({
            file: filePath,
            changes: fileChanges
        });
    }
}

// Main execution
function main() {
    const rootDir = path.join(__dirname);

    console.log('🔍 Building map of existing pages...');
    buildExistingPagesMap(rootDir);
    console.log(`   Found ${results.existingPages.size} existing page URLs\n`);

    console.log('🔍 Scanning HTML files for broken links...');
    const htmlFiles = findHtmlFiles(rootDir);
    console.log(`   Found ${htmlFiles.length} HTML files to scan\n`);

    console.log('🔧 Processing files...');

    // Process each file
    htmlFiles.forEach((filePath, idx) => {
        if (idx % 10 === 0) {
            process.stdout.write('.');
        }
        processHtmlFile(filePath);
    });

    console.log('\n');

    // Generate report
    console.log('='.repeat(80));
    console.log('📊 BROKEN LINKS CLEANUP REPORT');
    console.log('='.repeat(80) + '\n');

    if (results.filesModified.length === 0) {
        console.log('✅ No broken links found! All links are valid.\n');
    } else {
        console.log(`✅ Modified ${results.filesModified.length} files\n`);

        let totalChanges = 0;
        results.changes.forEach(fileChange => {
            totalChanges += fileChange.changes.length;
        });
        console.log(`📝 Total links removed/fixed: ${totalChanges}\n`);

        console.log('='.repeat(80));
        console.log('DETAILED CHANGES:');
        console.log('='.repeat(80) + '\n');

        results.changes.forEach(fileChange => {
            const relativePath = path.relative(rootDir, fileChange.file).replace(/\\/g, '/');
            console.log(`📄 ${relativePath}`);
            console.log('   ' + '-'.repeat(76));

            fileChange.changes.forEach((change, idx) => {
                console.log(`   Change ${idx + 1}:`);
                console.log(`   Broken URL: ${change.url}`);
                console.log(`   Before: ${change.before}`);
                console.log(`   After:  ${change.after}`);
                console.log('');
            });
        });
    }

    console.log('='.repeat(80));
    console.log('✅ Done!');
    console.log('='.repeat(80));
}

// Run the script
main();
