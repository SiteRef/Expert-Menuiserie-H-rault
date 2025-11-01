# 🗺️ SITEMAP AUTO-GENERATION GUIDE
## Expert Menuiserie Hérault

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [When to Run Scripts](#when-to-run-scripts)
4. [Script Descriptions](#script-descriptions)
5. [Workflow Examples](#workflow-examples)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This system **automatically generates sitemaps** for your entire website. You never have to manually edit sitemap XML files again!

### What Gets Included Automatically:
- ✅ All service pages (`/services/`)
- ✅ All secteur pages (`/secteur/`)
- ✅ All blog posts (`/blog/`)
- ✅ Contact & devis pages
- ✅ Homepage

---

## ⚡ Quick Start

### **Option 1: Generate ALL Sitemaps (Recommended)**
```bash
node generate-all-sitemaps.js
```
This generates both `sitemap.xml` AND `blog-sitemap.xml` in one command.

### **Option 2: Generate Specific Sitemaps**

**Main sitemap only:**
```bash
node generate-sitemap.js
```

**Blog sitemap only:**
```bash
node generate-blog-sitemap.js
```

---

## 🕐 When to Run Scripts

### **Run `node generate-all-sitemaps.js` when you:**

✅ Add a **new blog post**
✅ Add a **new service page**
✅ Add a **new secteur page**
✅ Update any major page content
✅ Once a month for good measure

### **Don't run after:**
❌ Minor text edits
❌ Image changes
❌ CSS/styling updates

---

## 📜 Script Descriptions

### 1. `generate-sitemap.js`
**Generates:** `sitemap.xml` (main site sitemap)

**Scans:**
- All pages in `/services/` directory
- All pages in `/secteur/` directory
- All pages in `/blog/` directory
- `/contact/`, `/devis-gratuit/` pages
- Homepage

**Features:**
- Automatically calculates priority based on page type
- Uses file modification dates for `<lastmod>` tags
- Assigns appropriate `changefreq` values

### 2. `generate-blog-sitemap.js`
**Generates:** `blog-sitemap.xml` (blog-specific sitemap)

**Scans:**
- All blog posts in `/blog/` directory
- Reads titles from `/data/blogs.json`

**Features:**
- Gets blog post titles automatically
- Excludes POST-TEMPLATE
- Calculates last modified dates

### 3. `generate-all-sitemaps.js` ⭐ **RECOMMENDED**
**Generates:** Both `sitemap.xml` AND `blog-sitemap.xml`

**What it does:**
- Runs both scripts above in sequence
- Provides comprehensive summary
- Shows next steps

---

## 🔄 Workflow Examples

### **Adding a New Blog Post**

1. Create your blog post:
   ```
   /blog/my-new-article/index.html
   ```

2. Add to blogs.json:
   ```json
   {
     "slug": "my-new-article",
     "title": "My New Article Title",
     ...
   }
   ```

3. **Generate sitemaps:**
   ```bash
   node generate-all-sitemaps.js
   ```

4. Deploy to production

5. Submit to Google Search Console (optional)

✅ **Done!** Your new post is now in the sitemap.

---

### **Adding a New Service Page**

1. Create your service page:
   ```
   /services/new-service/index.html
   ```

2. **Generate sitemaps:**
   ```bash
   node generate-all-sitemaps.js
   ```

3. Deploy to production

✅ **Done!** Your new service is now in the sitemap.

---

### **Adding a New Secteur Page**

1. Create your secteur page:
   ```
   /secteur/new-city/index.html
   ```

2. **Generate sitemaps:**
   ```bash
   node generate-all-sitemaps.js
   ```

3. Deploy to production

✅ **Done!** Your new city page is now in the sitemap.

---

## 🎨 Priority System

The scripts automatically assign priorities based on page type:

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | weekly |
| Services | 0.9 | monthly |
| Secteur Main | 0.9 | weekly |
| Top Cities* | 0.9 | monthly |
| Medium Cities** | 0.8 | monthly |
| Other Cities | 0.7 | monthly |
| Blog Index | 0.8 | weekly |
| Blog Posts | 0.7 | monthly |
| Contact/Devis | 0.8 | monthly |

**Top Cities:* Montpellier, Béziers, Sète
**Medium Cities:* Lunel, Frontignan, Palavas, Lattes, Agde, etc.

---

## 🔧 Troubleshooting

### **Issue: "command not found: node"**
**Solution:** Node.js is not installed or not in PATH.
- Install Node.js from: https://nodejs.org/
- Restart your terminal after installation

### **Issue: "Cannot find module"**
**Solution:** Make sure you're in the correct directory.
```bash
cd "C:/Users/cedri/Desktop/menuiserie site"
node generate-all-sitemaps.js
```

### **Issue: "Permission denied"**
**Solution:** Run with appropriate permissions or check file ownership.

### **Issue: Sitemap shows old dates**
**Solution:** This is normal! The scripts use file modification dates. If you want to update a date:
1. Make a small edit to the file
2. Save it
3. Re-run the sitemap generator

---

## 📊 Verification

### **Check Generated Sitemaps**

After generating, verify your sitemaps:

**1. Open in browser (locally):**
```
file:///C:/Users/cedri/Desktop/menuiserie site/sitemap.xml
file:///C:/Users/cedri/Desktop/menuiserie site/blog-sitemap.xml
```

**2. Validate XML syntax:**
```bash
# On Windows with Git Bash:
cat sitemap.xml | head -20
cat blog-sitemap.xml | head -20
```

**3. Check online (after deployment):**
```
https://expert-menuiserie-herault.fr/sitemap.xml
https://expert-menuiserie-herault.fr/blog-sitemap.xml
```

**4. Validate with Google:**
- Go to: https://search.google.com/search-console
- Add property if not already added
- Go to "Sitemaps" section
- Submit sitemap URLs
- Check for errors

---

## 🚀 Submit to Search Engines

### **Google Search Console**

1. Go to: https://search.google.com/search-console
2. Select your property
3. Click "Sitemaps" in left menu
4. Enter sitemap URL: `https://expert-menuiserie-herault.fr/sitemap.xml`
5. Click "Submit"
6. Repeat for: `https://expert-menuiserie-herault.fr/blog-sitemap.xml`

### **Bing Webmaster Tools**

1. Go to: https://www.bing.com/webmasters
2. Add your site if not already added
3. Go to "Sitemaps" section
4. Submit both sitemap URLs

---

## 📈 Best Practices

### **DO:**
✅ Run sitemap generator after adding new pages
✅ Submit updated sitemaps to search engines monthly
✅ Check Google Search Console for sitemap errors
✅ Keep sitemaps under 50,000 URLs (you're nowhere close!)

### **DON'T:**
❌ Manually edit generated sitemap files
❌ Include pages that don't exist
❌ Include pages with noindex meta tags
❌ Forget to deploy sitemaps to production

---

## 📝 Files Overview

```
menuiserie-site/
├── sitemap.xml                    # Main sitemap (auto-generated)
├── blog-sitemap.xml              # Blog sitemap (auto-generated)
├── generate-sitemap.js           # Main sitemap generator script
├── generate-blog-sitemap.js      # Blog sitemap generator script
├── generate-all-sitemaps.js      # Master script (runs both)
└── SITEMAP-README.md             # This file
```

---

## 🆘 Support

**If you encounter issues:**

1. Check this README first
2. Verify Node.js is installed: `node --version`
3. Check you're in the correct directory
4. Try running each script individually to isolate the problem

**Common questions:**

**Q: How often should I regenerate sitemaps?**
A: Every time you add new pages, or monthly for updates.

**Q: Do I need to submit sitemaps every time?**
A: No. Google will re-crawl automatically. Submit only after major changes.

**Q: Can I edit the priority/changefreq values?**
A: Yes! Edit the scripts' `PRIORITIES` object to customize values.

**Q: What if I want to exclude a page?**
A: The scripts only include pages with `index.html` files. To exclude, add logic to the filter functions in the scripts.

---

## ✅ Quick Reference Card

```bash
# Generate everything
node generate-all-sitemaps.js

# Check Node version
node --version

# View generated sitemap
cat sitemap.xml | head -30

# Count URLs in sitemap
grep -c "<loc>" sitemap.xml

# Deploy (upload sitemap.xml and blog-sitemap.xml to server)
```

---

**Last Updated:** 2025-11-01
**Author:** Expert Menuiserie Hérault
**Scripts Version:** 1.0
