/* ===============================================
   ULTIMATE PORTFOLIO JAVASCRIPT
   =============================================== */

// Projects data
const projects = [
    {
        name: "Obstacle-Course",
        title: "Obstacle Course",
        description: "A Unity-based obstacle course game with various challenging levels and mechanics. Features advanced physics, dynamic obstacles, and smooth player controls.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Obstacle-Course/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Obstacle-Course",
        playUrl: "/Builds/Obstacle-Course",
        tags: ["Unity", "C#", "3D", "Physics"]
    },
    {
        name: "Flappy-Bird",
        title: "Flappy Bird",
        description: "A polished Flappy Bird clone built with Unity engine. Features smooth gameplay, responsive controls, scoring system, and procedural obstacle generation.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Flappy-Bird/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Flappy-Bird",
        playUrl: "/Builds/Flappy-Bird",
        tags: ["Unity", "C#", "2D", "Mobile"]
    },
    {
        name: "Daadi",
        title: "Daadi",
        description: "Traditional board game implemented in Unity with Photon PUN2 for real-time multiplayer. A strategic 2-player turn-based game bringing classic gameplay to modern platforms.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Daadi/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Daadi",
        playUrl: "/Builds/Daadi",
        tags: ["Unity", "C#", "Multiplayer", "PUN2"]
    },
    {
        name: "Hero-Hurdles",
        title: "Hero Hurdles",
        description: "An engaging 2D platformer game made in Unity. Navigate challenging levels, jump over obstacles, and avoid traps as you guide the hero to victory.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Hero-Hurdles/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Hero-Hurdles",
        playUrl: "/Builds/Hero-Hurdles",
        tags: ["Unity", "C#", "2D", "Platformer"]
    },
    {
        name: "Traffic-Escape",
        title: "Traffic Escape",
        description: "A challenging 2D tap-based puzzle game made in Unity. Tap cars based on their direction arrows to guide them and clear the traffic jam. Tests timing and decision-making skills.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Traffic-Escape/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Traffic-Escape",
        playUrl: "/Builds/Traffic-Escape",
        tags: ["Unity", "C#", "2D", "Puzzle"]
    }
];

