# AI Documentation Implementation Checklist

Quick steps to implement AI-friendly documentation for SUI-JS.

## Phase 1: Immediate Actions (15 minutes)

### 1. Add Static Files ✅

Already created:
- [x] `website/static/ai.txt` - AI instruction file
- [x] `website/static/robots.txt` - Crawler permissions

### 2. Install Plugins

```bash
cd website
npm install --save-dev @docusaurus/plugin-sitemap
```

### 3. Update Docusaurus Config

Edit `website/docusaurus.config.js`:

```javascript
// Add to plugins array
plugins: [
  // ... existing typedoc plugin
  [
    '@docusaurus/plugin-sitemap',
    {
      changefreq: 'weekly',
      priority: 0.5,
      ignorePatterns: ['/tags/**'],
      filename: 'sitemap.xml',
    },
  ],
],

// Add to metadata in config root
metadata: [
  {name: 'keywords', content: 'typescript, framework, frontend, ui, components, material-design'},
  {name: 'description', content: 'SUI-JS - Lightweight frontend framework in TypeScript with 60+ UI components'},
  {name: 'og:type', content: 'website'},
  {name: 'robots', content: 'index, follow'},
],
```

### 4. Test

```bash
cd website
npm run build
npm run serve
```

Visit:
- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/ai.txt`
- `http://localhost:3000/robots.txt`

## Phase 2: Documentation Enhancement (2-4 hours)

### 1. Add Frontmatter to Key Pages

Priority pages (update these first):

```bash
website/docs/index.md
website/docs/modules.md
website/docs/classes/Application.md
website/docs/classes/Knot.md
website/docs/classes/Http.md
```

Example frontmatter:

```markdown
---
id: application
title: Application Class
sidebar_label: Application
description: Main application class for initializing and running the SUI-JS framework with routing and services
keywords:
  - application
  - initialization
  - configuration
  - routing
  - framework
tags:
  - core
  - required
  - getting-started
---
```

### 2. Create Getting Started Guide

Create `website/docs/getting-started.md`:

```markdown
---
id: getting-started
title: Getting Started with SUI-JS
sidebar_label: Getting Started
description: Complete guide to installing, configuring, and using SUI-JS framework
keywords: [installation, setup, tutorial, quickstart]
tags: [tutorial, beginner]
---

# Getting Started

[Follow template from DOCUMENTATION_TEMPLATE.md]
```

### 3. Create AI Index

Create `website/docs/ai-index.md` (content in AI_DOCUMENTATION_GUIDE.md)

### 4. Add Cross-References

Update top-10 most important classes to include:

```markdown
## Related Documentation

- [Getting Started](./getting-started.md)
- [Related Class Name](./RelatedClass.md)
- [API Reference](./modules.md)
```

## Phase 3: Content Optimization (Ongoing)

### For Each Class Documentation:

#### Checklist Per File:

- [ ] Frontmatter added (id, title, description, keywords, tags)
- [ ] Constructor documented with parameter table
- [ ] Methods documented with examples
- [ ] Quick example at top
- [ ] Complete example at bottom
- [ ] Related classes linked
- [ ] Type definitions included
- [ ] Common patterns shown
- [ ] Error cases documented

#### Priority Classes (Do These First):

1. Application
2. Knot
3. Http
4. Router
5. State
6. Form
7. TextField
8. Table
9. EventBus
10. Dialog

### Content Guidelines:

- **Always** include working code examples
- **Always** show expected output
- **Always** document parameters and return types
- **Always** link to related classes
- **Avoid** vague descriptions
- **Avoid** missing examples
- **Avoid** broken links

## Phase 4: Advanced Features (Optional)

### 1. Add Algolia DocSearch

```javascript
// In docusaurus.config.js themeConfig
algolia: {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indexName: 'sui-js',
  contextualSearch: true,
},
```

Apply at: https://docsearch.algolia.com/apply/

### 2. Add Mermaid Diagrams

```bash
npm install --save-dev @docusaurus/theme-mermaid
```

```javascript
// docusaurus.config.js
markdown: {
  mermaid: true,
},
themes: ['@docusaurus/theme-mermaid'],
```

### 3. Add Code Playground

```bash
npm install --save-dev @docusaurus/theme-live-codeblock
```

Enables interactive code examples.

## Measuring Success

### Analytics to Track:

1. **Page Views** - Which docs pages get most traffic
2. **Search Queries** - What users are looking for
3. **Bounce Rate** - If users find what they need
4. **Time on Page** - Engagement level

### AI-Specific Metrics:

1. **ai.txt Access** - How many AI systems read it
2. **Sitemap Crawls** - Search engine indexing
3. **API Docs Views** - Most popular classes
4. **Example Code Copies** - Usage patterns

### Testing with AI:

Test your docs by asking AI assistants:

```
"Show me how to initialize SUI-JS"
"Create a form with TextField using SUI-JS"
"How do I make HTTP requests in SUI-JS?"
"Explain the SUI-JS Router class"
```

If AI can answer accurately, your docs are working!

## Quick Commands

### Build Documentation

```bash
cd website
npm run build
```

### Development Server

```bash
cd website
npm start
```

### Deploy to GitHub Pages

```bash
cd website
npm run deploy
```

### Verify Sitemap

```bash
curl https://sui-js.siposdani87.com/sitemap.xml
```

### Verify AI.txt

```bash
curl https://sui-js.siposdani87.com/ai.txt
```

## Maintenance Schedule

### Weekly:
- Rebuild documentation after code changes
- Check for broken links
- Update version info

### Monthly:
- Review most-viewed pages
- Add examples for common questions
- Update keywords based on search queries

### Quarterly:
- Major documentation updates
- Add new tutorials
- Improve top 10 pages

## Common Issues

### Sitemap Not Generating

```bash
# Check plugin is installed
npm list @docusaurus/plugin-sitemap

# Check build output
npm run build -- --verbose
```

### Broken Links

```bash
# Check for broken links
npm run build
# Look for "Broken links found" in output
```

### AI.txt Not Accessible

Check `website/static/` directory exists and file is there.

## Resources

- [Full Guide](./AI_DOCUMENTATION_GUIDE.md)
- [Template](./website/DOCUMENTATION_TEMPLATE.md)
- [Docusaurus Docs](https://docusaurus.io/docs)

## Support

Issues with documentation:
- GitHub: https://github.com/siposdani87/sui-js/issues
- Email: siposdani87@gmail.com

---

## Quick Start (TL;DR)

```bash
# 1. Install plugin
cd website && npm install --save-dev @docusaurus/plugin-sitemap

# 2. Files already created:
# - website/static/ai.txt ✅
# - website/static/robots.txt ✅

# 3. Update docusaurus.config.js (see Phase 1 above)

# 4. Build and test
npm run build
npm run serve

# 5. Deploy
npm run deploy
```

That's it! Your documentation is now AI-optimized! 🎉
