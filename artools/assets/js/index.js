// Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        document.addEventListener("DOMContentLoaded", () => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Navigation load animation (from design_system.html)
            setTimeout(() => {
                document.querySelector('.header-nav').classList.add('loaded');
            }, 100);

            // Initialize Lenis for buttery smooth scrolling
            if (!prefersReducedMotion) {
                const lenis = new Lenis({
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    wheelMultiplier: 1,
                    smoothTouch: false,
                    touchMultiplier: 2,
                    infinite: false,
                });

                lenis.on('scroll', ScrollTrigger.update);

                gsap.ticker.add((time)=>{
                    lenis.raf(time * 1000);
                });
                
                gsap.ticker.lagSmoothing(0);
            }

            /* ====================================================================
               1. COREOGRAFIA DE ENTRADA (LOAD ANIMATION)
               ==================================================================== */
            if (!prefersReducedMotion) {
                const tlLoad = gsap.timeline({ defaults: { ease: "power4.out" } });

                // Text Reveal with Blur In
                gsap.set(".hero-title .text-reveal-content", { filter: "blur(10px)" });
                tlLoad.to(".hero-title .text-reveal-content", {
                    y: "0%",
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.15
                })
                // Paragraph & Buttons with Fade & Blur In
                .to([".hero-description", ".hero-actions"], {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    stagger: 0.2
                }, "-=0.6")
                // UI Accents
                .to([".floating-indicator", ".scroll-to-control"], {
                    opacity: 1,
                    duration: 1
                }, "-=0.5");
                
                // Initialize positions for elements that fade in and move up
                gsap.set([".hero-description", ".hero-actions"], { y: 20, opacity: 0, filter: "blur(15px)" });
            }

            /* ====================================================================
               2. VIDEO SCRUBBING & CANVAS RENDERING
               ==================================================================== */
            const canvas = document.getElementById("hero-canvas");
            const ctx = canvas.getContext("2d");
            
            // Create a video element in the DOM (hidden) to ensure proper loading
            const video = document.createElement("video");
            video.style.display = "none";
            document.body.appendChild(video);
            
            // Usando o caminho relativo correto baseado no contexto da pasta assets
            video.src = "assets/media/video2.mp4";
            video.muted = true;
            video.playsInline = true;
            video.preload = "auto";
            video.load(); // Force load

            let videoDuration = 0;

            video.addEventListener("loadedmetadata", () => {
                videoDuration = video.duration || 5; // fallback
                canvas.width = video.videoWidth || 1920;
                canvas.height = video.videoHeight || 1080;
                
                // Draw initial frame
                video.currentTime = 0;
            });

            // Wait for data to be loaded to safely draw the first frame
            video.addEventListener("loadeddata", () => {
                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            });

            // Se o usuário prefere movimento reduzido, não configuramos o scroll scrub
            if (!prefersReducedMotion) {
                // Objeto proxy para o GSAP animar (permite interpolação muito suave)
                const scrollObj = { currentTime: 0 };

                ScrollTrigger.create({
                    trigger: ".hero-track",
                    start: "top top",
                    end: "bottom bottom", // Usa a altura inteira do track (350vh)
                    scrub: 1.2, // Ease/Interpolação de 1.2 segundos (Smoothing avançado)
                    onUpdate: (self) => {
                        // Calcula o tempo alvo baseado no progresso do scroll
                        const targetTime = self.progress * videoDuration;
                        gsap.to(scrollObj, {
                            currentTime: targetTime,
                            duration: 0.5,
                            ease: "power2.out",
                            overwrite: true
                        });
                        
                        // Atualiza a barra de indicador (0 a 100%)
                        gsap.to(".indicator-line-progress", {
                            height: `${self.progress * 100}%`,
                            duration: 0.1
                        });
                        
                        // Fade in / out e Blur out dos textos e botões ao rolar para baixo
                        const fadeOutProgress = Math.max(0, Math.min(1, (self.progress - 0.01) * 5)); 
                        gsap.to([".hero-title", ".hero-description", ".hero-actions"], {
                            opacity: 1 - fadeOutProgress,
                            filter: `blur(${fadeOutProgress * 20}px)`,
                            y: fadeOutProgress * -40,
                            duration: 0.3,
                            overwrite: "auto"
                        });
                        
                        // Esconde a seta de scroll ao rolar
                        if (self.progress > 0.05) {
                            gsap.to(".scroll-to-control", { opacity: 0, filter: "blur(5px)", duration: 0.3 });
                        } else {
                            gsap.to(".scroll-to-control", { opacity: 1, filter: "blur(0px)", duration: 0.3 });
                        }
                    }
                });

                // RequestAnimationFrame loop para desenhar no canvas usando GSAP Ticker
                gsap.ticker.add(() => {
                    // Evita atualizações desnecessárias se o tempo for o mesmo
                    if (video.currentTime !== scrollObj.currentTime && video.readyState >= 2) {
                        video.currentTime = scrollObj.currentTime;
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    }
                });
            } else {
                // Com reduzido movimento, apenas damos play no vídeo estático e colocamos na tela
                video.loop = true;
                video.play();
                gsap.ticker.add(() => {
                    if (video.readyState >= 2) {
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    }
                });
            }

            // Magnetic Button Effect (Microinteração Avançada)
            const btnPrimary = document.querySelector('.btn-primary');
            if (btnPrimary && !prefersReducedMotion) {
                btnPrimary.addEventListener('mousemove', (e) => {
                    const rect = btnPrimary.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    gsap.to(btnPrimary, {
                        x: x * 0.2,
                        y: y * 0.2,
                        duration: 0.6,
                        ease: "power3.out"
                    });
                });

                btnPrimary.addEventListener('mouseleave', () => {
                    gsap.to(btnPrimary, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: "elastic.out(1, 0.3)"
                    });
                });
            }

            /* ====================================================================
               3. FEATURES SECTION GSAP ANIMATIONS
               ==================================================================== */
            if (!prefersReducedMotion) {
                // Header reveal
                gsap.fromTo(".features-header", 
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: ".features-section",
                            start: "top 80%",
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out"
                    }
                );

                // Left panel reveal
                gsap.fromTo(".reveal-left", 
                    { x: -50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: ".features-layout",
                            start: "top 80%",
                        },
                        x: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out"
                    }
                );

                // Right list items stagger reveal
                gsap.fromTo(".reveal-right", 
                    { x: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: ".features-layout",
                            start: "top 80%",
                        },
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out"
                    }
                );

                // Section 3 Parallax Video
                gsap.to(".perf-video", {
                    scrollTrigger: {
                        trigger: ".performance-section",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    },
                    yPercent: 20,
                    ease: "none"
                });

                // Section 3 Content Reveal
                gsap.fromTo(".reveal-perf-up",
                    { y: 60, opacity: 0, filter: "blur(10px)" },
                    {
                        scrollTrigger: {
                            trigger: ".performance-section",
                            start: "top 70%",
                        },
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                        stagger: 0.15,
                        ease: "power3.out"
                    }
                );

                // Section 4 Specs Reveal
                gsap.fromTo(".reveal-spec-left",
                    { opacity: 0, x: -50 },
                    {
                        scrollTrigger: {
                            trigger: ".specs-container",
                            start: "top 70%",
                        },
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out"
                    }
                );

                gsap.fromTo(".reveal-spec-right",
                    { opacity: 0, y: 50 },
                    {
                        scrollTrigger: {
                            trigger: ".specs-right",
                            start: "top 80%",
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out"
                    }
                );

                // Infinite Marquee Animation
                gsap.to(".marquee-track", {
                    xPercent: -50,
                    ease: "none",
                    duration: 20,
                    repeat: -1
                });

                // Section 5 Reveal
                gsap.fromTo(".reveal-cards-up",
                    { opacity: 0, y: 50 },
                    {
                        scrollTrigger: {
                            trigger: ".cards-section",
                            start: "top 75%",
                        },
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    }
                );

                gsap.fromTo(".reveal-card-stagger",
                    { y: 80, opacity: 0, rotationX: 15 },
                    {
                        scrollTrigger: {
                            trigger: ".cards-grid",
                            start: "top 80%",
                        },
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: "power3.out"
                    }
                );

                // Section 5: 3D Tilt Cards and Flashlight Logic
                const cards = document.querySelectorAll(".creative-card");
                
                cards.forEach(card => {
                    card.addEventListener("mousemove", (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        card.style.setProperty("--mouse-x", `${x}px`);
                        card.style.setProperty("--mouse-y", `${y}px`);
                        
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        // Limit rotation to a subtle amount (max 8 degrees)
                        const rotateX = ((y - centerY) / centerY) * -8;
                        const rotateY = ((x - centerX) / centerX) * 8;
                        
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                        card.style.transition = "transform 0.1s ease";
                    });
                    
                    card.addEventListener("mouseleave", () => {
                        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                        card.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
                    });
                });
            }

            // Mobile Menu Logic
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileCloseBtn = document.getElementById('mobile-close-btn');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const mobileNavLinksList = document.querySelectorAll('.mobile-nav-link');

            function openMenu() {
                if(mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }

            function closeMenu() {
                if(mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
            if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMenu);
            
            mobileNavLinksList.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        });