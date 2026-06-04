document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. NAVIGATION BAR SCROLL LOGIC
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && window.scrollY > lastScrollY) {
            // Scrolling down & past 100px - Hide Nav
            navbar.classList.add('hidden');
        } else {
            // Scrolling up - Show Nav
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    // ==========================================================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            
            // Toggle icon from Menu (☰) to Close (✕)
            if (navLinks.classList.contains('nav-active')) {
                mobileToggle.innerHTML = '✕';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
            } else {
                mobileToggle.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ==========================================================================
    // 3. INTERSECTION OBSERVER (SCROLL REVEAL ANIMATIONS)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is in view
        rootMargin: "0px 0px -50px 0px" 
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add visible class to trigger CSS animation
            entry.target.classList.add('is-visible');
            
            // Unobserve to ensure animation only happens once
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================================================
    // 4. FAQ ACCORDION LOGIC
    // ==========================================================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            
            // Close all other accordions first (Optional, but clean)
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                }
            });

            // Toggle current accordion
            trigger.classList.toggle('active');
            
            if (trigger.classList.contains('active')) {
                // Set max-height to the actual pixel height of the content for smooth transition
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

});
