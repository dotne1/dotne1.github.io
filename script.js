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

// Scroll to top functionality
const scrollButton = document.createElement('button');
scrollButton.className = 'scroll-to-top';
scrollButton.innerHTML = '↑';
scrollButton.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollButton);

function toggleScrollButton() {
    if (window.scrollY > 200) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
}

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', toggleScrollButton);
toggleScrollButton(); // Initial check

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    theme.init();
    search.init();
    errorHandler.init();
}); 