const fs = require('fs');
const path = require('path');

// List of broken URLs to remove from sitemap
const brokenUrls = [
    '/secteur/vendemian/',
    '/urgence/menuisier-urgence-weekend-herault/',
    '/secteur/serignan/',
    '/secteur/olonzac/',
    '/secteur/poussan/',
    '/secteur/roujan/',
    '/secteur/vendres/',
    '/secteur/grabels/',
    '/secteur/portiragnes/',
    '/secteur/saint-chinian/',
    '/secteur/saint-martin-de-londres/',
    '/urgence/depannage-volet-roulant-herault/',
    '/secteur/montarnaud/',
    '/secteur/bouzigues/',
    '/urgence/reparation-fenetre-urgence-herault/',
    '/secteur/clapiers/',
    '/secteur/baillargues/',
    '/urgence/reparation-menuiserie-urgence-herault/',
    '/secteur/saint-pons-de-thomieres/',
    '/secteur/saint-clement-de-riviere/',
    '/secteur/cournonterral/',
    '/secteur/saint-gely-du-fesc/',
    '/secteur/montpeyroux/'
];

// Normalize URLs (with and without trailing slash, with domain)
const normalizedBrokenUrls = new Set();
brokenUrls.forEach(url => {
    normalizedBrokenUrls.add(url);
    normalizedBrokenUrls.add(url.replace(/\/$/, '')); // without trailing slash
    normalizedBrokenUrls.add('https://expert-menuiserie-herault.fr' + url); // with domain
    normalizedBrokenUrls.add('https://expert-menuiserie-herault.fr' + url.replace(/\/$/, '')); // with domain, no trailing slash
});

// Track results
const results = {
    sitemapFiles: [],
    filesModified: [],
    urlsRemoved: [],
    urlsNotFound: [],
    totalUrlsRemoved: 0
};

// Find all sitemap files
function findSitemapFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Skip node_modules and hidden directories
            if (!file.startsWith('.') && file !== 'node_modules') {
                findSitemapFiles(filePath);
            }
        } else if (file.match(/^sitemap.*\.xml$/i)) {
            results.sitemapFiles.push(filePath);
        }
    });
}

// Check if a URL is in the broken list
function isBrokenUrl(url) {
    const normalized = url.trim();
    return normalizedBrokenUrls.has(normalized);
}

// Extract URL from <loc> tag
function extractUrl(locTag) {
    const match = locTag.match(/<loc>(.*?)<\/loc>/);
    return match ? match[1] : null;
}

// Process a sitemap file
function processSitemapFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let modified = false;
    const removedUrls = [];
    const newLines = [];
    let insideUrlBlock = false;
    let currentUrlBlock = [];
    let currentUrl = null;
    let skipBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if we're entering a <url> block
        if (line.trim().startsWith('<url>')) {
            insideUrlBlock = true;
            currentUrlBlock = [line];
            currentUrl = null;
            skipBlock = false;
            continue;
        }

        // Check if we're inside a <url> block
        if (insideUrlBlock) {
            currentUrlBlock.push(line);

            // Extract URL from <loc> tag
            if (line.includes('<loc>')) {
                currentUrl = extractUrl(line);
                if (currentUrl && isBrokenUrl(currentUrl)) {
                    skipBlock = true;
                    removedUrls.push(currentUrl);
                    modified = true;
                }
            }

            // Check if we're closing the <url> block
            if (line.trim().startsWith('</url>')) {
                insideUrlBlock = false;

                // If not skipping this block, add it to new lines
                if (!skipBlock) {
                    newLines.push(...currentUrlBlock);
                }

                currentUrlBlock = [];
                currentUrl = null;
                skipBlock = false;
                continue;
            }

            continue;
        }

        // Regular line (not in url block)
        newLines.push(line);
    }

    // Save file if modified
    if (modified) {
        const newContent = newLines.join('\n');
        fs.writeFileSync(filePath, newContent, 'utf-8');

        results.filesModified.push(filePath);
        results.urlsRemoved.push({
            file: filePath,
            urls: removedUrls
        });
        results.totalUrlsRemoved += removedUrls.length;

        return { modified: true, removedUrls };
    }

    return { modified: false, removedUrls: [] };
}

