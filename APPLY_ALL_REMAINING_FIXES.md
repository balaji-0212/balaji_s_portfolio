# 🔧 All Remaining Fixes - Implementation Guide

## ✅ COMPLETED (2/5)
1. ✅ Photo size reduced to 350px
2. ✅ About page photo updated to Balaji_Photo.jpg

## 🔄 TO BE COMPLETED (3/5)

### Fix 3: Remove ALL Project Icons
**Files to Edit:** projects.html

**Icons to Remove (found in project titles):**
- Line ~115: `<i class="fas fa-chart-bar" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>`
- Line ~145: `<i class="fas fa-shield-alt" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>`
- Line ~175: `<i class="fas fa-plug" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>`
- Line ~205: `<i class="fas fa-brain" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>`
- Line ~235: `<i class="fas fa-file-excel" style="color: var(--accent-primary); margin-right: 0.5rem;"></i>`

**Action:** Remove these 5 icon lines from project titles

---

### Fix 4: Add Certificate Lightbox Functionality
**Files to Edit:** assets/js/scripts.js

**Add this code at the end of scripts.js:**

```javascript
// ===================================
// Certificate Lightbox Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  // Create lightbox if it doesn't exist
  let lightbox = document.querySelector('.lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">
          <i class="fas fa-times"></i>
        </button>
        <img src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  
  // Add click handlers to certificate cards
  certificateCards.forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('.certificate-image img');
      const title = this.querySelector('.certificate-title').textContent;
      
      if (img && img.src) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
});
```

---

### Fix 5: Add All 23 Certificates
**Files to Edit:** certificates.html

**Current Count:** ~17 certificates
**Target Count:** 23 certificates

**Missing Certificates to Add:**
1. Data.pdf
2. PLC_Design.pdf
3. Retail_Sales_and_Growth_Analysis_Dashboard.pdf
4. Python_Certificate.pdf
5. Full_Stack_Certificate.pdf
6. Data_Analytics.pdf

**Note:** Need to add 6 more certificate cards to reach 23 total

---

## 📋 Step-by-Step Implementation

### Step 1: Remove Project Icons
Open projects.html and remove all 5 `<i class="fas..."></i>` lines from project titles

### Step 2: Add Lightbox to JavaScript
Open assets/js/scripts.js and add the lightbox code at the end

### Step 3: Add Missing Certificates
Open certificates.html and add 6 more certificate cards

### Step 4: Test Everything
1. Clear browser cache (Ctrl + Shift + R)
2. Test photo size on home and about pages
3. Test clicking certificates (should open lightbox)
4. Verify 23 certificates total
5. Verify no icons on project titles

---

## 🎯 Expected Results

After all fixes:
- ✅ Photo is smaller (350px) and looks professional
- ✅ Real photo on both home and about pages
- ✅ NO icons on project titles
- ✅ Certificates open in lightbox when clicked
- ✅ Exactly 23 certificates displayed
- ✅ All certificates clickable and viewable

---

**Status:** Ready to implement remaining 3 fixes
**Estimated Time:** 10-15 minutes
