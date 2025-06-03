// Professional News-Style JavaScript for MartinNotes

document.addEventListener('DOMContentLoaded', function() {
    
    // Utility function: debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navSections = document.querySelector('.nav-sections');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle hamburger animation
            const lines = this.querySelectorAll('.hamburger-line');
            lines.forEach((line, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) line.style.opacity = '0';
                    if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    line.style.transform = '';
                    line.style.opacity = '';
                }
            });
            
            // Toggle navigation visibility
            if (navSections) {
                navSections.style.display = navSections.style.display === 'flex' ? 'none' : 'flex';
                navSections.style.flexDirection = 'column';
                navSections.style.position = 'absolute';
                navSections.style.top = '100%';
                navSections.style.left = '0';
                navSections.style.right = '0';
                navSections.style.backgroundColor = '#ffffff';
                navSections.style.border = '1px solid #e2e2e2';
                navSections.style.padding = '20px';
                navSections.style.zIndex = '1000';
            }
        });
    }
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    let searchOverlay = null;
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (!searchOverlay) {
                createSearchOverlay();
            }
            searchOverlay.style.display = 'flex';
            const searchInput = searchOverlay.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        });
    }
    
    function createSearchOverlay() {
        searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <h3>Search MartinNotes</h3>
                    <button class="search-close" aria-label="Close search">&times;</button>
                </div>
                <div class="search-form">
                    <input type="text" class="search-input" placeholder="Search articles..." autocomplete="off">
                    <button class="search-submit">Search</button>
                </div>
                <div class="search-results"></div>
            </div>
        `;
        
        // Add styles
        searchOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: none;
            align-items: flex-start;
            justify-content: center;
            padding-top: 100px;
            z-index: 2000;
        `;
        
        const searchContainer = searchOverlay.querySelector('.search-container');
        searchContainer.style.cssText = `
            background: white;
            border-radius: 8px;
            padding: 30px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        const searchHeader = searchOverlay.querySelector('.search-header');
        searchHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #e2e2e2;
            padding-bottom: 15px;
        `;
        
        const searchClose = searchOverlay.querySelector('.search-close');
        searchClose.style.cssText = `
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            padding: 5px;
        `;
        
        const searchForm = searchOverlay.querySelector('.search-form');
        searchForm.style.cssText = `
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        `;
        
        const searchInput = searchOverlay.querySelector('.search-input');
        searchInput.style.cssText = `
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            outline: none;
        `;
        
        const searchSubmit = searchOverlay.querySelector('.search-submit');
        searchSubmit.style.cssText = `
            padding: 12px 24px;
            background: #326891;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
        `;
        
        document.body.appendChild(searchOverlay);
        
        // Event listeners
        searchClose.addEventListener('click', function() {
            searchOverlay.style.display = 'none';
        });
        
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.style.display = 'none';
            }
        });
        
        // Simple search functionality
        const searchInputEl = searchOverlay.querySelector('.search-input');
        const searchResults = searchOverlay.querySelector('.search-results');
        
        function performSearch(query) {
            if (!query.trim()) {
                searchResults.innerHTML = '';
                return;
            }
            
            // This is a simple client-side search
            // In a real implementation, you'd want to use Jekyll search or a search service
            const posts = document.querySelectorAll('.story-card, .featured-story');
            const results = [];
            
            posts.forEach(post => {
                const title = post.querySelector('h3, h2, h1');
                const content = post.querySelector('.story-excerpt, p');
                
                if (title && content) {
                    const titleText = title.textContent.toLowerCase();
                    const contentText = content.textContent.toLowerCase();
                    const queryLower = query.toLowerCase();
                    
                    if (titleText.includes(queryLower) || contentText.includes(queryLower)) {
                        const link = title.querySelector('a');
                        if (link) {
                            results.push({
                                title: title.textContent,
                                excerpt: content.textContent.substring(0, 150) + '...',
                                url: link.href
                            });
                        }
                    }
                }
            });
            
            displaySearchResults(results, query);
        }
        
        function displaySearchResults(results, query) {
            if (results.length === 0) {
                searchResults.innerHTML = `<p style="color: #666; text-align: center; padding: 20px;">No results found for "${query}"</p>`;
                return;
            }
            
            const resultsHTML = results.map(result => `
                <div style="border-bottom: 1px solid #f0f0f0; padding: 15px 0;">
                    <h4 style="margin-bottom: 8px;">
                        <a href="${result.url}" style="color: #326891; text-decoration: none;">${result.title}</a>
                    </h4>
                    <p style="color: #666; font-size: 14px; line-height: 1.4;">${result.excerpt}</p>
                </div>
            `).join('');
            
            searchResults.innerHTML = `
                <div style="margin-bottom: 15px; color: #666;">
                    Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"
                </div>
                ${resultsHTML}
            `;
        }
        
        searchInputEl.addEventListener('input', function() {
            performSearch(this.value);
        });
        
        searchSubmit.addEventListener('click', function() {
            performSearch(searchInputEl.value);
        });
        
        searchInputEl.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Newsletter form enhancement
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('.email-input');
            const submitBtn = this.querySelector('.subscribe-btn');
            
            if (emailInput && submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                // Reset after 3 seconds (in real implementation, handle the actual response)
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        emailInput.value = '';
                    }, 2000);
                }, 1000);
            }
        });
    }
    
    // Add reading progress indicator for long articles
    function addReadingProgress() {
        const article = document.querySelector('article, .post-content');
        if (!article) return;
        
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #326891;
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        function updateProgress() {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = Math.min(
                Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
                1
            );
            
            progressBar.style.width = (progress * 100) + '%';
        }
        
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
    
    // Initialize reading progress on article pages
    if (document.body.classList.contains('layout-post')) {
        addReadingProgress();
    }
    
    // Lazy loading for images (if not using Jekyll's lazy loading)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading if supported
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes search overlay
        if (e.key === 'Escape' && searchOverlay && searchOverlay.style.display === 'flex') {
            searchOverlay.style.display = 'none';
        }
        
        // Ctrl/Cmd + K opens search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchBtn) {
                searchBtn.click();
            }
        }
    });
    
    // Add focus management for accessibility
    function manageFocus() {
        let focusedElementBeforeModal;
        
        // Store focus when opening modals
        document.addEventListener('click', function(e) {
            if (e.target.matches('.search-btn')) {
                focusedElementBeforeModal = e.target;
            }
        });
        
        // Restore focus when closing modals
        if (searchOverlay) {
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        if (searchOverlay.style.display === 'none' && focusedElementBeforeModal) {
                            focusedElementBeforeModal.focus();
                            focusedElementBeforeModal = null;
                        }
                    }
                });
            });
            
            observer.observe(searchOverlay, { attributes: true });
        }
    }
    
    manageFocus();
    
    // Shrinking header functionality - DISABLED for minimalistic design
    /*
    function initShrinkingHeader() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        let lastScrollY = 0;
        let ticking = false;
        let currentState = 'visible';
        let targetState = 'visible';
        let isTransitioning = false;
        
        // Add CSS for smoother transitions
        const style = document.createElement('style');
        style.textContent = `
            .main-header {
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                will-change: transform;
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
                transform: translateZ(0);
            }
            
            .main-header.no-transition {
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
        
        function updateHeaderState() {
            const scrollY = window.pageYOffset;
            const scrollDelta = scrollY - lastScrollY;
            const scrollDirection = scrollDelta > 0 ? 'down' : 'up';
            
            // Determine target state based on scroll position
            if (scrollY <= 80) {
                targetState = 'visible';
            } else if (scrollY <= 300) {
                targetState = 'shrunk';
            } else {
                // Only hide on scroll down, show on scroll up
                if (scrollDirection === 'down' && Math.abs(scrollDelta) > 5) {
                    targetState = 'hidden';
                } else if (scrollDirection === 'up' && Math.abs(scrollDelta) > 5) {
                    targetState = 'shrunk';
                }
            }
            
            // Apply state changes if needed
            if (targetState !== currentState && !isTransitioning) {
                isTransitioning = true;
                
                // Remove all classes first
                header.classList.remove('shrunk', 'ultra-shrunk', 'show');
                
                // Apply new state
                switch (targetState) {
                    case 'visible':
                        // Default state, no classes needed
                        break;
                    case 'shrunk':
                        header.classList.add('shrunk');
                        break;
                    case 'hidden':
                        header.classList.add('shrunk', 'ultra-shrunk');
                        break;
                }
                
                currentState = targetState;
                
                // Reset transition flag after animation completes
                setTimeout(() => {
                    isTransitioning = false;
                }, 300);
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeaderState);
                ticking = true;
            }
        }
        
        // Use passive listener for better performance
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Handle initial state
        updateHeaderState();
        
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            header.classList.add('no-transition');
            updateHeaderState();
            setTimeout(() => {
                header.classList.remove('no-transition');
            }, 100);
        }, 250), { passive: true });
    }
    */
    
    // Initialize shrinking header - DISABLED
    // initShrinkingHeader();
    
    // Console message for developers
    console.log('MartinNotes - Professional News Theme Loaded');
    console.log('Press Ctrl/Cmd + K to search');
}); 