class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupTypewriter();
        this.loadProjects();
        this.setupParallax();
        this.setupNavbarScroll();
        this.setupFormValidation();
        this.setupMobileMenu();
        this.setupScrollAnimations();

        // Initialize with home section
        this.updateActiveNavLink('home');

        console.log('🚀 Portfolio initialized successfully!');
    }

    setupEventListeners() {
        // Navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // CTA button clicks
        document.querySelectorAll('.cta-primary, .cta-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = btn.getAttribute('data-section');
                if (section) {
                    e.preventDefault();
                    this.navigateToSection(section);
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });

        // Window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-50% 0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.currentSection = sectionId;
                    this.updateActiveNavLink(sectionId);
                }
            });
        }, options);

        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            this.observer.observe(section);
        });
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling with easing
        this.scrollToSection = (sectionId) => {
            const target = document.getElementById(sectionId);
            if (!target) return;

            const targetPosition = target.offsetTop - 80; // Account for navbar
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(Math.abs(distance) / 2, 1000); // Dynamic duration

            let startTime = null;

            const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + (distance * ease));

                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        };
    }

    setupTypewriter() {
        const titleElement = document.querySelector('.title-text');
        if (!titleElement) return;

        const text = 'Unity Developer';
        const speed = 150;
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                titleElement.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, speed);
            }
        };

        // Start typewriter after initial animation
        setTimeout(typeWriter, 1500);
    }

    loadProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        container.innerHTML = '';

        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            projectCard.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(projectCard);
        });

        // Add scroll animation class
        container.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('fade-in');
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project', project.name);

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}"
                     onerror="this.src='https://via.placeholder.com/400x250?text=Preview+Coming+Soon'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags" style="margin-bottom: 1.5rem;">
                    ${project.tags ? project.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('') : ''}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-button github">
                        <i class="fab fa-github"></i>
                        <span>GitHub</span>
                    </a>
                    ${project.name !== "Daadi" ? `
                    <a href="${project.playUrl}" onclick="event.preventDefault(); window.open('${project.playUrl}', '_blank');" class="project-button play">
                        <i class="fas fa-gamepad"></i>
                        <span>Play Game</span>
                    </a>
                    ` : ''}
                </div>
            </div>
        `;

        // Add hover effects
        this.addProjectCardEffects(card);

        return card;
    }

    addProjectCardEffects(card) {
        const image = card.querySelector('.project-image img');

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });

        // Add click animation
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                }, 150);
            }
        });
    }

    setupParallax() {
        const shapes = document.querySelectorAll('.shape');

        window.addEventListener('scroll', () => {
            if (this.isScrolling) return;

            this.isScrolling = true;
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;

                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.1;
                    shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
                });

                this.isScrolling = false;
            });
        });
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.removeFieldError(field);

        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');

        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ff6b6b;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        setTimeout(() => errorElement.style.opacity = '1', 10);
    }

    removeFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.opacity = '0';
            setTimeout(() => errorElement.remove(), 300);
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Reset labels
            inputs.forEach(input => {
                input.classList.remove('has-value');
            });
        }, 2000);
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });

        // Add animation classes to elements
        document.querySelectorAll('.section-title').forEach(el => el.classList.add('fade-in'));
        document.querySelectorAll('.timeline-content').forEach((el, index) => {
            el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        });
        document.querySelectorAll('.stat-item').forEach(el => el.classList.add('fade-in'));
        document.querySelectorAll('.skill-tag').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('fade-in');
        });
    }

    navigateToSection(sectionId) {
        this.currentSection = sectionId;
        this.scrollToSection(sectionId);
        this.updateActiveNavLink(sectionId);

        // Update URL without triggering page reload
        history.pushState(null, null, `#${sectionId}`);
    }

    updateActiveNavLink(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    handleKeyboardNavigation(e) {
        // Arrow key navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = ['home', 'about', 'experience', 'projects', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);

            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % sections.length;
            } else {
                nextIndex = (currentIndex - 1 + sections.length) % sections.length;
            }

            this.navigateToSection(sections[nextIndex]);
        }
    }

    handleResize() {
        // Recalculate positions and update animations
        this.observer.disconnect();
        setTimeout(() => {
            document.querySelectorAll('section[id]').forEach(section => {
                this.observer.observe(section);
            });
        }, 100);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            background: ${type === 'success' ? 'var(--accent-tertiary)' : 'var(--accent-secondary)'};
            color: var(--primary-bg);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;

        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span style="margin-left: 0.5rem;">${message}</span>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
    }
}

// Enhanced Loading Animation
class LoadingManager {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;

        loader.innerHTML = `
            <div class="loader-content" style="text-align: center;">
                <div class="loader-spinner" style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(0, 212, 255, 0.3);
                    border-top: 3px solid var(--accent-primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <div style="color: var(--text-primary); font-weight: 600;">Loading Amazing Experience...</div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;

        document.body.appendChild(loader);
        return loader;
    }

    hide() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loadingManager = new LoadingManager();

    // Simulate loading time for dramatic effect
    setTimeout(() => {
        loadingManager.hide();

        // Initialize the main portfolio app
        window.portfolioApp = new PortfolioApp();

        // Add some easter eggs for developers
        console.log(`
        🎮 Welcome to Aman Kumar Matta's Portfolio!

        ╔══════════════════════════════════════╗
        ║  Built with passion and dedication   ║
        ║  Unity Developer | Game Creator      ║
        ║  Ready to build amazing experiences  ║
        ╚══════════════════════════════════════╝

        🚀 Features:
        • Smooth animations and transitions
        • Responsive design for all devices
        • Interactive elements and effects
        • Optimized performance
        • Accessibility focused

        📧 Get in touch: Let's create something amazing together!
        `);

    }, 1500);
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (e) => {
    const section = window.location.hash.substring(1) || 'home';
    if (window.portfolioApp) {
        window.portfolioApp.navigateToSection(section);
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}

// Add smooth scrolling fallback for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(smoothScrollPolyfill);
}
