# 🔴 404 Error - How to Fix

## Why You're Seeing 404

The 404 error means GitHub Pages either:
1. **Not enabled yet** in repository settings
2. **Still deploying** (first deployment takes 2-5 minutes)
3. **DNS propagation** (can take a few minutes)

## ✅ Solution - Enable GitHub Pages

### Step 1: Enable GitHub Pages
1. Go to: **https://github.com/balaji-0212/balaji_s_portfolio/settings/pages**
2. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
3. Click **Save**

### Step 2: Check Deployment Status
1. Go to **Actions** tab: https://github.com/balaji-0212/balaji_s_portfolio/actions
2. Look for the workflow: **"Deploy Static Portfolio to GitHub Pages"**
3. Status should show:
   - 🟡 **Running** (yellow) - Wait for it to complete
   - ✅ **Success** (green) - Site is deployed!
   - ❌ **Failed** (red) - Need to troubleshoot

### Step 3: Wait for Deployment
- **First deployment**: 2-5 minutes
- **Subsequent deployments**: 1-2 minutes

### Step 4: Access Your Site
Once deployment shows ✅ green checkmark:
- **Home**: https://balaji-0212.github.io/balaji_s_portfolio/
- **About**: https://balaji-0212.github.io/balaji_s_portfolio/about.html
- **Projects**: https://balaji-0212.github.io/balaji_s_portfolio/projects.html
- **Certificates**: https://balaji-0212.github.io/balaji_s_portfolio/certificates.html
- **Resume**: https://balaji-0212.github.io/balaji_s_portfolio/resume.html
- **Contact**: https://balaji-0212.github.io/balaji_s_portfolio/contact.html

## 🔍 Troubleshooting

### If Actions Tab Shows No Workflows:
1. Make sure you enabled **"GitHub Actions"** in Pages settings
2. The workflow will start automatically after enabling

### If Workflow Failed:
1. Click on the failed workflow
2. Check the error logs
3. Common issues:
   - Permissions not set correctly
   - Branch name mismatch

### If Still Getting 404 After Success:
1. **Clear browser cache**: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Try incognito mode**: Open in private/incognito window
3. **Wait 5 more minutes**: DNS propagation can take time
4. **Check URL**: Make sure you're using the correct URL with repository name

## 📋 Current Repository Info

- **Repository**: balaji-0212/balaji_s_portfolio
- **Branch**: main ✅
- **Latest Commit**: 86a14bd ✅
- **Files**: All pushed ✅
- **Workflow**: Created ✅
- **Status**: Waiting for GitHub Pages to be enabled

## 🎯 Quick Checklist

- [ ] Go to repository settings → Pages
- [ ] Set Source to "GitHub Actions"
- [ ] Click Save
- [ ] Go to Actions tab
- [ ] Wait for green checkmark
- [ ] Try accessing site
- [ ] Clear browser cache if needed

## 📞 Still Not Working?

### Alternative: Test Locally
While waiting for deployment:
```bash
# In your portfolio folder
python -m http.server 8000
```
Then visit: http://localhost:8000

### Check Repository Settings
1. Repository must be **public** (not private)
2. GitHub Pages must be **enabled**
3. Source must be **"GitHub Actions"**

## ⏱️ Expected Timeline

| Step | Time | Status |
|------|------|--------|
| Push to GitHub | Done | ✅ |
| Enable Pages | Manual | ⏳ |
| First Deploy | 2-5 min | ⏳ |
| DNS Propagation | 1-5 min | ⏳ |
| **Total** | **3-10 min** | ⏳ |

---

**Next Action**: Enable GitHub Pages in settings, then wait 2-5 minutes for deployment.

**Settings URL**: https://github.com/balaji-0212/balaji_s_portfolio/settings/pages
