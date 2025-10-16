// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    disable: false
  });
}

// ===================================
// Smart Header, Skip Link, Mobile Menu ARIA + Focus Trap
// ===================================
(function setupHeaderAndNav() {
  const header = document.querySelector('.header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('mobileMenuToggle');
  const main = document.querySelector('main');

  // Landmark roles and labels
  try { header?.setAttribute('role', 'banner'); } catch(_) {}
  try { nav?.setAttribute('aria-label', 'Main navigation'); } catch(_) {}

  // Inject skip link at very top of body
  try {
    if (!document.querySelector('.skip-link')) {
      const skip = document.createElement('a');
      skip.href = '#main-content';
      skip.className = 'skip-link';
      skip.textContent = 'Skip to content';
      document.body.insertBefore(skip, document.body.firstChild);
    }
    // Ensure a target with id exists: prefer <main>, else first meaningful section
    let target = main;
    if (!target) {
      target = document.querySelector('main, section.section, .page-header, .project-hero, .container');
    }
    if (target && !target.id) target.id = 'main-content';
  } catch(_) {}

  // Compute and set --site-header-offset on load and resize
  function updateHeaderOffset() {
    try {
      const h = header ? header.offsetHeight : 80;
      document.documentElement.style.setProperty('--site-header-offset', h + 'px');
    } catch(_) {}
  }
  updateHeaderOffset();
  window.addEventListener('resize', updateHeaderOffset);

  // Hide on scroll down, reveal on scroll up with threshold
  let lastY = window.pageYOffset || 0;
  let acc = 0; // accumulate delta
  const hideThreshold = 100; // px
  const onScroll = () => {
    const y = window.pageYOffset || 0;
    const dy = y - lastY;
    acc = (Math.sign(dy) === Math.sign(acc)) ? acc + dy : dy; // directional accumulation
    if (y > 8) header?.classList.add('header--scrolled'); else header?.classList.remove('header--scrolled');
    if (acc > hideThreshold && y > 120) {
      header?.classList.add('header--hidden');
    } else if (acc < -hideThreshold || y < 120) {
      header?.classList.remove('header--hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu ARIA control and focus trap
  if (toggle && nav) {
    const openMenu = () => {
      document.body.classList.add('menu-open');
      toggle.classList.add('active');
      nav.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.setAttribute('aria-hidden', 'false');
      // Focus trap setup
      const focusables = nav.querySelectorAll('a, button');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      function trap(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      nav.__trapHandler = trap;
      document.addEventListener('keydown', trap);
      // ESC closes
      nav.__escHandler = (e) => { if (e.key === 'Escape') closeMenu(true); };
      document.addEventListener('keydown', nav.__escHandler);
      // Move focus to first link for accessibility
      try { first?.focus(); } catch(_) {}
    };
    const closeMenu = (returnFocus) => {
      document.body.classList.remove('menu-open');
      toggle.classList.remove('active');
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      if (nav.__trapHandler) { document.removeEventListener('keydown', nav.__trapHandler); nav.__trapHandler = null; }
      if (nav.__escHandler) { document.removeEventListener('keydown', nav.__escHandler); nav.__escHandler = null; }
      if (returnFocus) try { toggle.focus(); } catch(_) {}
    };

    // Initialize ARIA defaults
    toggle.setAttribute('aria-expanded', 'false');
    nav.setAttribute('aria-hidden', 'true');

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.contains('active');
      if (isOpen) closeMenu(true); else openMenu();
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(false);
    });

    // Close when a nav link is clicked
    nav.querySelectorAll('a.nav-link').forEach(a => a.addEventListener('click', () => closeMenu(false)));
  }

  // Active link: set aria-current="page" precisely
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    // Resolve absolute comparison URL based on page depth
    let abs;
    try { abs = new URL(href, window.location.origin + currentPath).pathname; } catch(_) { abs = href; }
    const current = currentPath.endsWith('/') ? currentPath + 'index.html' : currentPath;
    const match = (abs === current) || (href === 'index.html' && (/\/index\.html$/.test(current)));
    if (match) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });

  // Footer landmark + optional "last updated" display
  document.querySelectorAll('footer.footer').forEach(f => {
    try { f.setAttribute('role', 'contentinfo'); } catch(_) {}
  });
  document.querySelectorAll('[data-last-updated]').forEach(el => {
    const iso = el.getAttribute('data-last-updated');
    if (!iso) return;
    try {
      const d = new Date(iso);
      if (!isNaN(d)) {
        const formatted = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
        el.textContent = `Last updated: ${formatted}`;
      }
    } catch(_) {}
  });
})();

// Removed legacy header scroll shadow and naive active-link code (replaced by smart header setup above)

// ===================================
// GSAP Animations - DISABLED FOR DEBUGGING
// ===================================
// Temporarily disabled to fix layout issues
// Will re-enable after confirming basic layout works
console.log('GSAP animations temporarily disabled for debugging');

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===================================
// Form Validation (for contact page)
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    
    // Validate name
    if (name.value.trim() === '') {
      showError(name, 'Name is required');
      isValid = false;
    }
    
    // Validate email
    if (email.value.trim() === '') {
      showError(email, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
      showError(message, 'Message is required');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters');
      isValid = false;
    }
    
    if (isValid) {
      // Show success message
      showSuccessMessage();
      // Submit form (will be handled by Formspree or Netlify Forms)
      this.submit();
    }
  });
}

