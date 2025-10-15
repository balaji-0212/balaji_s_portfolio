# 🚀 GitHub Deployment Checklist

## Pre-Deployment Verification

### ✅ Step 1: Test Locally
```bash
# Start local server
python -m http.server 8000

# Test these URLs in browser:
http://localhost:8000/index.html
http://localhost:8000/about.html
http://localhost:8000/resume.html
http://localhost:8000/certificates.html
http://localhost:8000/projects.html
http://localhost:8000/contact.html
```

### ✅ Step 2: Verify All Pages Work
- [ ] Home page loads with hero section
- [ ] About page shows skills, experience, education
- [ ] Resume page displays properly
- [ ] Certificates filter system works (Data Analytics, Programming, etc.)
- [ ] Projects page shows exactly 5 projects
- [ ] Contact form displays correctly
- [ ] All navigation links work
- [ ] Mobile menu (hamburger) works on small screens

### ✅ Step 3: Check Project Navigation
Test these project index pages:
- [ ] `Projects/Bank_Loan_Report_Dashboard/index.html`
- [ ] `Projects/FAULT_TOLERANCE_TECHNIQUES/index.html`
- [ ] `Projects/IOT_BASED_SMART_ENERGY/index.html`
- [ ] `Projects/Sales_and_Profit_Dashboard/index.html`
- [ ] `Projects/VIDEO_BASED_EMOTION_DETECTION_USING_DEEP_LEARNING/index.html`

### ✅ Step 4: Verify Git Status
```bash
# Check what files will be committed
git status

# Check what's ignored
git status --ignored
```

## GitHub Upload Steps

### Step 5: Commit Changes
```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Clean up portfolio - remove temporary files, ready for deployment"

# Check commit
git log -1
```

### Step 6: Push to GitHub
```bash
# Push to main branch
git push origin main

# Or if first time:
git push -u origin main
```

### Step 7: Verify on GitHub
1. Go to https://github.com/balaji-0212/My_Portfolio
2. Check that all files are uploaded
3. Verify .gitignore is working (no PDF files in Certificates/)
4. Check that Projects folder structure is intact

## Netlify Deployment

### Step 8: Connect to Netlify
1. Log in to Netlify
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" as provider
4. Select `My_Portfolio` repository
5. Configure build settings:
   - **Build command**: (leave empty - static site)
   - **Publish directory**: `/` (root)
   - **Branch**: `main`

### Step 9: Deploy Settings (Already Configured)
These are already set in `netlify.toml`:
- ✅ Form detection enabled
- ✅ Security headers configured
- ✅ Cache headers optimized
- ✅ Redirects configured

### Step 10: Verify Deployment
1. Wait for deployment to complete
2. Test the live site URL
3. Test all pages work
4. Test contact form submission
5. Test certificate filtering
6. Test project navigation
7. Test on mobile device

## Post-Deployment

### Step 11: Custom Domain (Optional)
If you have a custom domain:
1. Go to Netlify → Site settings → Domain management
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS

### Step 12: Performance Check
- [ ] Run Lighthouse audit
- [ ] Check page load speed
- [ ] Verify all images load
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices

### Step 13: SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Check robots.txt is accessible
- [ ] Verify meta tags are correct
- [ ] Test Open Graph preview on social media

## Important Notes

### Files Included in Git (via .gitignore)
✅ **Will be uploaded:**
- All HTML, CSS, JS files
- Configuration files (netlify.toml, robots.txt, sitemap.xml)
- Documentation (README.md, TESTING_GUIDE.md, etc.)
- PNG/JPG images in Certificates/
- PNG/JPG images in Projects/dashboard_preview/
- Project structure and index.html files

❌ **Will NOT be uploaded (ignored):**
- PDF files (certificates, resume, project docs)
- Large files (.csv, .xlsx, .pbix, .zip)
- Media files (.mov, .HEIC)
- System files (.DS_Store, Thumbs.db)
- .git folders inside Projects/

### Why PDFs Are Excluded
The `.gitignore` excludes large PDF files to keep repository size small. You have two options:

**Option 1: Keep as-is (Recommended)**
- PDFs won't be uploaded to GitHub
- Update HTML to remove PDF download links or point to external storage
- Or upload PDFs manually to Netlify's static folder

**Option 2: Include PDFs**
- Remove PDF exclusions from `.gitignore`
- Commit PDFs (repository will be larger)
- Push to GitHub

## Quick Commands Reference

```bash
# Check current status
git status

# View changes
git diff

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin main

# Create new branch (if needed)
git checkout -b deployment-ready

# Check ignored files
git status --ignored

# Remove file from git (keep local)
git rm --cached filename

# Start local server for testing
python -m http.server 8000
```

## Troubleshooting

### If push fails:
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

### If .gitignore not working:
```bash
# Remove cached files
git rm -r --cached .

# Re-add all files
git add .

# Commit
git commit -m "Fix .gitignore"
```

### If files are too large:
```bash
# Check file sizes
git ls-files | xargs du -h | sort -h

# Remove large files from history
git filter-branch --tree-filter 'rm -f path/to/large/file' HEAD
```

## Final Checklist

Before pushing to GitHub:
- [x] Temporary files deleted
- [x] Test files removed
- [x] Backup files removed
- [x] Unused folders removed
- [ ] Local testing completed
- [ ] All pages work correctly
- [ ] Git status checked
- [ ] Ready to commit and push

After pushing to GitHub:
- [ ] Repository uploaded successfully
- [ ] Files structure looks correct
- [ ] .gitignore working (no PDFs visible)
- [ ] Ready to deploy to Netlify

After Netlify deployment:
- [ ] Site deployed successfully
- [ ] All pages accessible
- [ ] Forms working
- [ ] Certificate filtering working
- [ ] Project navigation working
- [ ] Mobile responsive
- [ ] Performance optimized

---

**Status**: ✅ Portfolio Cleaned and Ready for Deployment
**Next Action**: Test locally, then push to GitHub
**Estimated Time**: 10-15 minutes for deployment
