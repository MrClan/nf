// Mobile menu toggle
function toggleMenu() {
  var menu = document.getElementById('nav-menu');
  var toggle = document.querySelector('.menu-toggle');
  var isOpen = menu.classList.contains('active');

  // Close mega menu if open
  closeDiscoverMenu();

  if (isOpen) {
    menu.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  } else {
    menu.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
  }
}

// Discover Menu Functions
function toggleDiscoverMenu(event) {
  event.preventDefault();
  var megaMenu = document.getElementById('mega-menu');
  var toggle = document.querySelector('.discover-toggle');
  var isOpen = megaMenu.classList.contains('active');

  if (isOpen) {
    closeDiscoverMenu();
  } else {
    openDiscoverMenu();
  }
}

function openDiscoverMenu() {
  var megaMenu = document.getElementById('mega-menu');
  var toggle = document.querySelector('.discover-toggle');

  megaMenu.classList.add('active');
  toggle.classList.add('active');
  toggle.setAttribute('aria-expanded', 'true');

  // Focus first interactive element
  setTimeout(function () {
    var firstButton = megaMenu.querySelector('.mega-menu-category-header');
    if (firstButton) firstButton.focus();
  }, 100);
}

function closeDiscoverMenu() {
  var megaMenu = document.getElementById('mega-menu');
  var toggle = document.querySelector('.discover-toggle');

  megaMenu.classList.remove('active');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
}

function toggleCategory(button) {
  var category = button.parentElement;
  var isExpanded = category.classList.contains('expanded');
  var icon = button.querySelector('.mega-menu-category-icon');

  if (isExpanded) {
    category.classList.remove('expanded');
    button.setAttribute('aria-expanded', 'false');
    icon.textContent = '▶';
  } else {
    category.classList.add('expanded');
    button.setAttribute('aria-expanded', 'true');
    icon.textContent = '▼';
  }
}

// Close mega menu on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeDiscoverMenu();
  }
});

// Close mega menu when clicking outside
document.addEventListener('click', function (e) {
  var megaMenu = document.getElementById('mega-menu');
  var discoverToggle = document.querySelector('.discover-toggle');

  if (!megaMenu.contains(e.target) && !discoverToggle.contains(e.target)) {
    closeDiscoverMenu();
  }
});

// Search form handling
document.querySelector('.search-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var searchInput = this.querySelector('.search-input');
  var query = searchInput.value.trim();

  if (query) {
    // In a real application, this would perform the search
    console.log('Searching for:', query);

    // Show feedback to user
    var liveRegion = document.querySelector('[aria-live]');
    if (liveRegion) {
      liveRegion.textContent = 'Search initiated for: ' + query;
    }

    // Clear the input after a short delay
    setTimeout(function () {
      searchInput.value = '';
      searchInput.blur();
    }, 1000);
  }
});

// Enhanced search input focus behavior
var searchInput = document.querySelector('.search-input');
var searchForm = document.querySelector('.search-form');

searchInput.addEventListener('focus', function () {
  searchForm.style.transform = 'scale(1.02)';
});

searchInput.addEventListener('blur', function () {
  searchForm.style.transform = 'scale(1)';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('nav-menu').classList.remove('active');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  });
});

// Smooth scrolling for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = this.getAttribute('href');
    if (targetId?.trim() == '#') return;
    if (targetId.startsWith('#')) {
      var target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add focus-visible polyfill for older browsers
function addFocusVisiblePolyfill() {
  var hadKeyboardEvent = true;
  var keyboardThrottleTimeout = 100;
  var keyboardThrottleTimeoutID = 0;

  function onPointerDown() {
    hadKeyboardEvent = false;
  }

  function onKeyDown(e) {
    if (e.metaKey || e.altKey || e.ctrlKey) {
      return;
    }
    hadKeyboardEvent = true;
  }

  function onFocus(e) {
    if (hadKeyboardEvent) {
      e.target.classList.add('focus-visible');
    }
  }

  function onBlur(e) {
    e.target.classList.remove('focus-visible');
  }

  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('mousedown', onPointerDown, true);
  document.addEventListener('focus', onFocus, true);
  document.addEventListener('blur', onBlur, true);
}

// Initialize focus-visible polyfill
addFocusVisiblePolyfill();

// Enhance accessibility for keyboard navigation
document.addEventListener('keydown', function (e) {
  // Enable keyboard navigation for card hover effects
  if (e.key === 'Enter' || e.key === ' ') {
    var target = e.target;
    if (target.classList.contains('card') || target.closest('.card')) {
      var card = target.classList.contains('card') ? target : target.closest('.card');
      var link = card.querySelector('.card-link');
      if (link && target !== link) {
        e.preventDefault();
        link.click();
      }
    }
  }
});

// Add ARIA live region for dynamic content updates
var liveRegion = document.createElement('div');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.className = 'sr-only';
liveRegion.style.position = 'absolute';
liveRegion.style.left = '-10000px';
liveRegion.style.width = '1px';
liveRegion.style.height = '1px';
liveRegion.style.overflow = 'hidden';
document.body.appendChild(liveRegion);

// Intersection Observer for scroll animations (with reduced motion support)
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards for animation
  document.querySelectorAll('.card').forEach(function (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// Handle form submissions (if any forms are added later)
document.addEventListener('submit', function (e) {
  var form = e.target;
  if (form.tagName === 'FORM') {
    // Add loading state
    var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      var originalText = submitBtn.textContent || submitBtn.value;
      submitBtn.textContent = 'Loading...';

      // Re-enable after 2 seconds (adjust based on actual form handling)
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 2000);
    }
  }
});

// Enhanced error handling for images
document.querySelectorAll('.card-image').forEach(function (img) {
  img.addEventListener('error', function () {
    this.innerHTML = 'Image not available';
    this.style.backgroundColor = '#f5f5f5';
    this.style.color = '#999';
  });
});

// Print styles support
if (window.matchMedia) {
  var mediaQueryList = window.matchMedia('print');
  mediaQueryList.addListener(function (mql) {
    if (mql.matches) {
      // Hide navigation and interactive elements when printing
      document.body.classList.add('printing');
    } else {
      document.body.classList.remove('printing');
    }
  });
}

// Service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // Service worker would be registered here in a real application
    console.log('Service worker support detected');
  });
}

// High contrast mode detection and handling
if (window.matchMedia) {
  var highContrastQuery = window.matchMedia('(prefers-contrast: high)');
  function handleHighContrast(e) {
    if (e.matches) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }
  highContrastQuery.addListener(handleHighContrast);
  handleHighContrast(highContrastQuery);
}

// Reduced motion handling
if (window.matchMedia) {
  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function handleReducedMotion(e) {
    if (e.matches) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }
  reducedMotionQuery.addListener(handleReducedMotion);
  handleReducedMotion(reducedMotionQuery);
}

// Prefers color scheme handling
if (window.matchMedia) {
  var darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  function handleColorScheme(e) {
    if (e.matches) {
      document.body.classList.add('dark-mode-preferred');
    } else {
      document.body.classList.remove('dark-mode-preferred');
    }
  }
  darkModeQuery.addListener(handleColorScheme);
  handleColorScheme(darkModeQuery);
}

// scroll menu back to top
document.getElementById('scroll-to-top').addEventListener('click', function () {
  const div = document.getElementById('mega-menu');
  div.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});