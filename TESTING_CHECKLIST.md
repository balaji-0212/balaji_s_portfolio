# 🧪 Portfolio Testing Checklist

## Complete Testing Guide for Your Portfolio

---

## 🔍 How to Test:

1. **Open your browser** (Chrome, Firefox, or Edge)
2. **Navigate to:** `http://localhost:8000`
3. **Follow the checklist below** and mark items as you test
4. **Report any issues** you find

---

## ✅ TEST 1: Projects Page (CRITICAL)

### URL: `http://localhost:8000/projects.html`

**Expected Results:**
- [ ] Page loads without errors
- [ ] **ONLY 5 projects display** (not 6)
- [ ] **NO "View Files" buttons** anywhere
- [ ] **Icons appear** on all project titles:
  - [ ] 📊 Bank Loan Dashboard has chart icon
  - [ ] 🛡️ Fault Tolerant System has shield icon
  - [ ] ⚡ IoT Energy Meter has plug icon
  - [ ] 🧠 Emotion Detection has brain icon
  - [ ] 📈 Sales Dashboard has Excel icon
- [ ] **IoT Energy Meter image** loads (pie chart)
- [ ] **Project statistics** show "5 Major Projects" (not 6+)
- [ ] All project descriptions are complete
- [ ] Hover effects work on project cards
- [ ] "Get In Touch" button works
- [ ] "Download Resume" button works

**Projects That Should Display:**
1. ✅ Bank Loan Report Dashboard
2. ✅ Fault Tolerant Matrix Computation
3. ✅ IoT Smart Energy Meter
4. ✅ Video-Based Emotion Detection
5. ✅ Sales & Profit Dashboard

**Project That Should NOT Display:**
- ❌ OpenWISP Monitoring (REMOVED)

---

## ✅ TEST 2: Certificates Page

### URL: `http://localhost:8000/certificates.html`

**Expected Results:**
- [ ] Page loads without errors
- [ ] Certificate filtering buttons work:
  - [ ] "All Certificates" shows all
  - [ ] "Data Analytics" filters correctly
  - [ ] "Programming" filters correctly
  - [ ] "Cloud & AI" filters correctly
  - [ ] "Virtual Simulations" filters correctly
  - [ ] "Academic" filters correctly
- [ ] **4 certificates show images:**
  - [ ] Data Analytics Essentials (PNG)
  - [ ] Introduction to Data Science (PNG)
  - [ ] Databricks (PNG)
  - [ ] Web Development (JPG)
- [ ] Other certificates show placeholders (acceptable)
- [ ] Certificate statistics show "25+ Total Certificates"
- [ ] "View Projects" button works
- [ ] "Get In Touch" button works

---

## ✅ TEST 3: Home Page

### URL: `http://localhost:8000/index.html` or `http://localhost:8000/`

**Expected Results:**
- [ ] Page loads without errors
- [ ] Hero section displays with greeting
- [ ] Profile photo shows (placeholder SVG is acceptable)
- [ ] "Download Resume" button works
- [ ] Navigation menu works
- [ ] Scroll animations trigger on scroll
- [ ] Footer displays correctly
- [ ] Social media links work

---

## ✅ TEST 4: About Page

### URL: `http://localhost:8000/about.html`

**Expected Results:**
- [ ] Page loads without errors
- [ ] Profile photo displays
- [ ] Skills section shows progress bars
- [ ] Experience timeline displays
- [ ] Education section shows correctly
- [ ] Interests section displays
- [ ] All animations work on scroll
- [ ] "Download Resume" button works
- [ ] "Get In Touch" button works

---

## ✅ TEST 5: Resume Page

### URL: `http://localhost:8000/resume.html`

**Expected Results:**
- [ ] Page loads without errors
- [ ] Resume PDF displays in embed/iframe
- [ ] "Download Resume" button works
- [ ] Resume highlights section displays
- [ ] Key competencies show correctly
- [ ] All sections are readable

---

## ✅ TEST 6: Contact Page

### URL: `http://localhost:8000/contact.html`

**Expected Results:**
- [ ] Page loads without errors
- [ ] Contact form displays
- [ ] Form fields work (Name, Email, Message)
- [ ] Form validation works
- [ ] Social media icons display
- [ ] Email link works (mailto:)
- [ ] Phone link works (tel:)
- [ ] Location displays correctly
- [ ] FAQ section displays

---

## ✅ TEST 7: Navigation & Links

