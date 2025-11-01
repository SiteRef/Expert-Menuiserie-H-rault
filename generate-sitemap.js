/**
 * AUTOMATIC SITEMAP GENERATOR
 * Expert Menuiserie Hérault
 *
 * Usage: node generate-sitemap.js
 *
 * This script automatically scans all pages and generates sitemap.xml
 * Run this script every time you add new pages (services, secteur, blog, etc.)
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://expert-menuiserie-herault.fr';
const OUTPUT_FILE = 'sitemap.xml';
const TODAY = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

// Priority configuration
const PRIORITIES = {
    homepage: 1.0,
    services: 0.9,
    secteurMain: 0.9,
    secteurTop: 0.9, // Top cities: Montpellier, Béziers, Sète
    secteurMedium: 0.8,
    secteurOther: 0.7,
    blog: 0.8,
    blogPost: 0.7,
    contact: 0.8,
    devis: 0.8,
    urgence: 0.9,
};

// Top priority cities
const TOP_CITIES = ['montpellier', 'beziers', 'sete'];
const MEDIUM_CITIES = ['lunel', 'frontignan', 'palavas-les-flots', 'lattes', 'castelnau-le-lez',
                       'mauguio', 'agde', 'pezenas', 'clermont-l-herault', 'lodeve',
                       'saint-jean-de-vedas', 'perols'];

/**
 * Scan a directory and return all subdirectories
 */
function getDirectories(dirPath) {
    if (!fs.existsSync(dirPath)) return [];

    return fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
}

/**
 * Check if a directory has an index.html file
 */
function hasIndexFile(dirPath) {
    return fs.existsSync(path.join(dirPath, 'index.html'));
}

/**
 * Get last modified date of index.html or use today's date
 */
function getLastModified(dirPath) {
    const indexPath = path.join(dirPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        const stats = fs.statSync(indexPath);
        return stats.mtime.toISOString().split('T')[0];
    }
    return TODAY;
}

/**
 * Determine priority for a secteur page
 */
function getSecteurPriority(slug) {
    if (TOP_CITIES.includes(slug)) return PRIORITIES.secteurTop;
    if (MEDIUM_CITIES.includes(slug)) return PRIORITIES.secteurMedium;
    return PRIORITIES.secteurOther;
}

/**
 * Generate URL entry for sitemap
 */
function createUrlEntry(loc, lastmod, changefreq, priority, comment = '') {
    const commentLine = comment ? `\n  <!-- ${comment} -->` : '';
    return `${commentLine}
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Main sitemap generation
 */
function generateSitemap() {
    console.log('🚀 Generating sitemap.xml...\n');

    let urls = [];

    // 1. HOMEPAGE
    console.log('✓ Adding homepage');
    urls.push(createUrlEntry(
        `${SITE_URL}/`,
        TODAY,
        'weekly',
        PRIORITIES.homepage,
        'Homepage'
    ));

    // 2. SERVICES
    console.log('✓ Scanning services...');
    const servicesDir = path.join(__dirname, 'services');
    const services = getDirectories(servicesDir);

    services.forEach(service => {
        const servicePath = path.join(servicesDir, service);
        if (hasIndexFile(servicePath)) {
            urls.push(createUrlEntry(
                `${SITE_URL}/services/${service}/`,
                getLastModified(servicePath),
                'monthly',
                PRIORITIES.services,
                `Service: ${service}`
            ));
        }
    });
    console.log(`  → ${services.length} service pages found`);

    // 3. SECTEURS
    console.log('✓ Scanning secteurs...');

    // Secteur main page
    const secteurMainPath = path.join(__dirname, 'secteur');
    if (hasIndexFile(secteurMainPath)) {
        urls.push(createUrlEntry(
            `${SITE_URL}/secteur/`,
            getLastModified(secteurMainPath),
            'weekly',
            PRIORITIES.secteurMain,
            'Secteurs Main Page'
        ));
    }

    // Individual secteur pages
    const secteurs = getDirectories(secteurMainPath);
    secteurs.forEach(secteur => {
        const secteurPath = path.join(secteurMainPath, secteur);
        if (hasIndexFile(secteurPath)) {
            urls.push(createUrlEntry(
                `${SITE_URL}/secteur/${secteur}/`,
                getLastModified(secteurPath),
                'monthly',
                getSecteurPriority(secteur),
                `Secteur: ${secteur}`
            ));
        }
    });
    console.log(`  → ${secteurs.length} secteur pages found`);

    // 4. BLOG
    console.log('✓ Scanning blog...');

    // Blog main page
    const blogMainPath = path.join(__dirname, 'blog');
    if (hasIndexFile(blogMainPath)) {
        urls.push(createUrlEntry(
            `${SITE_URL}/blog/`,
            getLastModified(blogMainPath),
            'weekly',
            PRIORITIES.blog,
            'Blog Main Page'
        ));
    }

    // Individual blog posts
    const blogPosts = getDirectories(blogMainPath).filter(name =>
        !['POST-TEMPLATE.html'].includes(name) && hasIndexFile(path.join(blogMainPath, name))
    );

    blogPosts.forEach(post => {
        const postPath = path.join(blogMainPath, post);
        urls.push(createUrlEntry(
            `${SITE_URL}/blog/${post}/`,
            getLastModified(postPath),
            'monthly',
            PRIORITIES.blogPost,
            `Blog: ${post}`
        ));
    });
    console.log(`  → ${blogPosts.length} blog posts found`);

    // 5. CONTACT & DEVIS
    console.log('✓ Adding contact & devis pages');

    const devisPath = path.join(__dirname, 'devis-gratuit');
    if (hasIndexFile(devisPath)) {
        urls.push(createUrlEntry(
            `${SITE_URL}/devis-gratuit/`,
            getLastModified(devisPath),
            'monthly',
            PRIORITIES.devis,
            'Devis Gratuit'
        ));
    }

    const contactPath = path.join(__dirname, 'contact');
    if (hasIndexFile(contactPath)) {
        urls.push(createUrlEntry(
            `${SITE_URL}/contact/`,
            getLastModified(contactPath),
            'monthly',
            PRIORITIES.contact,
            'Contact'
        ));
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}

  <!--
  ============================================
  SITEMAP AUTO-GENERATED
  ============================================
  Generated: ${TODAY}
  Total URLs: ${urls.length}

  To regenerate this sitemap, run:
  node generate-sitemap.js

  This will automatically scan all pages and update the sitemap.
  ============================================
  -->

</urlset>
`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

    console.log('\n✅ Sitemap generated successfully!');
    console.log(`📄 File: ${OUTPUT_FILE}`);
    console.log(`🔗 Total URLs: ${urls.length}`);
    console.log(`📅 Last updated: ${TODAY}`);
    console.log('\n📋 Summary:');
    console.log(`   - Homepage: 1`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Secteurs: ${secteurs.length + 1} (including main page)`);
    console.log(`   - Blog: ${blogPosts.length + 1} (including main page)`);
    console.log(`   - Contact/Devis: 2`);
    console.log('\n💡 Next steps:');
    console.log('   1. Submit sitemap to Google Search Console');
    console.log('   2. Submit sitemap to Bing Webmaster Tools');
    console.log(`   3. Verify at: ${SITE_URL}/sitemap.xml`);
}

// Run the generator
try {
    generateSitemap();
} catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
}
