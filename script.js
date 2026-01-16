document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Custom Cursor Logic ---
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    // Add 'a' tags, buttons, and gallery items to hover list
    const hoverLinks = document.querySelectorAll('a, .gallery-item, button, .cta-btn, .insta-btn');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Reactive State
    hoverLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovered');
            cursorDot.style.opacity = '0'; 
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hovered');
            cursorDot.style.opacity = '1';
        });
    });


    // --- 2. Scroll Animation ---
    const observerOptions = {
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 3. Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollY / 700);
        }
    });

    // --- 4. Glitch Effect ---
    const glitchText = document.querySelector('.glitch-text');
    if(glitchText) {
        setInterval(() => {
            glitchText.style.textShadow = `
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 #d4af37,
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 #ff0000
            `;
            setTimeout(() => {
                glitchText.style.textShadow = 'none';
            }, 100);
        }, 3000);
    }
});
