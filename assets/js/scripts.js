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
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      nav.classList.remove('active');
    }
  });
}

// ===================================
// Active Navigation Link
// ===================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

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
// Certificate Filter Functionality
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    certificateCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.style.display = 'block';
        // Re-trigger AOS animation
        card.classList.add('aos-animate');
      } else {
        card.style.display = 'none';
      }
    });
  });
});

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
      <div class="document-viewer-header-inline">
        <div class="document-viewer-title-section">
          <button class="document-viewer-back" aria-label="Back to list">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <h3 class="document-viewer-title-inline"></h3>
        </div>
        <div class="document-viewer-actions">
          <a class="document-viewer-download-inline" download>
            <i class="fas fa-download"></i> Download
          </a>
          <a class="document-viewer-newtab-inline" target="_blank">
            <i class="fas fa-external-link-alt"></i> New Tab
          </a>
        </div>
      </div>
      <div class="document-viewer-content-inline">
        <embed class="document-viewer-embed" type="application/pdf">
        <iframe class="document-viewer-iframe" style="display:none;" loading="eager"></iframe>
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
  const viewerEmbed = viewer.querySelector('.document-viewer-embed');
  const viewerIframe = viewer.querySelector('.document-viewer-iframe');
  const viewerBack = viewer.querySelector('.document-viewer-back');
  const viewerDownload = viewer.querySelector('.document-viewer-download-inline');
  const viewerNewTab = viewer.querySelector('.document-viewer-newtab-inline');
  
  // Track last clicked document link for context-aware behavior
  window.__lastDocLink = null;
  // Default main content (fallback)
  let mainContent = document.querySelector('.certificates-section, .file-download-grid, .page-content, section.section');
  
  // Function to open inline viewer
  window.openViewer = function(url, title) {
    console.log('📂 openViewer called:', { url, title });
    
    if (!viewer) {
      console.error('❌ Viewer element not found');
      return;
    }
    
    // Resolve the most relevant content block to hide based on the last clicked link
    const linkCtx = window.__lastDocLink;
    const preferredSelectors = ['.file-download-grid', '.file-list', '.gallery-grid', '.certificates-section'];
    let resolvedContent = null;
    if (linkCtx && linkCtx.closest) {
      for (const sel of preferredSelectors) {
        const candidate = linkCtx.closest(sel);
        if (candidate) { resolvedContent = candidate; break; }
      }
      if (!resolvedContent) {
        resolvedContent = linkCtx.closest('section, .container, main > section');
      }
    }
    // Fallback to previous broad query if nothing found
    mainContent = resolvedContent || document.querySelector('.certificates-section, .file-download-grid, .page-content, section.section, main > section, .container');
    console.log('Main content found:', !!mainContent, '| selector matched:', mainContent && mainContent.className);
    
    viewerTitle.textContent = title;
    // Decide renderer based on file extension
    try {
      const cleanUrl = (url || '').split('#')[0].split('?')[0].toLowerCase();
  const isPDF = cleanUrl.endsWith('.pdf');
      const isTextLike = cleanUrl.endsWith('.md') || cleanUrl.endsWith('.txt') || cleanUrl.endsWith('.csv');

      // Set links
      viewerDownload.href = url;
      viewerNewTab.href = url;

      if (isPDF) {
        // Use <embed> for PDF
        if (viewerIframe) viewerIframe.style.display = 'none';
        viewerEmbed.style.display = 'block';
        viewerEmbed.setAttribute('type', 'application/pdf');
        viewerEmbed.setAttribute('src', encodeURI(url));
        console.log('📄 Rendering as PDF via <embed>');
      } else if (isTextLike) {
        // Use <iframe> for text-like files (md/txt/csv)
        if (viewerEmbed) viewerEmbed.style.display = 'none';
        if (viewerIframe) {
          viewerIframe.style.display = 'block';
          viewerIframe.setAttribute('src', encodeURI(url));
          console.log('📝 Rendering as text via <iframe>');
        }
      } else {
        // Fallback to iframe for unknown types
        if (viewerEmbed) viewerEmbed.style.display = 'none';
        if (viewerIframe) {
          viewerIframe.style.display = 'block';
          viewerIframe.setAttribute('src', encodeURI(url));
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
      console.log('Main content hidden');
    }
    
    viewer.classList.add('active');
    viewer.style.display = 'block';
    
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
  }
  
  // Function to close inline viewer
  window.closeViewer = function() {
    // Slide out animation
    viewer.style.opacity = '0';
    viewer.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      viewer.classList.remove('active');
      viewer.style.display = 'none';
      if (viewerEmbed) viewerEmbed.setAttribute('src', '');
      if (viewerIframe) viewerIframe.setAttribute('src', '');
      if (viewerEmbed) viewerEmbed.style.display = 'block';
      if (viewerIframe) viewerIframe.style.display = 'none';
      
      // Show main content again
      const mainContent = document.querySelector('.certificates-section, .page-content, section.section, main > section, .container');
      if (mainContent) {
        mainContent.style.display = '';
      }
      
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
  });
  
  // Shared handler to intercept doc links (click and auxclick)
  function handleDocLinkEvent(e) {
    const eventType = e.type;
    console.log(`🖱️ ${eventType} detected on:`, e.target);

    const link = e.target.closest('a[href$=".pdf"], a[href$=".PDF"], a[href*=".pdf"], a[href$=".md"], a[href$=".MD"], a[href$=".csv"], a[href$=".CSV"]`);
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
    const link = e.target.closest('a[href$=".pdf"], a[href$=".PDF"], a[href*=".pdf"], a[href$=".md"], a[href$=".MD"], a[href$=".csv"], a[href$=".CSV"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

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
    const isMiddle = (e.button === 1);
    const isModified = !!(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey);
    if (e.type === 'pointerdown' || e.type === 'mousedown') {
      // Always prevent default for same-origin doc links; click handler will open inline
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    }
  }

  // Use both pointerdown and mousedown for broader browser coverage
  document.addEventListener('pointerdown', preemptDocLinkDefault, true);
  document.addEventListener('mousedown', preemptDocLinkDefault, true);
  
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