function showError(input, message) {
  input.classList.add('input-error');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
  contactForm.insertBefore(successDiv, contactForm.firstChild);
  
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// ===================================
// Certificate Modal/Lightbox - REMOVED (Replaced with new implementation below)
// ===================================

// ===================================
// Dynamic Project Loading - DISABLED
// ===================================
// Projects are now hardcoded in HTML, not loaded dynamically
// This was causing the empty projects page issue
console.log('Dynamic project loading disabled - using static HTML');

// ===================================
// Typing Effect for Hero (Optional)
// ===================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect
// const heroSubtitle = document.querySelector('.hero-subtitle');
// if (heroSubtitle) {
//   const originalText = heroSubtitle.textContent;
//   typeWriter(heroSubtitle, originalText, 50);
// }

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hello! Welcome to my portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/balaji-0212', 'color: #7c3aed; font-size: 14px;');

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===================================
// Theme Toggle (Optional - for future enhancement)
// ===================================
// const themeToggle = document.getElementById('themeToggle');
// if (themeToggle) {
//   const currentTheme = localStorage.getItem('theme') || 'dark';
//   document.documentElement.setAttribute('data-theme', currentTheme);
  
//   themeToggle.addEventListener('click', () => {
//     const theme = document.documentElement.getAttribute('data-theme');
//     const newTheme = theme === 'dark' ? 'light' : 'dark';
//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//   });
// }

// ===================================
// Certificate Lightbox Functionality
// ===================================
const certificateLinks = document.querySelectorAll('.view-certificate');
const lightbox = document.createElement('div');
lightbox.className = 'certificate-lightbox';
lightbox.innerHTML = `
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
    <iframe class="lightbox-iframe" frameborder="0"></iframe>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxIframe = lightbox.querySelector('.lightbox-iframe');
const lightboxClose = lightbox.querySelector('.lightbox-close');

certificateLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const certificatePath = link.getAttribute('href');
    lightboxIframe.src = certificatePath;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', () => {
  closeLightbox();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('active')) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxIframe.src = '';
  document.body.style.overflow = '';
}

// ===================================
// Certificate Grid: Search + Filter + Counts
// ===================================
(function setupCertificateFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certificateCards = Array.from(document.querySelectorAll('.certificate-card'));
  const searchInput = document.querySelector('#certificateSearch');
  const grid = document.querySelector('.certificates-grid');

  if (!certificateCards.length) return; // not on certificates page

  // Ensure cards are keyboard focusable and open on Enter/Space
  certificateCards.forEach(card => {
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', (card.querySelector('.certificate-title')?.textContent || 'Certificate').trim());
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  function getActiveFilter() {
    const active = Array.from(filterButtons).find(b => b.classList.contains('active'));
    return active ? active.getAttribute('data-filter') : 'all';
  }

  // Ensure certificate thumbnails are lazy-loaded
  document.querySelectorAll('.certificate-card img').forEach(img => {
    if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
  });

  function updateCounts() {
    const q = (searchInput?.value || '').trim().toLowerCase();
    const categories = ['all','data-analytics','programming','cloud-ai','simulations','academic'];
    const counts = { all: 0 };
    categories.slice(1).forEach(c => counts[c] = 0);
    certificateCards.forEach(card => {
      const title = (card.querySelector('.certificate-title')?.textContent || '').toLowerCase();
      const issuer = (card.querySelector('.certificate-issuer')?.textContent || '').toLowerCase();
      const matchSearch = !q || title.includes(q) || issuer.includes(q);
      if (!matchSearch) return;
      const cat = card.getAttribute('data-category');
      counts.all++;
      if (cat && counts.hasOwnProperty(cat)) counts[cat]++;
    });
    filterButtons.forEach(btn => {
      const cat = btn.getAttribute('data-filter') || 'all';
      const badge = btn.querySelector('.filter-count');
      if (badge) badge.textContent = (counts[cat] ?? 0);
    });
  }

  function applyFilterAndSearch() {
    const filterValue = getActiveFilter();
    const q = (searchInput?.value || '').trim().toLowerCase();
    certificateCards.forEach(card => {
      const catOk = (filterValue === 'all') || (card.getAttribute('data-category') === filterValue);
      const title = (card.querySelector('.certificate-title')?.textContent || '').toLowerCase();
      const issuer = (card.querySelector('.certificate-issuer')?.textContent || '').toLowerCase();
      const searchOk = !q || title.includes(q) || issuer.includes(q);
      const show = catOk && searchOk;
      card.style.display = show ? 'block' : 'none';
      if (show) card.classList.add('aos-animate');
    });
    updateCounts();
    try { if (typeof AOS !== 'undefined') AOS.refresh(); } catch(_) {}
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      applyFilterAndSearch();
      // Preserve active filter in state
      try { sessionStorage.setItem('certActiveFilter', getActiveFilter()); } catch(_) {}
    });
  });

  searchInput?.addEventListener('input', () => {
    applyFilterAndSearch();
    try { sessionStorage.setItem('certSearchQuery', searchInput.value); } catch(_) {}
  });

  // Restore persisted state
  try {
    const savedFilter = sessionStorage.getItem('certActiveFilter');
    const savedQuery = sessionStorage.getItem('certSearchQuery');
    if (savedFilter) {
      const btn = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === savedFilter);
      if (btn) {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    }
    if (savedQuery && searchInput) searchInput.value = savedQuery;
  } catch(_) {}

  // Initial render
  applyFilterAndSearch();

  // Prefetch PDF on hover (same-origin only) with small delay
  let hoverTimer;
  function prefetch(url) {
    try {
      const u = new URL(url, window.location.href);
      if (u.origin !== window.location.origin) return;
      // Use fetch with cache to let browser prefetch
      fetch(u.toString(), { method: 'GET', mode: 'same-origin', cache: 'force-cache' }).catch(()=>{});
    } catch(_) {}
  }
  certificateCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      const href = card.getAttribute('data-href');
      if (!href) return;
      hoverTimer = setTimeout(() => prefetch(href), 400);
    });
    card.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
  });
})();

// ===================================
// Make Certificate Cards Clickable & Document Viewer
// ===================================

// Function to initialize the inline viewer (can be called multiple times safely)
function initializeInlineViewer() {
  console.log('🔧 Initializing inline viewer...');
  
  // Check if viewer already exists
  if (document.getElementById('documentViewer')) {
    console.log('✅ Viewer already exists, skipping creation');
    return;
  }

  // Only initialize on pages that actually have document/gallery triggers
  const triggerSelector = 'a[href$=".pdf"], a[href*=".pdf"], a[href$=".md"], a[href$=".csv"], a[href$=".txt"], .certificate-card[data-href], .gallery-item';
  const hasTriggers = !!document.querySelector(triggerSelector);
  if (!hasTriggers) {
    console.log('ℹ️ No document/gallery triggers found on this page. Skipping viewer setup.');
    return;
  }

  // Certificate Cards (clickable with data-href)
  const clickableCertificateCards = document.querySelectorAll('.certificate-card[data-href]');
  
  console.log('📋 Found certificate cards:', clickableCertificateCards.length);
  
  clickableCertificateCards.forEach(card => {
    // Add click handler
    card.addEventListener('click', (e) => {
      // Prevent click if clicking on a link inside the card
      if (e.target.tagName === 'A') {
        return;
      }
      
      const href = card.getAttribute('data-href');
      
      if (href) {
        // Extract certificate title from the card
        const titleElement = card.querySelector('.certificate-title');
        const title = titleElement ? titleElement.textContent.trim() : 'Certificate';
        
        // Open in inline viewer using global function
        window.openViewer(href, title);
      }
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 8px 24px rgba(0, 123, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  // ===================================
  // In-Page PDF/Document Viewer (Inline Slide-In Mode)
  // ===================================
  
  // Create inline viewer HTML - slides into page content
  const viewerHTML = `
    <div id="documentViewer" class="document-viewer-inline">
      <div class="document-viewer-content-inline">
        <div class="viewer-loading" aria-live="polite">
          <div class="viewer-spinner"></div>
          <span class="viewer-loading-text">Loading document…</span>
        </div>
        <div class="viewer-frame">
          <embed class="document-viewer-embed" type="application/pdf">
          <iframe class="document-viewer-iframe" style="display:none;" loading="eager"></iframe>
        </div>
      </div>
      <div class="document-viewer-header-inline document-viewer-header-bottom">
        <div class="document-viewer-title-section">
          <button class="document-viewer-back" aria-label="Back to list">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <h3 class="document-viewer-title-inline"></h3>
        </div>
        <div class="document-viewer-actions">
          <button class="viewer-btn viewer-focus-toggle" title="Focus mode (X)" aria-label="Focus mode" aria-pressed="false">
            <i class="fas fa-maximize"></i>
          </button>
          <button class="viewer-btn viewer-zoom-out" title="Zoom out (-)" aria-label="Zoom out">
            <i class="fas fa-search-minus"></i>
          </button>
          <button class="viewer-btn viewer-zoom-in" title="Zoom in (+)" aria-label="Zoom in">
            <i class="fas fa-search-plus"></i>
          </button>
          <button class="viewer-btn viewer-fit-width" title="Fit width (F)" aria-label="Fit width">
            <i class="fas fa-arrows-alt-h"></i>
          </button>
          <button class="viewer-btn viewer-fit-page" title="Fit page (W)" aria-label="Fit page">
            <i class="fas fa-arrows-alt-v"></i>
          </button>
          <a class="document-viewer-download-inline" download>
            <i class="fas fa-download"></i> Download
          </a>
          <a class="document-viewer-newtab-inline" target="_blank">
            <i class="fas fa-external-link-alt"></i> New Tab
          </a>
          <button class="viewer-btn viewer-print" title="Print (P)" aria-label="Print">
            <i class="fas fa-print"></i>
          </button>
          <button class="viewer-btn viewer-copy" title="Copy link (C)" aria-label="Copy link">
            <i class="fas fa-link"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Choose best insertion point for viewer to mimic certificate section placement
  const siteHeader = document.querySelector('header.header') || document.querySelector('header');
  const projectFileGrid = document.querySelector('.file-download-grid, .file-list, .gallery-grid');
  const certSection = document.querySelector('.certificates-section');
  const anchorContent = document.querySelector('.page-content, section.section, main > section, .container, main');

  if (projectFileGrid) {
    // Place viewer right above the project file grid
    projectFileGrid.insertAdjacentHTML('beforebegin', viewerHTML);
  } else if (certSection) {
    // Place viewer above certificates block
    certSection.insertAdjacentHTML('beforebegin', viewerHTML);
  } else if (siteHeader) {
    siteHeader.insertAdjacentHTML('afterend', viewerHTML);
  } else if (anchorContent) {
    anchorContent.insertAdjacentHTML('beforebegin', viewerHTML);
  } else {
    document.body.insertAdjacentHTML('afterbegin', viewerHTML);
  }
  
  const viewer = document.getElementById('documentViewer');
  
  if (!viewer) {
    console.error('Viewer element could not be created');
    return;
  }
  
  const viewerTitle = viewer.querySelector('.document-viewer-title-inline');
  // Accessibility semantics
  try {
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'false');
    viewer.setAttribute('aria-live', 'polite');
    viewerTitle.setAttribute('id', 'document-viewer-title');
    viewer.setAttribute('aria-labelledby', 'document-viewer-title');
  } catch(_) {}
  const viewerEmbed = viewer.querySelector('.document-viewer-embed');
  const viewerIframe = viewer.querySelector('.document-viewer-iframe');
  const viewerBack = viewer.querySelector('.document-viewer-back');
  const viewerDownload = viewer.querySelector('.document-viewer-download-inline');
  const viewerNewTab = viewer.querySelector('.document-viewer-newtab-inline');
  const viewerHeaderEl = viewer.querySelector('.document-viewer-header-inline');
  const viewerContentEl = viewer.querySelector('.document-viewer-content-inline');
  const viewerLoading = viewer.querySelector('.viewer-loading');
  const btnZoomIn = viewer.querySelector('.viewer-zoom-in');
  const btnZoomOut = viewer.querySelector('.viewer-zoom-out');
  const btnFitWidth = viewer.querySelector('.viewer-fit-width');
  const btnFitPage = viewer.querySelector('.viewer-fit-page');
  const btnPrint = viewer.querySelector('.viewer-print');
  const btnCopy = viewer.querySelector('.viewer-copy');
  const btnFocus = viewer.querySelector('.viewer-focus-toggle');
  // Helper: detect site base path (prefix like '/repo-name/' on GitHub Pages)
  function getSiteBase() {
    try {
      const scripts = Array.from(document.getElementsByTagName('script'));
      const self = scripts.find(s => ((s.getAttribute('src') || '').split('?')[0] || '').endsWith('assets/js/scripts.js'));
      if (self) {
        const u = new URL(self.src, window.location.href);
        return u.pathname.replace(/assets\/js\/scripts\.js.*$/, '');
      }
    } catch(_) {}
    // Fallback: first path segment
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts.length ? `/${parts[0]}/` : '/';
  }

  function resolveSitePath(p) {
    try {
      if (!p) return p;
      if (/^https?:\/\//i.test(p)) return new URL(p, window.location.href).href;
      if (p.startsWith('/')) {
        const base = getSiteBase();
        // If already includes base, keep as-is
        if (p.startsWith(base)) return new URL(p, window.location.origin).href;
        // Otherwise, prefix with detected base
        const joined = base.replace(/\/$/, '/') + p.replace(/^\/+/, '');
        return new URL(joined, window.location.origin).href;
      }
      return new URL(p, window.location.href).href;
    } catch(_) {
      return p;
    }
  }


  // State for zoom and url handling
  let __activeUrlBase = '';
  let __activeIsPdf = false;
  let __activeZoom = null; // number or special: 'page-width' | 'page-fit'
  let __prevFocusedEl = null; // focus restoration
  let __prevHash = window.location.hash || '';
  
  // Track last clicked document link for context-aware behavior
  window.__lastDocLink = null;
  // Track the exact section we hide so we can restore precisely that one
  window.__lastHiddenSection = null;
  // Helper: find preferred content section near a context element
  function resolveTargetSection(ctxEl) {
    const preferredSelectors = ['.file-download-grid', '.file-list', '.gallery-grid', '.certificates-section'];
    if (ctxEl && ctxEl.closest) {
      for (const sel of preferredSelectors) {
        const candidate = ctxEl.closest(sel);
        if (candidate) return candidate;
      }
      // Generic fallbacks
      return ctxEl.closest('section, .container, main > section, main');
    }
    // Broad page-level fallback
    return document.querySelector('.file-download-grid, .file-list, .gallery-grid, .certificates-section, section.section, .container, main > section, main');
  }
  
  // Function to open inline viewer
  window.openViewer = function(url, title) {
    console.log('📂 openViewer called:', { url, title });
    
    if (!viewer) {
      console.error('❌ Viewer element not found');
      return;
    }
    
    // Resolve the most relevant content block to hide based on the last clicked link
    const linkCtx = window.__lastDocLink;
    const mainContent = resolveTargetSection(linkCtx);
    window.__lastHiddenSection = mainContent || null;
    console.log('🎯 Target section resolved:', !!mainContent, '| class:', mainContent && mainContent.className);

    // Reposition viewer directly above the target section if possible
    try {
      if (mainContent && viewer && mainContent.parentNode) {
        if (viewer.previousElementSibling !== mainContent && viewer.nextElementSibling !== mainContent) {
          mainContent.parentNode.insertBefore(viewer, mainContent);
          console.log('📦 Viewer moved before target section');
        }
      }
    } catch (moveErr) {
      console.warn('⚠️ Could not reposition viewer:', moveErr);
    }
    
  viewerTitle.textContent = title;

  // Remember previous focus and move focus to Back button for a11y
  try { __prevFocusedEl = document.activeElement; } catch(_) { __prevFocusedEl = null; }
    // Decide renderer based on file extension
    try {
    const rawUrl = (url || '');
      const baseNoHash = rawUrl.split('#')[0];
      // Resolve against site base (supports GitHub Pages subpath)
      const resolvedHref = resolveSitePath(baseNoHash);
      let resolvedAbs;
      try { resolvedAbs = new URL(resolvedHref, window.location.href); } catch(_) { resolvedAbs = null; }
      const resolvedPathname = resolvedAbs ? resolvedAbs.pathname : baseNoHash.split('?')[0];
      const cleanUrl = (resolvedPathname || '').toLowerCase();
    const isPDF = cleanUrl.endsWith('.pdf');
    const isImage = /(\.png|\.jpg|\.jpeg|\.webp)$/i.test(cleanUrl);
  __activeUrlBase = resolvedHref;
      __activeIsPdf = isPDF;
  const isTextLike = cleanUrl.endsWith('.md') || cleanUrl.endsWith('.txt') || cleanUrl.endsWith('.csv');

      // Set links
      viewerDownload.href = resolvedHref;
      viewerNewTab.href = resolvedHref;

      // Show loading overlay
      if (viewerLoading) viewerLoading.style.display = 'flex';

      if (isPDF) {
        // Use <embed> for PDF
        if (viewerIframe) viewerIframe.style.display = 'none';
        viewerEmbed.style.display = 'block';
        viewerEmbed.setAttribute('type', 'application/pdf');
        // Default fit width for better readability
        __activeZoom = 'page-width';
        const pdfSrc = encodeURI(__activeUrlBase) + '#zoom=page-width';
        viewerEmbed.setAttribute('src', pdfSrc);
        console.log('📄 Rendering as PDF via <embed>');
      } else if (isImage) {
        if (viewerEmbed) viewerEmbed.style.display = 'none';
        if (viewerIframe) viewerIframe.style.display = 'block';
        // Use an HTML wrapper to show a responsive image
  const html = `<html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><style>body,html{margin:0;padding:0;background:#111;color:#fff} .wrap{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px} img{max-width:100%;height:auto;box-shadow:0 10px 40px rgba(0,0,0,.5);border-radius:12px}</style></head><body><div class=\"wrap\"><img src=\"${encodeURI(resolvedHref)}\" alt=\"Document image\"></div></body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const iframeUrl = URL.createObjectURL(blob);
        viewerIframe.setAttribute('src', iframeUrl);
        console.log('🖼️ Rendering image via <iframe> wrapper');
      } else if (isTextLike) {
        // Use <iframe> for text-like files (md/txt/csv)
        if (viewerEmbed) viewerEmbed.style.display = 'none';
        if (viewerIframe) {
          viewerIframe.style.display = 'block';
          viewerIframe.setAttribute('src', encodeURI(resolvedHref));
          console.log('📝 Rendering as text via <iframe>');
        }
      } else {
        // Fallback to iframe for unknown types
        if (viewerEmbed) viewerEmbed.style.display = 'none';
        if (viewerIframe) {
          viewerIframe.style.display = 'block';
          viewerIframe.setAttribute('src', encodeURI(resolvedHref));
          console.log('🧩 Rendering as generic via <iframe>');
        }
      }
    } catch(err) {
      console.warn('⚠️ Renderer decision failed, defaulting to <embed>', err);
      viewerEmbed.style.display = 'block';
      viewerEmbed.setAttribute('src', url);
      viewerDownload.href = url;
      viewerNewTab.href = url;
    }
    
    console.log('✅ Viewer configured');
    
    // Hide main content and show viewer with slide animation
    if (mainContent) {
      mainContent.style.display = 'none';
      console.log('🙈 Target section hidden');
    }
    
  // Remember scroll position of grid/page to restore later
  try { window.__prevScrollY = window.scrollY; } catch(_) {}

  viewer.classList.add('active');
    viewer.style.display = 'block';

    // Update CSS var for site header height for layout calculations only
    try {
      const siteHeader = document.querySelector('.header');
      const siteHeaderH = siteHeader ? siteHeader.offsetHeight : 80;
      document.documentElement.style.setProperty('--site-header-offset', siteHeaderH + 'px');
    } catch(err) { console.warn('Could not compute header size:', err); }

    // Size the content area to fill remaining viewport below both headers
    function sizeViewerContent() {
      try {
        const siteHeader = document.querySelector('.header');
        const siteHeaderH = siteHeader ? siteHeader.offsetHeight : 80;
        const hdrH = viewerHeaderEl ? viewerHeaderEl.offsetHeight : 80;
        const vH = window.innerHeight;
        const targetH = Math.max(360, vH - siteHeaderH - hdrH);
        if (viewerContentEl) {
          viewerContentEl.style.height = targetH + 'px';
          viewerContentEl.style.overflow = 'auto';
        }
        // Expose header height so CSS can offset content padding under sticky header
        document.documentElement.style.setProperty('--viewer-header-height', hdrH + 'px');
      } catch(err) { console.warn('Sizing viewer content failed:', err); }
    }

    sizeViewerContent();
    // Recalculate on resize while viewer is open
  window.addEventListener('resize', sizeViewerContent);
    viewer.__sizerHandler = sizeViewerContent;

    // Smooth scroll to align viewer just below the fixed site header (precise positioning)
    try {
      const siteHeader = document.querySelector('.header');
      const siteHeaderH = siteHeader ? siteHeader.offsetHeight : 80;
      const y = viewer.getBoundingClientRect().top + window.pageYOffset - siteHeaderH - 8; // small cushion
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    } catch(_) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Lock body scroll to avoid page-level scroll jitter; use inner content scroll instead
    try { document.body.dataset.prevOverflow = document.body.style.overflow || ''; } catch(_) {}
    document.body.style.overflow = 'hidden';
    
    console.log('Viewer display set to:', viewer.style.display);
    
    // Smooth scroll to the viewer to ensure visibility regardless of placement
    try {
      viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch(_) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Trigger slide-in animation
    setTimeout(() => {
      viewer.style.opacity = '1';
      viewer.style.transform = 'translateY(0)';
      console.log('✅ Animation triggered');
    }, 10);

    // Attach load handlers to hide spinner
    function hideLoaderSoon() {
      if (viewerLoading) {
        setTimeout(() => { viewerLoading.style.display = 'none'; }, 150);
      }
    }
    try {
      let __loaded = false;
      const markLoaded = () => { __loaded = true; hideLoaderSoon(); };
      if (viewerEmbed) viewerEmbed.onload = markLoaded;
      if (viewerIframe) viewerIframe.onload = markLoaded;
      // Fallback: hide loader after a grace period even if onload doesn't fire (some browsers/plugins)
      setTimeout(() => { if (!__loaded) hideLoaderSoon(); }, 3000);
    } catch(_) {}

    // Update URL hash for deep-linking and push state
    try {
  // Persist absolute pathname (including GitHub Pages base) for reliable deep-linking
  const absForHash = (function() { try { return new URL(resolvedHref, window.location.href).pathname; } catch(_) { return (resolvedHref.split('#')[0] || ''); } })();
      const encoded = encodeURIComponent(absForHash || '');
      __prevHash = window.location.hash || '';
      const newHash = `#cert=${encoded}`;
      const newUrl = window.location.pathname + window.location.search + newHash;
      window.history.pushState({ viewerOpen: true, cert: encoded }, '', newUrl);
    } catch(_) {}

    // Focus the Back button for accessibility
    try { viewerBack?.focus(); } catch(_) {}
  }
  
  // Function to close inline viewer
  window.closeViewer = function() {
    // Slide out animation
    viewer.style.opacity = '0';
    viewer.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      // Reset focus mode state
      try {
        viewer.classList.remove('focus-mode');
        if (btnFocus) {
          btnFocus.setAttribute('aria-pressed', 'false');
          const icon = btnFocus.querySelector('i');
          if (icon) icon.className = 'fas fa-maximize';
          btnFocus.title = 'Focus mode (X)';
        }
      } catch(_) {}

      viewer.classList.remove('active');
      viewer.style.display = 'none';
      if (viewerEmbed) viewerEmbed.setAttribute('src', '');
      if (viewerIframe) viewerIframe.setAttribute('src', '');
      if (viewerEmbed) viewerEmbed.style.display = 'block';
      if (viewerIframe) viewerIframe.style.display = 'none';

      // Restore body scroll
      try {
        document.body.style.overflow = document.body.dataset.prevOverflow || '';
        delete document.body.dataset.prevOverflow;
      } catch(_) {}

      // Clean dynamic sizing and listeners
      if (viewerContentEl) {
        viewerContentEl.style.height = '';
        viewerContentEl.style.overflow = '';
      }
      try {
        if (viewer.__sizerHandler) {
          window.removeEventListener('resize', viewer.__sizerHandler);
          viewer.__sizerHandler = null;
        }
      } catch(_) {}
      
      // Show the exact section we previously hid
      const target = window.__lastHiddenSection || resolveTargetSection(window.__lastDocLink);
      if (target) {
        target.style.display = '';
        // Restore previous scroll if available, else align to section
        if (typeof window.__prevScrollY === 'number') {
          try { window.scrollTo({ top: window.__prevScrollY, behavior: 'smooth' }); } catch(_) { window.scrollTo(0, window.__prevScrollY); }
          window.__prevScrollY = undefined;
        } else {
          try { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch(_) {}
        }
        console.log('👀 Target section restored');
      }
      
      // Restore URL hash/state without reload
      try {
        const base = window.location.pathname + window.location.search + (__prevHash || '');
        window.history.replaceState({}, '', base);
      } catch(_) {}

      // Restore focus to previously focused certificate
      try { __prevFocusedEl?.focus(); } catch(_) {}

      // Reset transform for next time
      viewer.style.transform = 'translateY(-20px)';
    }, 300);
  }
  
  // Back button click
  viewerBack.addEventListener('click', window.closeViewer);
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('active')) {
      window.closeViewer();
    }
    if (!viewer.classList.contains('active')) return;
    // Keyboard shortcuts
    const key = e.key.toLowerCase();
    if (key === 'x') {
      toggleFocusMode();
      return;
    }
    if (__activeIsPdf) {
      if (key === '+' || key === '=') { adjustPdfZoom(10); }
      if (key === '-') { adjustPdfZoom(-10); }
      if (key === 'f') { setPdfFit('page-width'); }
      if (key === 'w') { setPdfFit('page-fit'); }
    }
    if (key === 'd') { viewerDownload?.click(); }
    if (key === 't') { viewerNewTab?.click(); }
    if (key === 'p') { triggerPrint(); }
    if (key === 'c') { btnCopy?.click(); }
  });

  // Utility: remember prior scroll Y when opening
  try { window.__prevScrollY = window.scrollY; } catch(_) {}

  // PDF zoom utilities
  function setPdfFit(mode) {
    if (!__activeIsPdf || !viewerEmbed) return;
    __activeZoom = mode === 'page-fit' ? 'page-fit' : 'page-width';
    const hash = __activeZoom === 'page-fit' ? '#view=FitV' : '#zoom=page-width';
    viewerEmbed.setAttribute('src', encodeURI(__activeUrlBase) + hash);
  }
  function adjustPdfZoom(delta) {
    if (!__activeIsPdf || !viewerEmbed) return;
    let current = 100;
    if (typeof __activeZoom === 'number') current = __activeZoom;
    // If coming from a fit mode, start at 100
    let next = Math.min(500, Math.max(25, current + delta));
    __activeZoom = next;
    viewerEmbed.setAttribute('src', encodeURI(__activeUrlBase) + '#zoom=' + next);
  }

  // Print utility
  function triggerPrint() {
    const url = __activeUrlBase || viewerNewTab?.href;
    if (!url) return;
    // Best-effort: open in new tab; user prints from there
    window.open(url, '_blank');
  }

  // Button events
  btnZoomIn?.addEventListener('click', () => adjustPdfZoom(10));
  btnZoomOut?.addEventListener('click', () => adjustPdfZoom(-10));
  btnFitWidth?.addEventListener('click', () => setPdfFit('page-width'));
  btnFitPage?.addEventListener('click', () => setPdfFit('page-fit'));
  btnPrint?.addEventListener('click', triggerPrint);
  btnCopy?.addEventListener('click', async () => {
    try {
      // Copy deep-link to this page including hash with absolute pathname for reliability on nested pages
      const pathname = (function(){ try { return new URL(__activeUrlBase || '', window.location.href).pathname; } catch(_) { return (__activeUrlBase || '').split('#')[0]; } })();
      const encoded = encodeURIComponent(pathname || '');
      const toCopy = window.location.origin + window.location.pathname + window.location.search + (encoded ? `#cert=${encoded}` : '');
      if (!toCopy) return;
      await navigator.clipboard.writeText(toCopy);
      btnCopy.setAttribute('title', 'Copied!');
      setTimeout(() => btnCopy.setAttribute('title', 'Copy link (C)'), 1200);
    } catch(err) { console.warn('Copy failed', err); }
  });

  // Focus mode toggle
  function toggleFocusMode(force) {
    const enable = typeof force === 'boolean' ? force : !viewer.classList.contains('focus-mode');
    viewer.classList.toggle('focus-mode', enable);
    if (btnFocus) {
      btnFocus.setAttribute('aria-pressed', enable ? 'true' : 'false');
      const icon = btnFocus.querySelector('i');
      if (icon) icon.className = 'fas ' + (enable ? 'fa-minimize' : 'fa-maximize');
      btnFocus.title = enable ? 'Exit focus (X)' : 'Focus mode (X)';
    }
    // Recompute sizes under focus layout
    try { viewer.__sizerHandler && viewer.__sizerHandler(); } catch(_) {}
    // Ensure viewer is brought into view beneath header
    try {
      const siteHeader = document.querySelector('.header');
      const siteHeaderH = siteHeader ? siteHeader.offsetHeight : 80;
      const y = viewer.getBoundingClientRect().top + window.pageYOffset - siteHeaderH - 8;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    } catch(_) {}
  }
  btnFocus?.addEventListener('click', () => toggleFocusMode());
  
  // Shared handler to intercept doc links (click and auxclick)
  function handleDocLinkEvent(e) {
    const eventType = e.type;
    console.log(`🖱️ ${eventType} detected on:`, e.target);

    const link = e.target.closest('a[href$=".pdf"], a[href$=".PDF"], a[href*=".pdf"], a[href$=".md"], a[href$=".MD"], a[href$=".csv"], a[href$=".CSV"], a[href$=".txt"], a[href$=".TXT"]');
    console.log('📎 Found link:', link);
    if (!link) {
      if (eventType === 'click') console.log('❌ Not a PDF/document link');
      return;
    }

  console.log(`${eventType} on link:`, link.href);
    const href = link.getAttribute('href');
    console.log('📄 href attribute:', href);
    if (!href) return;

  // Remember the link for context-aware placement/hide logic
  try { window.__lastDocLink = link; } catch(_) {}

    // Allow CSV with explicit download attribute to proceed
    if (href.toLowerCase().endsWith('.csv') && link.hasAttribute('download')) {
      console.log('CSV download - allowing default behavior');
      return;
    }

    // Skip anchors and special schemes
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      console.log('Special link - not intercepting:', href);
      return;
    }

    // Same-origin check (works with relative and absolute)
    let absoluteUrl;
    try {
      absoluteUrl = new URL(href, window.location.href);
    } catch (err) {
      console.warn('Invalid URL, skipping interception:', href, err);
      return;
    }
    const sameOrigin = absoluteUrl.origin === window.location.origin;
    if (!sameOrigin) {
      console.log('External link - not intercepting:', href);
      return;
    }

    // Always intercept left, middle, ctrl/meta clicks to keep inline behavior
    const isMiddleClick = e.type === 'auxclick' && e.button === 1;
    const isModified = !!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey);

    if (e.type === 'click' || isMiddleClick) {
      console.log('✅ Intercepting link:', href, '| modified:', isModified, '| button:', e.button);
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();

      const title = link.querySelector('.file-name')?.textContent ||
                    link.querySelector('h3')?.textContent ||
                    link.querySelector('.file-info h3')?.textContent ||
                    link.querySelector('.certificate-title')?.textContent ||
                    link.textContent.trim().replace(/\s+/g, ' ') ||
                    href.split('/').pop().replace(/%20/g, ' ');
      console.log('📝 Title extracted:', title);

      if (typeof window.openViewer === 'function') {
        console.log('🚀 Calling window.openViewer...');
        window.openViewer(href, title);
      } else {
        console.error('❌ window.openViewer is NOT defined!');
      }
    }
  }

  // Intercept PDF/document links
  document.addEventListener('click', handleDocLinkEvent, true);
  document.addEventListener('auxclick', handleDocLinkEvent, true);

  // Preemptive prevention: stop default new-tab behavior early (middle/ctrl clicks)
  function preemptDocLinkDefault(e) {
    const link = e.target.closest('a[href$=".pdf"], a[href$=".PDF"], a[href*=".pdf"], a[href$=".md"], a[href$=".MD"], a[href$=".csv"], a[href$=".CSV"], a[href$=".txt"], a[href$=".TXT"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Allow CSV with explicit download attribute to proceed (no interception at preempt stage)
    if ((/\.csv$/i).test(href) && link.hasAttribute('download')) {
      return;
    }

    // Skip special protocols
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    let absoluteUrl;
    try { absoluteUrl = new URL(href, window.location.href); } catch(_) { return; }
    const sameOrigin = absoluteUrl.origin === window.location.origin;
    if (!sameOrigin) return;

    // Remove target to avoid _blank races for same-origin resources
    if (link.hasAttribute('target')) {
      try { link.removeAttribute('target'); } catch(_) {}
    }

    // For middle-click or modified clicks, prevent default early so browser doesn't open a new tab
    // Always prevent default for same-origin doc links; click handler will open inline
    if (e.type === 'pointerdown' || e.type === 'mousedown') {
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    }
  }

  // Use both pointerdown and mousedown for broader browser coverage
  document.addEventListener('pointerdown', preemptDocLinkDefault, true);
  document.addEventListener('mousedown', preemptDocLinkDefault, true);

  // Project gallery support: open .gallery-item in inline viewer instead of legacy lightbox
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    // Try to extract URL from <img src> or data attribute or inline onclick
    let url = item.querySelector('img')?.getAttribute('src') || item.getAttribute('data-src') || '';
    if (!url) {
      const onclick = (item.getAttribute('onclick') || '').toString();
      const m = onclick.match(/openLightbox\(['\"]([^'\"]+)['\"]\)/i);
      if (m) url = m[1];
    }
    if (!url) return;
    // Prevent legacy lightbox from firing
    e.preventDefault();
    e.stopPropagation();
    if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    try { window.__lastDocLink = item; } catch(_) {}
    const title = item.querySelector('.gallery-item-title')?.textContent?.trim() || item.querySelector('img')?.getAttribute('alt') || url.split('/').pop();
    if (typeof window.openViewer === 'function') {
      window.openViewer(url, title);
    }
  }, true);
  
  console.log('✅ Inline viewer initialization complete');
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInlineViewer);
} else {
  // DOM already loaded, initialize immediately
  initializeInlineViewer();
}

