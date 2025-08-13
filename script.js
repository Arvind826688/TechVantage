// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .about-card, .testimonial-card, .contact-card, .service-category'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });

   // Google Form Integration - Enhanced UX
document.addEventListener('DOMContentLoaded', function() {
    const googleFormIframe = document.querySelector('.google-form-container iframe');
    
    if (googleFormIframe) {
        // Add loading indicator
        googleFormIframe.addEventListener('load', function() {
            console.log('Google Form loaded successfully');
            
            // Optional: Add success tracking
            const formContainer = document.querySelector('.google-form-container');
            formContainer.classList.add('form-loaded');
        });
        
        // Handle iframe errors
        googleFormIframe.addEventListener('error', function() {
            console.error('Error loading Google Form');
            const formContainer = document.querySelector('.google-form-container');
            formContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--gray-text);">
                    <h3>Unable to load contact form</h3>
                    <p>Please contact us directly at:</p>
                    <p><strong>Email:</strong> hello@techvantage.in</p>
                    <p><strong>Phone:</strong> +91 98290 12345</p>
                </div>
            `;
        });
    }
    
    // Smooth scroll to contact form when contact links are clicked
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Optional: Add a small delay then focus on the form
                setTimeout(() => {
                    const iframe = contactSection.querySelector('iframe');
                    if (iframe) {
                        iframe.focus();
                    }
                }, 500);
            }
        });
    });
});


    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Typing animation for hero tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial carousel functionality (if needed in future)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }

    // Counter animation for statistics (if added in future)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start < target) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Search functionality for services page
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const serviceItems = document.querySelectorAll('.service-item');
            
            serviceItems.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        const form = document.getElementById('contactForm');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    function removeMessages() {
        const messages = document.querySelectorAll('.success-message, .error-message');
        messages.forEach(msg => msg.remove());
    }

    // Performance optimization: Debounce scroll events
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

    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Scroll-based animations and effects
        const scrolled = window.pageYOffset;
        
        // Parallax effects
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Initialize any third-party libraries or widgets
    initializeWidgets();
    
    function initializeWidgets() {
        // Initialize any additional widgets or plugins
        console.log('TechVantage website loaded successfully!');
    }

    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });
});

// Global functions that might be needed
window.TechVantage = {
    showNotification: function(message, type = 'info') {
        // Create and show notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    scrollToElement: function(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    toggleLoader: function(show = true) {
        let loader = document.querySelector('.global-loader');
        if (show && !loader) {
            loader = document.createElement('div');
            loader.className = 'global-loader';
            loader.innerHTML = '<div class="spinner"></div>';
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            document.body.appendChild(loader);
        } else if (!show && loader) {
            loader.remove();
        }
    }
};

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #4A90E2;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
    }
`;
document.head.appendChild(style);
// Cookie Management Functions
const CookieManager = {
    // Set cookie
    setCookie: function(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    },

    // Get cookie
    getCookie: function(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    // Delete cookie
    deleteCookie: function(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },

    // Check if user has made cookie consent choice
    hasConsent: function() {
        return this.getCookie('cookie_consent') !== null;
    },

    // Set consent preferences
    setConsent: function(preferences) {
        this.setCookie('cookie_consent', JSON.stringify(preferences), 365);
        this.applyCookieSettings(preferences);
    },

    // Apply cookie settings based on user preferences
    applyCookieSettings: function(preferences) {
        // Enable/disable analytics cookies
        if (preferences.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Enable/disable functional cookies
        if (preferences.functional) {
            this.enableFunctional();
        } else {
            this.disableFunctional();
        }

        // Enable/disable marketing cookies
        if (preferences.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
    },

    // Enable analytics tracking
    enableAnalytics: function() {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    },

    // Disable analytics tracking
    disableAnalytics: function() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    },

    // Enable functional cookies
    enableFunctional: function() {
        // Enable functional features
        console.log('Functional cookies enabled');
    },

    // Disable functional cookies
    disableFunctional: function() {
        // Disable functional features
        console.log('Functional cookies disabled');
    },

    // Enable marketing cookies
    enableMarketing: function() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted'
            });
        }
    },

    // Disable marketing cookies
    disableMarketing: function() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied'
            });
        }
    },

    // Show cookie banner
    showCookieBanner: function() {
        if (this.hasConsent()) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #2c3e50; color: white; padding: 1rem; z-index: 10000; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div style="flex: 1; min-width: 300px;">
                        <p style="margin: 0; font-size: 0.9rem;">
                            We use cookies to enhance your experience and improve our services. 
                            <a href="cookie-policy.html" style="color: #4A90E2;">Learn more</a>
                        </p>
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button onclick="CookieManager.acceptAll()" style="background: #4A90E2; color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Accept All</button>
                        <button onclick="CookieManager.showPreferences()" style="background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Customize</button>
                        <button onclick="CookieManager.declineNonEssential()" style="background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">Decline</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    },

    // Accept all cookies
    acceptAll: function() {
        const preferences = {
            essential: true,
            analytics: true,
            functional: true,
            marketing: true
        };
        this.setConsent(preferences);
        this.hideCookieBanner();
    },

    // Decline non-essential cookies
    declineNonEssential: function() {
        const preferences = {
            essential: true,
            analytics: false,
            functional: false,
            marketing: false
        };
        this.setConsent(preferences);
        this.hideCookieBanner();
    },

    // Hide cookie banner
    hideCookieBanner: function() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.remove();
        }
    },

    // Show preferences modal
    showPreferences: function() {
        // Implementation for preference modal would go here
        alert('Cookie preferences modal would open here. For now, please visit our Cookie Policy page to learn more.');
    }
};

// Initialize cookie management when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show cookie banner if consent hasn't been given
    CookieManager.showCookieBanner();

    // Apply existing consent preferences
    const consent = CookieManager.getCookie('cookie_consent');
    if (consent) {
        const preferences = JSON.parse(consent);
        CookieManager.applyCookieSettings(preferences);
    }
});
