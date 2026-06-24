// script.js - Joki Tugas Tebo Interactions

document.addEventListener('DOMContentLoaded', function () {

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        function toggleMenu() {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMenu);

        // Tutup menu saat link diklik
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Tutup menu saat klik di luar (optional)
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('open')) {
                const isClickInside = navMenu.contains(e.target) || hamburger.contains(e.target);
                if (!isClickInside) {
                    navMenu.classList.remove('open');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // ===== SCROLL ANIMATION (Intersection Observer) =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Beri delay bertahap agar lebih menarik
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -30px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback untuk browser lama
        animateElements.forEach(el => el.classList.add('visible'));
    }

    // ===== COUNTER ANIMATION (Statistik) =====
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    } else {
        // Fallback: langsung tampilkan angka
        statNumbers.forEach(el => {
            el.textContent = el.getAttribute('data-count');
        });
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 40);
        const duration = 1200;
        const stepTime = Math.floor(duration / 40);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current;
        }, stepTime);
    }

    // ===== SMOOTH SCROLL UNTUK LINK ANCHOR =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CONTACT FORM (Simulasi) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const message = document.getElementById('message')?.value || '';

            if (name && email && message) {
                // Simulasi sukses - arahkan ke WhatsApp dengan pesan otomatis
                const waMessage = `Halo Joki Tugas Tebo, saya ${name} ingin konsultasi tentang: ${message}`;
                const waUrl = `https://wa.me/6282279444635?text=${encodeURIComponent(waMessage)}`;
                window.open(waUrl, '_blank');

                // Reset form
                contactForm.reset();
            } else {
                alert('Mohon isi semua bidang dengan lengkap.');
            }
        });
    }

    // ===== ACTIVE NAV LINK (otomatis berdasarkan halaman) =====
    const currentPath = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (currentPath === 'home.html' && linkHref === 'home.html')) {
            link.classList.add('active');
        } else if (currentPath === '' && linkHref === 'home.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    console.log('Joki Tugas Tebo website loaded successfully!');
});