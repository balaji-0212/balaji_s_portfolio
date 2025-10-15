# Portfolio Website - AI Coding Agent Instructions

## Project Overview
This is a **static portfolio website** for a Data Analyst/Electronics Engineer built with vanilla HTML5, CSS3, and JavaScript. No build system, no framework - just semantic HTML, custom CSS (~3400 lines), and vanilla JS with animation libraries.

## Architecture & Core Principles

### Structure Pattern
- **6 standalone HTML pages** (`index.html`, `about.html`, `resume.html`, `certificates.html`, `projects.html`, `contact.html`)
- **Shared header/footer** duplicated across all pages (no templating system)
- **Single CSS file**: `assets/css/styles.css` (3,381 lines) with CSS custom properties
- **Single JS file**: `assets/js/scripts.js` (287 lines)
- **Project data**: Can be loaded from `data/projects.json` OR hardcoded in HTML (currently hardcoded)

### Color System
Use CSS variables defined in `:root`:
- Primary accent: `--accent-primary: #007BFF` (blue)
- Secondary accent: `--accent-secondary: #00D4FF` (cyan)
- Gold accent: `--accent-gold: #FFC700` (for highlights)
- Background: `--bg-primary: #0a0f1f` (dark theme)
- Text: `--text-primary: #ffffff`, `--text-secondary: #b0b3b8`

### Animation Stack
- **AOS (Animate On Scroll)**: For scroll-triggered animations (`data-aos` attributes on HTML elements)
- **GSAP**: Currently disabled in scripts.js (line 77 comment: "GSAP animations temporarily disabled for debugging")
- **Note**: GSAP animations have caused layout issues - avoid re-enabling without testing

## Critical Workflows

### Local Development
```bash
# Start local server (REQUIRED - can't open HTML files directly due to CORS)
python -m http.server 8000

# Test URLs
http://localhost:8000/index.html
http://localhost:8000/projects.html
# etc.
```

### Testing Checklist
See `TESTING_GUIDE.md` for comprehensive tests. Key checks:
1. Clear browser cache with `Ctrl+Shift+R` or use incognito mode
2. Verify responsive layouts at 375px (mobile), 900px (tablet), 1024px+ (desktop)
3. Test certificate filtering/lightbox on `certificates.html`
4. Verify exactly 5 projects show on `projects.html` (OpenWISP project removed)
5. Check mobile hamburger menu functionality

### Deployment to Netlify
Configuration in `netlify.toml`:
- No build command needed (static site)
- Forms auto-detected via `netlify` attribute on `<form>` tags
- Security headers configured (X-Frame-Options, CSP, etc.)
- Cache headers: 1 year for assets, 0 for HTML

Steps: Push to GitHub → Connect to Netlify → Deploy from root directory

## Project-Specific Conventions

### Adding/Modifying Pages
When editing HTML:
1. **Update ALL 6 pages** if changing header/footer (no partials system)
2. Keep navigation structure identical: `<nav class="nav" id="nav">` with nav-links
3. Maintain active state with `class="nav-link active"` on current page
4. Always include AOS data attributes: `data-aos="fade-up"`, optionally `data-aos-delay="100"`

### Project Cards Pattern
Projects are hardcoded in `projects.html` (not dynamically loaded despite `data/projects.json` existing):
```html
<article class="project-card" data-aos="fade-up">
  <div class="project-image">
    <span class="project-icon"><i class="fas fa-icon"></i></span>
  </div>
  <div class="project-content">
    <h3 class="project-title">Title</h3>
    <div class="project-tech">
      <span class="tech-badge">Technology</span>
    </div>
  </div>
</article>
```
**Important**: Only 5 projects should display (OpenWISP removed per `TESTING_GUIDE.md`)

### Certificate System
Certificates in `certificates.html` use:
- Filter buttons: `data-filter="all|data-analytics|programming|cloud-ai|simulations|academic"`
- Certificate cards: `data-category` matching filter value
- Lightbox: JavaScript handles click events on `.view-certificate` links
- Images: Located in `Certificates/` folder (PDFs or PNGs)

### CSS Naming Convention
- BEM-inspired: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Utility classes: `.container`, `.section`, `.btn`, `.btn-primary`, `.btn-view`
- Animation classes: `.fade-in`, `.slide-up`, `.scale-up`
- Responsive: Mobile-first with `@media (min-width: 768px)` and `@media (min-width: 1024px)`

## Integration Points

### External Dependencies (CDN-loaded)
- **Google Fonts**: Poppins (weights 300-800)
- **Font Awesome 6.4.0**: Icons via `<i class="fas fa-*">` or `<i class="fab fa-*">`
- **AOS 2.3.1**: Scroll animations (initialized in scripts.js)
- **GSAP**: Loaded but disabled (see scripts.js line 77)

