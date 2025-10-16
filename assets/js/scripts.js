// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  offset: 100,
  disable: false
});

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
document.addEventListener('DOMContentLoaded', () => {
  // Certificate Cards
  const certificateCards = document.querySelectorAll('.certificate-card[data-href]');
  
  certificateCards.forEach(card => {
    // Add click handler
    card.addEventListener('click', (e) => {
      // Prevent click if clicking on a link inside the card
      if (e.target.tagName === 'A') return;
      
      const href = card.getAttribute('data-href');
      if (href) {
        window.open(href, '_blank');
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
  // In-Page PDF/Document Viewer
  // ===================================
  
  // Create modal viewer HTML
  const viewerHTML = `
    <div id="documentViewer" class="document-viewer">
      <div class="document-viewer-overlay"></div>
      <div class="document-viewer-container">
        <div class="document-viewer-header">
          <h3 class="document-viewer-title"></h3>
          <button class="document-viewer-close" aria-label="Close viewer">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="document-viewer-content">
          <iframe class="document-viewer-iframe" frameborder="0"></iframe>
        </div>
        <div class="document-viewer-footer">
          <a class="document-viewer-download" download>
            <i class="fas fa-download"></i> Download
          </a>
          <a class="document-viewer-open" target="_blank">
            <i class="fas fa-external-link-alt"></i> Open in New Tab
          </a>
        </div>
      </div>
    </div>
  `;
  
  // Append viewer to body
  document.body.insertAdjacentHTML('beforeend', viewerHTML);
  
  const viewer = document.getElementById('documentViewer');
  const viewerOverlay = viewer.querySelector('.document-viewer-overlay');
  const viewerContainer = viewer.querySelector('.document-viewer-container');
  const viewerTitle = viewer.querySelector('.document-viewer-title');
  const viewerIframe = viewer.querySelector('.document-viewer-iframe');
  const viewerClose = viewer.querySelector('.document-viewer-close');
  const viewerDownload = viewer.querySelector('.document-viewer-download');
  const viewerOpen = viewer.querySelector('.document-viewer-open');
  
  // Function to open viewer
  function openViewer(url, title) {
    console.log('openViewer called with:', url, title); // Debug
    console.log('Viewer element:', viewer); // Debug
    console.log('Viewer classes before:', viewer.className); // Debug
    
    viewerTitle.textContent = title;
    viewerIframe.src = url;
    viewerDownload.href = url;
    viewerOpen.href = url;
    
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Viewer classes after:', viewer.className); // Debug
    console.log('Viewer display:', window.getComputedStyle(viewer).display); // Debug
    
    // Animate container
    setTimeout(() => {
      viewerContainer.style.transform = 'translateY(0)';
      viewerContainer.style.opacity = '1';
      console.log('Animation applied'); // Debug
    }, 10);
  }
  
  // Function to close viewer
  function closeViewer() {
    viewerContainer.style.transform = 'translateY(-50px)';
    viewerContainer.style.opacity = '0';
    
    setTimeout(() => {
      viewer.classList.remove('active');
      document.body.style.overflow = '';
      viewerIframe.src = '';
    }, 300);
  }
  
  // Close button click
  viewerClose.addEventListener('click', closeViewer);
  
  // Overlay click
  viewerOverlay.addEventListener('click', closeViewer);
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('active')) {
      closeViewer();
    }
  });
  
  // Intercept PDF/document links
  document.addEventListener('click', (e) => {
    // Check if clicked element or any parent is a PDF link
    const link = e.target.closest('a[href$=".pdf"], a[href$=".PDF"], a[href*=".pdf"], a[href$=".md"], a[href$=".MD"]');
    
    if (link && !link.hasAttribute('download')) {
      // Check if it's a relative URL (not external http/https)
      const href = link.getAttribute('href');
      console.log('PDF link clicked:', href); // Debug
      
      if (href && !href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('//')) {
        console.log('Intercepting PDF:', href); // Debug
        e.preventDefault();
        e.stopPropagation();
        
        const title = link.querySelector('.file-name')?.textContent || 
                      link.querySelector('h3')?.textContent || 
                      link.querySelector('.file-info h3')?.textContent ||
                      link.textContent.trim().replace(/\s+/g, ' ') || 
                      href.split('/').pop().replace(/%20/g, ' ').replace('.pdf', '');
        
        console.log('Opening viewer with title:', title); // Debug
        openViewer(href, title);
      }
    }
  }, true); // Use capture phase to catch events early
});
