/**
 * AUTOMATIC BLOG SITEMAP GENERATOR
 * Expert Menuiserie Hérault
 *
 * Usage: node generate-blog-sitemap.js
 *
 * This script automatically scans blog posts and generates blog-sitemap.xml
 * Run this script every time you add new blog posts
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://expert-menuiserie-herault.fr';
const OUTPUT_FILE = 'blog-sitemap.xml';
const TODAY = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

/**
 * Get all blog post directories
 */
function getBlogPosts() {
    const blogDir = path.join(__dirname, 'blog');
    if (!fs.existsSync(blogDir)) return [];

    return fs.readdirSync(blogDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .filter(dirent => dirent.name !== 'POST-TEMPLATE') // Exclude template
        .map(dirent => dirent.name);
}

/**
 * Get last modified date of blog post
 */
function getLastModified(postDir) {
    const indexPath = path.join(__dirname, 'blog', postDir, 'index.html');
    if (fs.existsSync(indexPath)) {
        const stats = fs.statSync(indexPath);
        return stats.mtime.toISOString().split('T')[0];
    }
    return TODAY;
}

/**
 * Get blog post title from blogs.json
 */
function getBlogPostTitle(slug) {
    try {
        const blogsJsonPath = path.join(__dirname, 'data', 'blogs.json');
        const blogsData = JSON.parse(fs.readFileSync(blogsJsonPath, 'utf8'));
        const post = blogsData.posts.find(p => p.slug === slug);
        return post ? post.title : slug;
    } catch (error) {
        return slug;
    }
}

/**
 * Generate URL entry for sitemap
 */
function createUrlEntry(loc, lastmod, changefreq, priority, comment = '') {
    const commentLine = comment ? `\n    <!-- ${comment} -->` : '';
    return `${commentLine}
    <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

/**
 * Main blog sitemap generation
 */
function generateBlogSitemap() {
    console.log('📝 Generating blog-sitemap.xml...\n');

    let urls = [];

    // 1. Blog Main Page
    console.log('✓ Adding blog main page');
    const blogMainPath = path.join(__dirname, 'blog', 'index.html');
    const blogMainLastMod = fs.existsSync(blogMainPath)
        ? fs.statSync(blogMainPath).mtime.toISOString().split('T')[0]
        : TODAY;

    urls.push(createUrlEntry(
        `${SITE_URL}/blog/`,
        blogMainLastMod,
        'weekly',
        0.8,
        'Blog Main Page'
    ));

    // 2. Blog Posts
    console.log('✓ Scanning blog posts...');
    const posts = getBlogPosts();

    posts.forEach(post => {
        const title = getBlogPostTitle(post);
        urls.push(createUrlEntry(
            `${SITE_URL}/blog/${post}/`,
            getLastModified(post),
            'monthly',
            0.7,
            `Blog Post: ${title}`
        ));
    });

    console.log(`  → ${posts.length} blog posts found`);

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}

    <!--
    ========================================
    INSTRUCTIONS POUR AJOUTER DE NOUVEAUX ARTICLES
    ========================================

    Ce sitemap est généré automatiquement. Pour mettre à jour :

    1. Ajoutez votre nouvel article dans /blog/[slug]/index.html
    2. Ajoutez l'entrée dans /data/blogs.json
    3. Exécutez : node generate-blog-sitemap.js
    4. Le sitemap sera automatiquement régénéré !

    OU utilisez le script complet :
    node generate-all-sitemaps.js

    ========================================
    Auto-generated: ${TODAY}
    Total blog posts: ${posts.length}
    ========================================
    -->

</urlset>
`;

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

    console.log('\n✅ Blog sitemap generated successfully!');
    console.log(`📄 File: ${OUTPUT_FILE}`);
    console.log(`🔗 Total URLs: ${urls.length}`);
    console.log(`📅 Last updated: ${TODAY}`);
    console.log('\n📋 Blog posts included:');
    posts.forEach((post, i) => {
        const title = getBlogPostTitle(post);
        console.log(`   ${i + 1}. ${title}`);
    });
}

// Run the generator
try {
    generateBlogSitemap();
} catch (error) {
    console.error('❌ Error generating blog sitemap:', error.message);
    process.exit(1);
}
