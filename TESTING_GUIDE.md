# 🧪 Portfolio Testing Guide

## 📋 Testing Checklist

### Step 1: Start the Server (If Not Running)
```bash
python -m http.server 8000
```

### Step 2: Clear Browser Cache
**Method 1: Hard Refresh**
- Open browser
- Press `Ctrl + Shift + R` (Windows/Linux)
- Or `Cmd + Shift + R` (Mac)

**Method 2: Incognito Mode** (Recommended)
- Press `Ctrl + Shift + N` (Chrome/Edge)
- Or `Ctrl + Shift + P` (Firefox)
- Navigate to `http://localhost:8000`

---

## ✅ Test 1: Home Page - Profile Photo

**URL:** `http://localhost:8000/index.html`

**What to Check:**
- [ ] Real photo appears (not blue/purple placeholder icon)
- [ ] Photo has cyan border (3px solid)
- [ ] Photo has shadow effect
- [ ] Photo looks professional and clear
- [ ] Photo is properly sized and centered
- [ ] Decoration border (purple) appears behind photo

**Expected Result:**
- Your actual photo should be visible
- Professional appearance with border and shadow
- Enhanced contrast and brightness

**If Issues:**
- Photo not showing? Check browser console (F12) for errors
- Still seeing placeholder? Clear cache again
- Photo looks wrong? Check file path in browser DevTools

---

## ✅ Test 2: Projects Page

**URL:** `http://localhost:8000/projects.html`

**What to Check:**
- [ ] Exactly **5 projects** displayed (not 6)
- [ ] **No OpenWISP project** visible
- [ ] Icons appear on project titles:
  - 📊 Bank Loan Dashboard
  - 🛡️ Fault Tolerant System
  - ⚡ IoT Energy Meter
  - 🧠 Emotion Detection
  - 📈 Sales Dashboard
- [ ] **No "View Files" buttons** present
- [ ] IEEE Published badge on Fault Tolerant project
- [ ] All project images load correctly

**Expected Result:**
- Clean project cards with icons
- Professional appearance
- No directory listing buttons

---

## ✅ Test 3: Responsive Design

### Desktop (> 1024px)
**URL:** `http://localhost:8000/index.html`

**What to Check:**
- [ ] Photo appears on right side
- [ ] Text on left side
- [ ] Two-column layout
- [ ] Photo size: ~500px max-width

### Tablet (768px - 1024px)
**Resize browser window to ~900px width**

**What to Check:**
- [ ] Photo moves to top
- [ ] Text below photo
- [ ] Single column layout
- [ ] Photo size: ~400px max-width

### Mobile (< 768px)
**Resize browser window to ~375px width**

**What to Check:**
- [ ] Photo at top, centered
- [ ] Text below, full width
- [ ] Navigation becomes hamburger menu
- [ ] Photo maintains aspect ratio
- [ ] All content readable

---

## ✅ Test 4: All Pages Load

**Check each page loads without errors:**

1. [ ] **Home:** `http://localhost:8000/index.html`
2. [ ] **About:** `http://localhost:8000/about.html`
3. [ ] **Resume:** `http://localhost:8000/resume.html`
4. [ ] **Certificates:** `http://localhost:8000/certificates.html`
5. [ ] **Projects:** `http://localhost:8000/projects.html`
6. [ ] **Contact:** `http://localhost:8000/contact.html`

**For each page:**
- [ ] No console errors (F12 → Console tab)
- [ ] All images load
- [ ] Navigation works
- [ ] Styling looks correct

---

## ✅ Test 5: Browser Console Check

**Open Developer Tools (F12)**

**Check Console Tab:**
- [ ] No red errors
- [ ] No 404 errors (missing files)
- [ ] No CORS errors
- [ ] AOS and GSAP load successfully

**Check Network Tab:**
- [ ] `Balaji_Photo.jpg` loads (Status: 200)
- [ ] All CSS files load
- [ ] All JS files load
- [ ] No failed requests

---

## 🐛 Common Issues & Solutions

### Issue 1: Photo Not Showing
**Symptoms:** Placeholder still visible or broken image icon

**Solutions:**
1. Clear browser cache completely
2. Check file exists: `d:/Balaji_S_Portfolio/assets/images/Balaji_Photo.jpg`
3. Check browser console for 404 error
4. Try incognito mode
5. Check file path in index.html source code

### Issue 2: Old Version Still Showing
**Symptoms:** Still seeing 6 projects or OpenWISP

**Solutions:**
1. Hard refresh: `Ctrl + Shift + R`
2. Clear all browser data for localhost
3. Use incognito mode
4. Add `?v=123` to URL: `http://localhost:8000/index.html?v=123`

### Issue 3: Styling Looks Wrong
**Symptoms:** Photo has no border, wrong size, etc.

**Solutions:**
1. Check CSS file loaded in Network tab
2. Clear cache and reload
3. Check browser console for CSS errors
4. Verify styles.css was saved correctly

### Issue 4: Server Not Running
**Symptoms:** "This site can't be reached"

**Solutions:**
1. Start server: `python -m http.server 8000`
2. Check port 8000 is not in use
3. Try different port: `python -m http.server 8001`

---

## 📊 Testing Results Template

**Copy this and fill in your results:**

```
## Testing Results - [Date/Time]

### ✅ Home Page Photo
- Photo displays: [ ] Yes [ ] No
- Professional appearance: [ ] Yes [ ] No
- Border and shadow: [ ] Yes [ ] No
- Issues found: _______________

### ✅ Projects Page
- 5 projects shown: [ ] Yes [ ] No
- No OpenWISP: [ ] Yes [ ] No
- Icons present: [ ] Yes [ ] No
- No "View Files": [ ] Yes [ ] No
- Issues found: _______________

### ✅ Responsive Design
- Desktop (>1024px): [ ] Pass [ ] Fail
- Tablet (768-1024px): [ ] Pass [ ] Fail
- Mobile (<768px): [ ] Pass [ ] Fail
- Issues found: _______________

### ✅ All Pages Load
- Home: [ ] Pass [ ] Fail
- About: [ ] Pass [ ] Fail
- Resume: [ ] Pass [ ] Fail
- Certificates: [ ] Pass [ ] Fail
- Projects: [ ] Pass [ ] Fail
- Contact: [ ] Pass [ ] Fail
- Issues found: _______________

### ✅ Console Check
- No errors: [ ] Yes [ ] No
- All files load: [ ] Yes [ ] No
- Issues found: _______________

### 📝 Overall Status
- [ ] All tests passed - Ready to proceed
- [ ] Some issues found - Need fixes
- [ ] Major issues - Need investigation

### 🐛 Issues to Fix
1. _______________
2. _______________
3. _______________
```

---

## 🎯 Next Steps After Testing

### If All Tests Pass ✅
1. Proceed with remaining tasks:
   - Update about.html photo
   - Add certificate icons
   - Add project view buttons
2. Test again after each change
3. Deploy to production

### If Issues Found ❌
1. Document all issues
2. Share results with developer
3. Fix issues one by one
4. Re-test after fixes

---

## 💡 Pro Tips

1. **Always test in incognito mode** - Avoids cache issues
2. **Use browser DevTools** - Essential for debugging
3. **Test on real devices** - Emulators aren't perfect
4. **Check multiple browsers** - Chrome, Firefox, Safari
5. **Document everything** - Screenshots help!

---

**Ready to test? Start with Step 1 above! 🚀**
