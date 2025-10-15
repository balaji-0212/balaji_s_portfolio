# 🔧 Final Fixes Required

## Issues Found from Screenshots:

1. ✅ **Photo too large** - Need to make it smaller/perfect profile size
2. ❌ **About page** - Still using placeholder (line 77)
3. ❌ **Certificates** - Lightbox not working when clicked
4. ❌ **Certificate count** - Need exactly 23 certificates (currently showing ~17)
5. ❌ **Projects** - Icons should NOT be there (user wants them removed)

## Fixes to Apply:

### Fix 1: Make Photo Smaller (Perfect Profile Size)
- Current: Full width in container
- Target: Smaller, more professional profile size
- Update CSS to max-width: 350px

### Fix 2: Update About Page Photo
- File: about.html, Line 77
- Change: `profile-placeholder.svg` → `Balaji_Photo.jpg`

### Fix 3: Fix Certificate Lightbox
- Issue: Clicking certificates doesn't open them
- Solution: Add lightbox functionality to scripts.js
- Make certificates clickable to view full size

### Fix 4: Add All 23 Certificates
Currently missing certificates:
- Data.pdf
- PLC_Design.pdf
- Retail_Sales_and_Growth_Analysis_Dashboard.pdf
- And others...

### Fix 5: Remove Project Icons
- User wants NO icons on projects
- Remove all `<i class="..."></i>` from project titles

## Implementation Order:
1. Fix photo size (CSS)
2. Update about.html photo
3. Remove project icons
4. Add missing certificates
5. Fix certificate lightbox