### Netlify Forms
Contact form in `contact.html` uses Netlify's built-in form handling:
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
```
No backend code needed - Netlify auto-detects `data-netlify="true"`

### SEO & Metadata
Every page includes:
- Meta description, keywords, author
- Open Graph tags (og:title, og:description, og:type)
- JSON-LD structured data on `index.html` (Person schema)
- `sitemap.xml` in root (static, manually maintained)
- `robots.txt` allows all crawlers

## Known Issues & Workarounds

1. **GSAP Animations Disabled**: Causes layout breaking (see scripts.js). Use AOS instead.
2. **Project Images**: Mostly placeholder icons (`<i class="fas fa-*">`) instead of actual screenshots
3. **Certificate Paths**: Some certificates reference placeholders - actual files in `Certificates/` folder
4. **No Dynamic Loading**: `data/projects.json` exists but isn't used (projects hardcoded in HTML)
5. **Duplicate Content**: Header/footer must be manually synced across 6 HTML files

## Project Navigation System

### Complete Folder Structure
All 5 projects have professional index.html pages throughout their folder hierarchies:

**FAULT_TOLERANCE_TECHNIQUES** (4 levels deep):
- Main: `Projects/FAULT_TOLERANCE_TECHNIQUES/index.html`
- Code: `Code/index.html` → `abft/index.html` → `abft/index.html` (5 Verilog files)
- Code: `Code/index.html` → `combined/index.html` → `combined/index.html` (9 Verilog files)
- Code: `Code/index.html` → `light_abft/index.html` → `light_abft/index.html` (7 Verilog files)
- Code: `Code/index.html` → `light_abft_mc/index.html` → `light_abft_mc/index.html` (2 Verilog files)
- Output: `Output/index.html` (image gallery with lightbox)
- Contents: `Contents/index.html` (document browser)
- Paper_Publication: `Paper_Publication/index.html` (publication download)

**IOT_BASED_SMART_ENERGY** (2 levels):
- Main: `Projects/IOT_BASED_SMART_ENERGY/index.html`
- Output: `Output/index.html` (hardware photos)
- Report: `Report/index.html` (project documentation)

**VIDEO_BASED_EMOTION_DETECTION_USING_DEEP_LEARNING** (2 levels):
- Main: `Projects/VIDEO_BASED_EMOTION_DETECTION_USING_DEEP_LEARNING/index.html`
- Report: `Report/index.html` (research documentation)

**Bank_Loan_Report_Dashboard** (3 levels):
- Main: `Projects/Bank_Loan_Report_Dashboard/index.html`
- Dashboard: `dashboard/index.html` → `dashboard_preview/index.html` (3 screenshots with gallery)
- Data: `data/index.html` (CSV dataset)
- Docs: `docs/index.html` (4 PDF documents)

**Sales_and_Profit_Dashboard** (1 level):
- Main: `Projects/Sales_and_Profit_Dashboard/index.html` (no subdirectories)

### Navigation Patterns
**Breadcrumb Navigation** (all project pages):
```
Projects / Project Name / Subfolder / Nested Folder
```

**File Browser Pattern** (for code/documents):
```html
<div class="file-list">
  <div class="file-item">
    <i class="fas fa-code"></i>
    <div>
      <h3>filename.v</h3>
      <p>Description of file</p>
    </div>
  </div>
</div>
```

**Gallery Pattern** (for images):
```html
<div class="gallery-grid">
  <div class="gallery-item" onclick="openLightbox('image.jpg')">
    <img src="image.jpg">
    <div class="gallery-item-title">Title</div>
  </div>
</div>
```

### Icon System
- Folders: `fa-folder` (gold #FFC700)
- Verilog: `fa-code` (blue accent)
- Images: `fa-images` (cyan accent)
- PDFs: `fa-file-pdf` (red #dc2626)
- CSV: `fa-file-csv` (green #10b981)
- Testbenches: `fa-vial` (green)
- Dashboards: `fa-chart-bar` (yellow)

## File References

**Key configuration**: `netlify.toml`, `sitemap.xml`, `robots.txt`  
**Documentation**: `README.md`, `TODO.md`, `TESTING_GUIDE.md`, `DEPLOYMENT_GUIDE.md`, `PROJECT_NAVIGATION_COMPLETE.md`  
**Project folders**: `Projects/Bank_Loan_Report_Dashboard/`, `Projects/FAULT_TOLERANCE_TECHNIQUES/`, etc.  
**Assets**: `Certificates/` (25+ PDFs/PNGs), `Resume/Balaji_S_Resume.pdf`, `assets/images/`

When modifying CSS, always check impact on all 6 pages and 3 breakpoints (mobile/tablet/desktop). When adding new project folders, create index.html pages for all subdirectories following the established patterns (see `PROJECT_NAVIGATION_COMPLETE.md`).
