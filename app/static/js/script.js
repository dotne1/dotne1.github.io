// Theme handling
const theme = {
    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light');
            const toggleButton = document.querySelector('.toggle');
            toggleButton.textContent = 'Dark Mode';
        }
        // Set initial theme based on system preference if no saved theme
        if (!savedTheme && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    },
    toggle() {
        document.body.classList.toggle('light');
        const toggleButton = document.querySelector('.toggle');
        toggleButton.textContent = document.body.classList.contains('light') ? 'Dark Mode' : 'Light Mode';
        localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    }
};

// Search functionality
const search = {
    init() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        }
    },
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const bookmarks = section.querySelectorAll('.bookmark');
            let hasVisibleBookmarks = false;
            
            bookmarks.forEach(bookmark => {
                const text = bookmark.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    bookmark.style.display = 'flex';
                    hasVisibleBookmarks = true;
                } else {
                    bookmark.style.display = 'none';
                }
            });
            
            section.style.display = hasVisibleBookmarks ? 'block' : 'none';
        });
    }
};

// Error handling
const errorHandler = {
    init() {
        window.addEventListener('error', (event) => {
            console.error('Error:', event.message);
        });
    }
};

// Mobile Detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Performance Optimization
if (isMobile) {
    document.documentElement.classList.add('mobile-device');
    if (isTouchDevice) {
        document.documentElement.classList.add('touch-device');
    }
}

// Mobile Navigation
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
let lastScrollTop = 0;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Show/hide scroll to top button
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollTop > 300) {
        scrollToTop.style.display = 'flex';
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
        setTimeout(() => {
            if (scrollTop <= 300) {
                scrollToTop.style.display = 'none';
            }
        }, 300);
    }
    
    lastScrollTop = scrollTop;
}

// Smooth Scroll
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = navbar.offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Mobile Menu
function setupMobileMenu() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
        
        // Add touch feedback
        link.addEventListener('touchstart', () => {
            link.classList.add('touch-active');
        });
        
        link.addEventListener('touchend', () => {
            link.classList.remove('touch-active');
        });
    });
}

// Loading State
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Glitch Effect Optimization
function optimizeGlitchEffect() {
    const glitchHeaders = document.querySelectorAll('.glitch-header');
    
    glitchHeaders.forEach(header => {
        if (isMobile) {
            // Reduce animation complexity on mobile
            header.style.animationDuration = '3s';
            header.style.textShadow = 'none';
        }
    });
}

// Touch Event Handling
function setupTouchEvents() {
    if (isTouchDevice) {
        // Prevent double-tap zoom
        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.target.click();
        }, { passive: false });
        
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('button, .button, .btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', () => {
                button.classList.add('touch-active');
            });
            
            button.addEventListener('touchend', () => {
                button.classList.remove('touch-active');
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupTouchEvents();
    optimizeGlitchEffect();
    
    // Scroll to top button
    const scrollToTop = document.querySelector('.scroll-to-top');
    if (scrollToTop) {
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(anchor.getAttribute('href'));
        });
    });
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        // Reset scroll position
        window.scrollTo(0, 0);
        // Re-optimize glitch effect
        optimizeGlitchEffect();
    });
    
    // Handle page visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when page is not visible
            document.body.classList.add('page-hidden');
        } else {
            document.body.classList.remove('page-hidden');
        }
    });
}); 