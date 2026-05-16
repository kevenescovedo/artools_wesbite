// Intersection Observer for Reveals (Re-used from original)
        document.addEventListener('DOMContentLoaded', () => {

            // 1. Initial Hero Animations
            setTimeout(() => {
                document.querySelector('header').classList.add('loaded');
            }, 100);

            setTimeout(() => {
                const heroTitle = document.getElementById('hero-title');
                if (heroTitle) heroTitle.classList.add('reveal-active');
            }, 500);

            setTimeout(() => {
                document.querySelectorAll('.hero-badge, .hero-stat').forEach(el => {
                    el.classList.add('active');
                });
            }, 500);

            // 2. Scroll Observer
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        // Add reveal-active to children if they exist (for text reveals)
                        const textWrappers = entry.target.querySelectorAll('.text-reveal-wrapper');
                        if (textWrappers.length > 0 || entry.target.classList.contains('text-reveal-wrapper')) {
                            entry.target.classList.add('reveal-active');
                        }
                        // Handle internal text reveal wrappers specifically (like the Motion section h2)
                        if (entry.target.tagName === 'H2' || entry.target.tagName === 'H1') {
                            entry.target.classList.add('reveal-active');
                        }
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

            // Observe custom text reveal sections if they are not inside a .reveal container
            document.querySelectorAll('h1, h2').forEach(el => {
                if (el.querySelector('.text-reveal-content')) observer.observe(el);
            });

            // 3. Carousel Logic
            const slides = document.querySelectorAll('.carousel-slide');
            let currentSlide = 0;
            if (slides.length > 0) {
                setInterval(() => {
                    slides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide + 1) % slides.length;
                    slides[currentSlide].classList.add('active');
                }, 5000);
            }


            // 4. Parallax Logic
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                document.querySelectorAll('.parallax-img').forEach((el) => {
                    const speed = el.dataset.speed || 0.1;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        });