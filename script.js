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
                                    </ul>
                                </div>
                                <div class="skill-category">
                                    <h4>Programming</h4>
                                    <ul>
                                        <li>C#</li>
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
                        <h3>Unity XR Developer</h3>
                        <h4>AllReal (Machenn)</h4>
                        <p class="timeline-date">04/2025 - Present</p>
                    </div>
                </div>
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
                        <h3>Unity XR Developer</h3>
                        <h4>Kaala Labs</h4>
                        <p class="timeline-date">01/2024- 09/2024</p>
                        <ul class="timeline-details">
                            <li>Developed and optimized immersive VR experiences for Meta Quest 2 and Quest 3 using Unity XR Toolkit and OpenXR, ensuring smooth performance and intuitive interaction design.</li>
                            <li>Implemented AR features leveraging Unity's AR Foundation for cross-platform deployment, delivering engaging experiences on supported mobile and headset devices.</li>
                            <li>Collaborated with cross-functional teams to design, prototype, and deploy XR applications, with a focus on usability, spatial interactions, and device-specific performance optimization.</li>
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
        description: "A Unity-based obstacle course game with various challenging levels and mechanics.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Obstacle-Course/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Obstacle-Course",
        playUrl: "/Builds/Obstacle-Course"
    },
    {
        name: "Flappy-Bird",
        title: "Flappy Bird",
        description: "A simple Flappy Bird clone built using the Unity game engine. Features smooth gameplay, scoring system, and basic obstacle generation.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Flappy-Bird/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Flappy-Bird",
        playUrl: "/Builds/Flappy-Bird"
    },
    {
        name: "Daadi",
        title: "Daadi",
        description: "Daadi is a 2D traditional board game implemented in Unity with Photon PUN2 for real-time multiplayer. It's a 2-player, turn-based strategy game that brings classic gameplay to modern platforms.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Daadi/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Daadi",
        playUrl: "/Builds/Daadi"
    },
    {
        name: "Hero-Hurdles",
        title: "Hero Hurdles",
        description: "Hero Hurdles is a 2D platformer game made in Unity. Navigate challenging levels, jump over obstacles, and avoid traps as you guide the hero to victory.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Hero-Hurdles/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Hero-Hurdles",
        playUrl: "/Builds/Hero-Hurdles"
    },
    {
        name: "Traffic-Escape",
        title: "Traffic Escape",
        description: "Traffic Escape is a 2D tap-based puzzle game made in Unity. Tap cars based on their direction arrows to guide them and clear the traffic jam. A fun and challenging test of timing, focus, and quick decision-making.",
        image: "https://raw.githubusercontent.com/amankumarmatta/Traffic-Escape/main/preview.png",
        githubUrl: "https://github.com/amankumarmatta/Traffic-Escape",
        playUrl: "/Builds/Traffic-Escape"
    }
];

// Function to create project card HTML
function createProjectCard(project) {
    console.log(`Creating card for ${project.name} with play URL: ${project.playUrl}`); // Debug log
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
                    ${project.name !== "Daadi" ? `
                    <a href="${project.playUrl}" onclick="event.preventDefault(); window.open('${project.playUrl}', '_blank');" class="project-button play">
                        <i class="fas fa-gamepad button-icon"></i>
                        <span class="button-text">Play Game</span>
                    </a>
                    ` : ''}
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
