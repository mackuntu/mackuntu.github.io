// Professional News-Style JavaScript for MartinNotes

document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Shrinking header functionality
    function initShrinkingHeader() {
        const header = document.querySelector('.main-header');
        if (!header) return;
        
        let lastScrollTop = 0;
        let ticking = false;
        let scrollDirection = 'up';
        let scrollBuffer = 0;
        let hideTimeout = null;
        let showTimeout = null;
        let scrollVelocity = 0;
        let lastTimestamp = 0;
        let headerState = 'visible'; // 'visible', 'shrunk', 'hidden', 'showing'
        
        function updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop;
            const currentTime = performance.now();
            
            // Calculate scroll velocity
            if (currentTime - lastTimestamp > 0) {
                scrollVelocity = Math.abs(scrollDelta) / (currentTime - lastTimestamp);
            }
            lastTimestamp = currentTime;
            
            // Only update direction if scroll delta is significant (reduces jitter)
            if (Math.abs(scrollDelta) > 3) {
                scrollDirection = scrollDelta > 0 ? 'down' : 'up';
                scrollBuffer += scrollDelta;
            }
            
            // Clear any pending timeouts first
            function clearAllTimeouts() {
                if (hideTimeout) {
                    clearTimeout(hideTimeout);
                    hideTimeout = null;
                }
                if (showTimeout) {
                    clearTimeout(showTimeout);
                    showTimeout = null;
                }
            }
            
            // State machine for header behavior
            if (scrollTop <= 80) {
                // Near top - always visible
                clearAllTimeouts();
                header.classList.remove('shrunk', 'ultra-shrunk', 'show');
                headerState = 'visible';
                scrollBuffer = 0;
            } else if (scrollTop <= 300) {
                // Middle zone - shrunk but visible
                clearAllTimeouts();
                header.classList.add('shrunk');
                header.classList.remove('ultra-shrunk', 'show');
                headerState = 'shrunk';
                scrollBuffer = 0;
            } else {
                // Deep scroll zone - hide/show logic
                header.classList.add('shrunk');
                
                const isScrollingFast = scrollVelocity > 0.5;
                const hideThreshold = isScrollingFast ? 40 : 80;
                const showThreshold = isScrollingFast ? -20 : -40;
                
                if (scrollDirection === 'down' && scrollBuffer > hideThreshold && headerState !== 'hidden') {
                    clearAllTimeouts();
                    headerState = 'hiding';
                    
                    hideTimeout = setTimeout(() => {
                        header.classList.add('ultra-shrunk');
                        header.classList.remove('show');
                        headerState = 'hidden';
                        hideTimeout = null;
                        scrollBuffer = 0;
                    }, isScrollingFast ? 150 : 250);
                    
                } else if (scrollDirection === 'up' && scrollBuffer < showThreshold && headerState === 'hidden') {
                    clearAllTimeouts();
                    headerState = 'showing';
                    
                    showTimeout = setTimeout(() => {
                        header.classList.add('show');
                        headerState = 'shrunk';
                        showTimeout = null;
                        scrollBuffer = 0;
                    }, isScrollingFast ? 100 : 150);
                }
            }
            
            // Reset scroll buffer when direction changes or accumulates too much
            if ((scrollDirection === 'up' && scrollBuffer > 50) || 
                (scrollDirection === 'down' && scrollBuffer < -50) ||
                Math.abs(scrollBuffer) > 200) {
                scrollBuffer = 0;
            }
            
            // Debug logging (remove in production)
            // console.log(`Scroll: ${scrollTop}, Direction: ${scrollDirection}, Buffer: ${scrollBuffer}, State: ${headerState}`);
            
            lastScrollTop = scrollTop;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Initial check
        updateHeader();
    }
    
    // Initialize shrinking header
    initShrinkingHeader();
    
    // Console message for developers
    console.log('MartinNotes - Professional News Theme Loaded');
    console.log('Press Ctrl/Cmd + K to search');
}); 