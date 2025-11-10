// General site scripts for UTA Manpower Service
document.addEventListener('DOMContentLoaded', function () {
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('header nav');

    if (mobileMenu && nav) {
        mobileMenu.addEventListener('click', function () {
            nav.classList.toggle('active');
        });

        // Close menu when clicking a nav link
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
            });
        });

        // Close menu when scrolling
        window.addEventListener('scroll', function () {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    }

    // ===== TESTIMONIAL SLIDER (TEXT CARDS) =====
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach(function (slide) {
            slide.classList.remove('active');
        });
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn && slides.length) {
        prevBtn.addEventListener('click', function () {
            showSlide(currentSlide - 1);
        });
        nextBtn.addEventListener('click', function () {
            showSlide(currentSlide + 1);
        });
    }

    // ===== VIDEO TESTIMONIAL MODAL =====
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalClose = document.querySelector('.video-modal-close');

    if (videoCards.length && videoModal && modalVideo) {
        videoCards.forEach(function (card) {
            card.addEventListener('click', function () {
                const src = card.getAttribute('data-video');
                const sourceEl = modalVideo.querySelector('source');
                if (sourceEl) {
                    sourceEl.src = src;
                    modalVideo.load();
                    modalVideo.play();
                }
                videoModal.classList.add('open');
            });
        });

        const closeModal = function () {
            videoModal.classList.remove('open');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.currentTime = 0;
                const sourceEl = modalVideo.querySelector('source');
                if (sourceEl) {
                    sourceEl.src = '';
                    modalVideo.load();
                }
            }
        };

        // Direct click on the X (desktop + most devices)
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Click on dark background closes modal
        videoModal.addEventListener('click', function (e) {
            if (e.target === videoModal) {
                closeModal();
            }
        });

        // 🔒 Extra-safe: delegated handler so any tap on the X works (mobile too)
        document.addEventListener('click', function (e) {
            if (e.target.classList && e.target.classList.contains('video-modal-close')) {
                closeModal();
            }
        });

        // Optional: handle touchstart for older mobile browsers
        document.addEventListener('touchstart', function (e) {
            if (e.target.classList && e.target.classList.contains('video-modal-close')) {
                closeModal();
            }
        }, { passive: true });
    }

    // ===== CONTACT FORM SIMPLE HANDLER =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameEl = document.getElementById('name');
            const emailEl = document.getElementById('email');
            const subjectEl = document.getElementById('subject');
            const name = nameEl ? nameEl.value : 'Friend';
            const email = emailEl ? emailEl.value : '';
            const subject = subjectEl ? subjectEl.value : '';
            alert(`Thank you, ${name}! Your message about "${subject}" has been received. We'll contact you at ${email} soon.`);
            contactForm.reset();
        });
    }

    // ===== SMOOTH SCROLL FOR IN-PAGE LINKS (HOME HERO BUTTONS) =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== STICKY HEADER SHADOW =====
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
});