// Validate XML
function validateXml(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        // Basic XML validation checks
        const checks = {
            hasXmlDeclaration: content.includes('<?xml'),
            hasUrlsetOpen: content.includes('<urlset'),
            hasUrlsetClose: content.includes('</urlset>'),
            balancedUrlTags: (content.match(/<url>/g) || []).length === (content.match(/<\/url>/g) || []).length,
            balancedLocTags: (content.match(/<loc>/g) || []).length === (content.match(/<\/loc>/g) || []).length
        };

        const isValid = Object.values(checks).every(check => check === true);

        return {
            isValid,
            checks
        };
    } catch (error) {
        return {
            isValid: false,
            error: error.message
        };
    }
}

// Main execution
function main() {
    const rootDir = path.join(__dirname);

    console.log('🔍 Scanning for sitemap files...\n');
    findSitemapFiles(rootDir);

    console.log(`Found ${results.sitemapFiles.length} sitemap file(s):\n`);
    results.sitemapFiles.forEach(file => {
        const relativePath = path.relative(rootDir, file);
        console.log(`   📄 ${relativePath}`);
    });

    console.log('\n🔧 Processing sitemap files...\n');

    // Process each sitemap
    results.sitemapFiles.forEach(filePath => {
        const result = processSitemapFile(filePath);

        if (result.modified) {
            console.log(`✅ Modified: ${path.relative(rootDir, filePath)}`);
            console.log(`   Removed ${result.removedUrls.length} URL(s)\n`);
        }
    });

    // Generate report
    console.log('='.repeat(80));
    console.log('📊 SITEMAP CLEANUP REPORT');
    console.log('='.repeat(80) + '\n');

    console.log(`📁 Total sitemap files found: ${results.sitemapFiles.length}`);
    console.log(`✏️  Sitemap files modified: ${results.filesModified.length}`);
    console.log(`🗑️  Total URL entries removed: ${results.totalUrlsRemoved}\n`);

    if (results.filesModified.length === 0) {
        console.log('✅ No broken URLs found in any sitemap!\n');
        console.log('All sitemaps are clean and only contain valid URLs.\n');
    } else {
        console.log('='.repeat(80));
        console.log('DETAILED CHANGES:');
        console.log('='.repeat(80) + '\n');

        results.urlsRemoved.forEach(item => {
            const relativePath = path.relative(rootDir, item.file);
            console.log(`📄 ${relativePath}`);
            console.log('   ' + '-'.repeat(76));
            console.log(`   Removed ${item.urls.length} URL(s):\n`);

            item.urls.forEach((url, idx) => {
                console.log(`   ${idx + 1}. ${url}`);
            });
            console.log('');
        });

        // Validate XML after changes
        console.log('='.repeat(80));
        console.log('XML VALIDATION:');
        console.log('='.repeat(80) + '\n');

        results.filesModified.forEach(filePath => {
            const relativePath = path.relative(rootDir, filePath);
            const validation = validateXml(filePath);

            if (validation.isValid) {
                console.log(`✅ ${relativePath} - Valid XML`);
            } else {
                console.log(`❌ ${relativePath} - Invalid XML`);
                console.log(`   Checks:`, validation.checks || validation.error);
            }
        });
        console.log('');
    }

    // Check which URLs were not found
    const allRemovedUrls = new Set();
    results.urlsRemoved.forEach(item => {
        item.urls.forEach(url => allRemovedUrls.add(url));
    });

    const urlsNotFound = [];
    brokenUrls.forEach(url => {
        const withDomain = 'https://expert-menuiserie-herault.fr' + url;
        if (!allRemovedUrls.has(url) && !allRemovedUrls.has(withDomain)) {
            urlsNotFound.push(url);
        }
    });

    if (urlsNotFound.length > 0) {
        console.log('='.repeat(80));
        console.log('ℹ️  URLs NOT FOUND IN ANY SITEMAP:');
        console.log('='.repeat(80) + '\n');
        console.log('The following URLs were not present in any sitemap file:\n');

        urlsNotFound.forEach((url, idx) => {
            console.log(`   ${idx + 1}. ${url}`);
        });
        console.log('\n(These URLs were already not in the sitemap)\n');
    }

    console.log('='.repeat(80));
    console.log('✅ Done!');
    console.log('='.repeat(80));
}

// Run the script
main();
