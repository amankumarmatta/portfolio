document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
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

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add scroll-based navbar effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});

// Page content templates
const pages = {
    home: `
        <section class="hero">
            <div class="hero-content">
                <h1>Aman Kumar Matta</h1>
                <h2>Unity Developer</h2>
                <p class="tagline">Creating immersive experiences through innovative game development</p>
            </div>
        </section>
    `,
    about: `
        <section class="about">
            <div class="about-content">
                <h2>About Me</h2>
                <div class="about-grid">
                    <div class="about-text">
                        <p>I am a passionate Unity Developer with expertise in creating immersive gaming experiences. With a strong foundation in game development and a keen eye for detail, I specialize in building engaging and interactive games.</p>
                        <p>My journey in game development started with a deep fascination for creating virtual worlds and has evolved into a professional career focused on delivering high-quality gaming experiences.</p>
                        <div class="skills">
                            <h3>Technical Skills</h3>
                            <div class="skills-grid">
                                <div class="skill-category">
                                    <h4>Game Development</h4>
                                    <ul>
                                        <li>Unity Engine</li>
                                        <li>C# Programming</li>
                                        <li>Game Design</li>
                                        <li>3D Modeling</li>
                                    </ul>
                                </div>
                                <div class="skill-category">
                                    <h4>Programming</h4>
                                    <ul>
                                        <li>C#</li>
                                        <li>JavaScript</li>
                                        <li>Python</li>
                                        <li>Git</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    experience: `
        <section class="experience">
            <h2>Professional Experience</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>Unity 3D Developer</h3>
                        <h4>Brahman Studios</h4>
                        <p class="timeline-date">10/2024 - 03/2025</p>
                        <ul class="timeline-details">
                            <li>Gained hands-on experience in 3D space management within Unity for a cross-platform MMORPG</li>
                            <li>Implemented multi input support, enhancing gameplay accessibility across multiple platforms</li>
                            <li>Contributed to networking solutions, ensuring smooth cross-platform connectivity</li>
                            <li>Responsible for debugging, troubleshooting, and maintaining an existing codebase to improve game performance and user experience</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>Game Developer</h3>
                        <h4>Digiquest India</h4>
                        <p class="timeline-date">05/2023 - 09/2024</p>
                        <ul class="timeline-details">
                            <li>Developed multiple 2D games, gaining hands-on experience with the entire game development lifecycle</li>
                            <li>Gained expertise in creating efficient game mechanics and integrating user interfaces for 2D gameplay</li>
                            <li>Collaborated with a team to ensure smooth deployment and troubleshooting of games across various platforms</li>
                        </ul>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>Game Programmer Intern</h3>
                        <h4>Gameshastra Solutions</h4>
                        <p class="timeline-date">08/2022 - 01/2023</p>
                        <ul class="timeline-details">
                            <li>Acquired proficiency in writing optimized code, focusing on performance and scalability in multiplayer environments</li>
                            <li>Utilized scriptable objects to streamline game logic and enhance code maintainability in Unity projects</li>
                            <li>Applied Photon Unity Networking (PUN 2) to develop and implement effective multiplayer functionality for the board game 'Daadi', ensuring smooth real-time interactions</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `,
    work: `
        <section class="work">
            <h2>My Projects</h2>
            <div class="projects-grid">
                <!-- Projects will be loaded here -->
            </div>
        </section>
    `,
    contact: `
        <section class="contact">
            <h2>Get in Touch</h2>
            <div class="contact-content">
                <form class="contact-form">
                    <input type="text" placeholder="Name" required>
                    <input type="email" placeholder="Email" required>
                    <textarea placeholder="Message" required></textarea>
                    <button type="submit" class="submit-button">Send Message</button>
                </form>
                <div class="social-links">
                    <a href="#" class="social-link">GitHub</a>
                    <a href="#" class="social-link">LinkedIn</a>
                    <a href="#" class="social-link">Itch.io</a>
                </div>
            </div>
        </section>
    `
};

// Projects data
const projects = [
    {
        name: "Obstacle-Course",
        title: "Obstacle Course",
        description: "A challenging 3D obstacle course game built with Unity, featuring various obstacles and time trials.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Obstacle-Course/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Obstacle-Course",
        playUrl: "https://amankumarmatta.github.io/Obstacle-Course"
    },
    {
        name: "Flappy-Bird",
        title: "Flappy Bird",
        description: "A Unity implementation of the classic Flappy Bird game with custom features and mechanics.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Flappy-Bird/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Flappy-Bird",
        playUrl: "https://amankumarmatta.github.io/Flappy-Bird"
    },
    {
        name: "Daadi",
        title: "Daadi",
        description: "A multiplayer board game implementation using Unity and Photon Networking, featuring real-time gameplay.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Daadi/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Daadi",
        playUrl: "https://amankumarmatta.github.io/Daadi"
    },
    {
        name: "Hero-Hurdles",
        title: "Hero Hurdles",
        description: "An action-packed 2D platformer game where players navigate through various hurdles and challenges.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Hero-Hurdles/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Hero-Hurdles",
        playUrl: "https://amankumarmatta.github.io/Hero-Hurdles"
    }
];

// Function to create project card HTML
function createProjectCard(project) {
    return `
        <div class="project-card" data-project="${project.name}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Preview+Available'">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-button github">
                        <i class="fab fa-github button-icon"></i>
                        <span class="button-text">GitHub</span>
                    </a>
                    <a href="${project.playUrl}" target="_blank" rel="noopener noreferrer" class="project-button play">
                        <i class="fas fa-gamepad button-icon"></i>
                        <span class="button-text">Play Game</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Function to display projects
function displayProjects() {
    const container = document.querySelector('.projects-grid');
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing content
    projects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Handle navigation
document.addEventListener('DOMContentLoaded', () => {
    // Load home page by default
    loadPage('home');
    
    // Handle navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('href').substring(1);
            loadPage(pageId);
            window.scrollTo(0, 0);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const pageId = window.location.hash.substring(1) || 'home';
        loadPage(pageId);
    });
});

// Update the loadPage function to handle projects
function loadPage(pageId) {
    const content = document.getElementById('content');
    content.innerHTML = pages[pageId];
    
    // If loading the work page, display projects
    if (pageId === 'work') {
        displayProjects();
    }
    
    // Update active navigation link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
} 