// Also expose initialization function globally for manual calls if needed
window.initializeInlineViewer = initializeInlineViewer;

// ===================================
// Deep-link support: open #cert=<encoded> on load, handle back
// ===================================
(function setupCertificateDeepLink() {
  function parseAndOpenFromHash() {
    const hash = window.location.hash || '';
    const m = hash.match(/#cert=([^&]+)/i);
    if (!m) return;
    const fileToken = decodeURIComponent(m[1]);
    // If the token looks like an absolute or root-relative path, use it as-is; else treat as filename
    let targetPathname = '';
    try {
      if (/^https?:\/\//i.test(fileToken)) {
        targetPathname = new URL(fileToken).pathname;
      } else if (fileToken.startsWith('/')) {
        // Normalize against site base so comparisons match what openViewer uses
        const base = (function(){
          try {
            const scripts = Array.from(document.getElementsByTagName('script'));
            const self = scripts.find(s => ((s.getAttribute('src') || '').split('?')[0] || '').endsWith('assets/js/scripts.js'));
            if (self) {
              const u = new URL(self.src, window.location.href);
              return u.pathname.replace(/assets\/js\/scripts\.js.*$/, '');
            }
          } catch(_) {}
          const parts = window.location.pathname.split('/').filter(Boolean);
          return parts.length ? `/${parts[0]}/` : '/';
        })();
        targetPathname = fileToken.startsWith(base) ? fileToken : (base.replace(/\/$/, '/') + fileToken.replace(/^\/+/, ''));
      } else {
        // It's a bare filename; keep for endsWith matching below
        targetPathname = '';
      }
    } catch(_) { targetPathname = ''; }
    // Try matching any known doc source on the page (cert cards, file links, gallery items)
    const certCards = Array.from(document.querySelectorAll('.certificate-card[data-href]'));
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img[src]'));
    let matchUrl = '';
    let matchTitle = '';
    // 1) certificate cards by data-href
    const card = certCards.find(c => {
      const href = c.getAttribute('data-href') || '';
      if (targetPathname) {
        try { return new URL(href, window.location.href).pathname === targetPathname; } catch(_) { return href.endsWith(targetPathname); }
      }
      return href.endsWith('/' + fileToken) || href.endsWith(fileToken);
    });
    if (card) {
      matchUrl = card.getAttribute('data-href') || '';
      matchTitle = card.querySelector('.certificate-title')?.textContent?.trim() || '';
    }
    // 2) anchors pointing to docs/images
    if (!matchUrl) {
      const a = anchors.find(a => {
        const href = a.getAttribute('href') || '';
        if (targetPathname) {
          try { return new URL(href, window.location.href).pathname === targetPathname; } catch(_) { return href.endsWith(targetPathname); }
        }
        return href.endsWith('/' + fileToken) || href.endsWith(fileToken);
      });
      if (a) {
        matchUrl = a.getAttribute('href') || '';
        matchTitle = a.querySelector('.file-name')?.textContent?.trim() || a.querySelector('h3')?.textContent?.trim() || a.textContent.trim();
      }
    }
    // 3) gallery images with matching src
    if (!matchUrl) {
      const img = galleryImgs.find(i => {
        const src = i.getAttribute('src') || '';
        if (targetPathname) {
          try { return new URL(src, window.location.href).pathname === targetPathname; } catch(_) { return src.endsWith(targetPathname); }
        }
        return src.endsWith('/' + fileToken) || src.endsWith(fileToken);
      });
      if (img) {
        matchUrl = img.getAttribute('src') || '';
        const titleEl = img.closest('.gallery-item')?.querySelector('.gallery-item-title');
        matchTitle = titleEl?.textContent?.trim() || img.getAttribute('alt') || '';
      }
    }
    let url = matchUrl;
    let title = matchTitle || (fileToken || '').split('/').pop().replace(/[_-]/g, ' ');
    // If still not found, resolve relative to origin using token/path
    if (!url) {
      try {
        // If we have a normalized targetPathname, use it as root-relative under origin
        if (targetPathname) {
          url = new URL(targetPathname, window.location.origin).toString();
        } else {
          url = new URL(fileToken, window.location.href).toString();
        }
      } catch(_) { url = fileToken; }
    }
    if (typeof window.openViewer === 'function') {
      window.openViewer(url, title);
    }
  }
  // On initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', parseAndOpenFromHash);
  } else {
    parseAndOpenFromHash();
  }
  // Handle back/forward: if state pops and hash has cert, open; if not, close if open
  window.addEventListener('popstate', () => {
    const hash = window.location.hash || '';
    if (/#cert=/.test(hash)) {
      parseAndOpenFromHash();
    } else {
      try { if (document.getElementById('documentViewer')?.classList.contains('active')) window.closeViewer(); } catch(_) {}
    }
  });
})();
