/**
 * MASTER SITEMAP GENERATOR
 * Expert Menuiserie Hérault
 *
 * Usage: node generate-all-sitemaps.js
 *
 * This script generates BOTH sitemap.xml AND blog-sitemap.xml
 * Run this script every time you add ANY new page
 */

const { execSync } = require('child_process');

console.log('═══════════════════════════════════════');
console.log('  SITEMAP GENERATOR - Expert Menuiserie');
console.log('═══════════════════════════════════════\n');

try {
    // Generate main sitemap
    console.log('1️⃣  Generating main sitemap...\n');
    execSync('node generate-sitemap.js', { stdio: 'inherit' });

    console.log('\n─────────────────────────────────────\n');

    // Generate blog sitemap
    console.log('2️⃣  Generating blog sitemap...\n');
    execSync('node generate-blog-sitemap.js', { stdio: 'inherit' });

    console.log('\n═══════════════════════════════════════');
    console.log('✅ ALL SITEMAPS GENERATED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════\n');

    console.log('📌 Files created:');
    console.log('   ✓ sitemap.xml');
    console.log('   ✓ blog-sitemap.xml');

    console.log('\n🚀 Next steps:');
    console.log('   1. Test sitemaps locally:');
    console.log('      - Open: file://sitemap.xml');
    console.log('      - Open: file://blog-sitemap.xml');
    console.log('   ');
    console.log('   2. Deploy to production');
    console.log('   ');
    console.log('   3. Submit to search engines:');
    console.log('      - Google Search Console: https://search.google.com/search-console');
    console.log('      - Bing Webmaster: https://www.bing.com/webmasters');
    console.log('   ');
    console.log('   4. Verify online:');
    console.log('      - https://expert-menuiserie-herault.fr/sitemap.xml');
    console.log('      - https://expert-menuiserie-herault.fr/blog-sitemap.xml\n');

} catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
}