**Test on ALL pages:**
- [ ] Header navigation works:
  - [ ] Home link
  - [ ] About link
  - [ ] Resume link
  - [ ] Certificates link
  - [ ] Projects link
  - [ ] Contact link
- [ ] Logo links to home page
- [ ] Active page is highlighted in nav
- [ ] Mobile hamburger menu works (resize browser)
- [ ] Footer links work:
  - [ ] Quick Links section
  - [ ] Contact links
  - [ ] Social media icons
- [ ] External links open in new tab:
  - [ ] LinkedIn
  - [ ] GitHub
  - [ ] Resume PDF

---

## ✅ TEST 8: Responsive Design

### Desktop View (> 1024px)
- [ ] All pages display correctly
- [ ] Navigation is horizontal
- [ ] Content is centered with max-width
- [ ] Images scale properly
- [ ] Grid layouts work (2-3 columns)

### Tablet View (768px - 1024px)
**Resize browser to ~800px width**
- [ ] All pages adapt correctly
- [ ] Navigation still works
- [ ] Content adjusts to screen
- [ ] Images scale down
- [ ] Grid layouts adjust (2 columns)

### Mobile View (< 768px)
**Resize browser to ~375px width**
- [ ] All pages are readable
- [ ] Hamburger menu appears
- [ ] Hamburger menu opens/closes
- [ ] Content stacks vertically
- [ ] Images scale to full width
- [ ] Grid layouts become single column
- [ ] Buttons are touch-friendly
- [ ] Text is readable (not too small)

---

## ✅ TEST 9: Animations & Interactions

**Test on ALL pages:**
- [ ] AOS scroll animations trigger
- [ ] Elements fade in on scroll
- [ ] Hover effects work on:
  - [ ] Navigation links
  - [ ] Buttons
  - [ ] Project cards
  - [ ] Certificate cards
  - [ ] Social media icons
- [ ] Back-to-top button appears on scroll
- [ ] Back-to-top button works when clicked
- [ ] Smooth scrolling works

---

## ✅ TEST 10: Performance & Loading

**Test on ALL pages:**
- [ ] Pages load quickly (< 3 seconds)
- [ ] Images load without errors
- [ ] No broken images (check browser console)
- [ ] No JavaScript errors (check browser console)
- [ ] No CSS errors
- [ ] Fonts load correctly
- [ ] Icons display (Font Awesome)

---

## 🐛 Bug Reporting Template

If you find any issues, report them like this:

```
**Issue:** [Brief description]
**Page:** [Which page - e.g., projects.html]
**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected:** [What should happen]
**Actual:** [What actually happens]
**Screenshot:** [If possible]
```

---

## 🔧 How to Check Browser Console

### Chrome/Edge:
1. Press `F12` or `Ctrl + Shift + I`
2. Click "Console" tab
3. Look for red errors

### Firefox:
1. Press `F12` or `Ctrl + Shift + K`
2. Click "Console" tab
3. Look for red errors

---

## ✅ Quick Test (5 Minutes)

If you want to do a quick test, focus on these:

1. **Projects Page:**
   - [ ] Only 5 projects (no OpenWISP)
   - [ ] No "View Files" buttons
   - [ ] Icons on project titles
   - [ ] IoT image loads

2. **Certificates Page:**
   - [ ] 4 images load correctly
   - [ ] Filtering works

3. **Navigation:**
   - [ ] All pages load
   - [ ] Links work

---

## 📊 Test Results Summary

After testing, fill this out:

**Total Tests:** 10 sections
**Tests Passed:** _____ / 10
**Tests Failed:** _____ / 10
**Critical Issues:** _____ (issues that break functionality)
**Minor Issues:** _____ (cosmetic or non-critical)

**Overall Status:**
- [ ] ✅ All tests passed - Ready to deploy!
- [ ] ⚠️ Minor issues found - Can deploy with notes
- [ ] ❌ Critical issues found - Need fixes before deploy

---

## 🚀 After Testing

Once testing is complete:

1. **If all tests pass:**
   - Portfolio is ready to deploy!
   - Proceed to Netlify deployment

2. **If issues found:**
   - Report issues using bug template above
   - I'll fix them immediately
   - Re-test after fixes

---

## 📝 Notes

- **Profile Photo:** Placeholder SVG is acceptable (can replace later)
- **Certificate PDFs:** Showing placeholders is acceptable
- **Project Images:** 2 projects use placeholders (acceptable)
- **Directory Listings:** Should NOT appear anymore (fixed)

---

**Start testing now and let me know the results!** 🧪
