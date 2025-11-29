// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
cursorGlow.style.opacity = '1';
document.body.appendChild(cursorGlow);

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.3;
    glowY += (mouseY - glowY) * 0.3;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursorGlow);
}

animateCursorGlow();

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
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

    // Update active nav link on scroll
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Display projects on page load
    displayProjects();

    // Experience Carousel navigation
    const expPrevBtn = document.getElementById('exp-prev-btn');
    const expNextBtn = document.getElementById('exp-next-btn');
    const experienceCarousel = document.querySelector('.experience-carousel');

    if (expPrevBtn && expNextBtn && experienceCarousel) {
        expPrevBtn.addEventListener('click', () => {
            const scrollAmount = 220;
            experienceCarousel.scrollBy({
                top: -scrollAmount,
                behavior: 'smooth'
            });
        });

        expNextBtn.addEventListener('click', () => {
            const scrollAmount = 220;
            experienceCarousel.scrollBy({
                top: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Carousel navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const projectsGrid = document.querySelector('.projects-grid');

    if (prevBtn && nextBtn && projectsGrid) {
        prevBtn.addEventListener('click', () => {
            const scrollAmount = 400;
            projectsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = 400;
            projectsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

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
                        <span class="button-text">GitHub</span>
                    </a>
                    ${project.name !== "Daadi" ? `
                    <a href="${project.playUrl}" onclick="event.preventDefault(); window.open('${project.playUrl}', '_blank');" class="project-button play">
                        <span class="button-text">Play</span>
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

    // Re-add hover effects to newly created cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
}
