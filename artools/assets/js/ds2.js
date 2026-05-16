document.addEventListener('DOMContentLoaded', () => {
            // Navigation load animation
            setTimeout(() => {
                document.querySelector('header').classList.add('loaded');
            }, 100);

            // Scroll reveal observer
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        const textWrappers = entry.target.querySelectorAll('.text-reveal-wrapper');
                        if (textWrappers.length > 0 || entry.target.classList.contains('text-reveal-wrapper')) {
                            entry.target.classList.add('reveal-active');
                        }
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            document.querySelectorAll('h1, h2, h3').forEach(el => {
                if (el.querySelector('.text-reveal-content')) observer.observe(el);
            });

            // Flashlight effect
            document.querySelectorAll('.flashlight-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                });
            });
            
            // Smooth Scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Mobile Menu Logic
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileCloseBtn = document.getElementById('mobile-close-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            function openMenu() {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = '';
            }

            if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
            if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMenu);
            
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        });