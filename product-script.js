// Product Page - Interactive Features & Responsive Design

// Smooth scroll behavior for buttons
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scroll to sections
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add hover effects to symptom cards
  const symptomCards = document.querySelectorAll('.symptom-card');
  symptomCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // Add click animations to product cards
  const productCards = document.querySelectorAll('.card');
  productCards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'scale(1.02)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq dl dt');
  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      const dd = this.nextElementSibling;
      
      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== this) {
          const otherDd = otherItem.nextElementSibling;
          if (otherDd) {
            otherDd.style.display = 'none';
          }
        }
      });
      
      // Toggle current FAQ
      if (dd) {
        dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  // Track scroll position for analytics
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      // Store scroll percentage for engagement tracking
      sessionStorage.setItem('pageScrollPercent', Math.round(scrollPercent));
    }, 500);
  });

  // Button click tracking
  const buttons = document.querySelectorAll('.btn, .btn-cta, .btn-main');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const buttonText = this.textContent.trim();
      // Log button clicks for analytics
      console.log('Button clicked:', buttonText);
      
      // Add visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // Mobile menu responsiveness
  const headerNav = document.querySelector('.header-nav');
  if (headerNav && window.innerWidth < 768) {
    // Add mobile-specific styling if needed
    headerNav.style.flexWrap = 'wrap';
  }

  // Lazy load images when they come into view
  const images = document.querySelectorAll('img');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }

  // Handle window resize for responsive behavior
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Adjust layout if needed
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile optimizations
        document.body.style.fontSize = '14px';
      } else {
        document.body.style.fontSize = '16px';
      }
    }, 250);
  });

  // Preload next page on link hover
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  });

  console.log('Product page initialized with responsive features ✓');
});

// Handle visibility changes (user tabs away/back)
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    console.log('User left the page');
  } else {
    console.log('User returned to the page');
  }
});

// Detect user's device type and orientation
window.addEventListener('orientationchange', function() {
  console.log('Orientation changed to:', window.orientation);
  // Trigger layout adjustments if needed
  location.reload();
});
