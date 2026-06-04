// 1. Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.classList.add("nav-hide");
    } else {
        // Scrolling up
        navbar.classList.remove("nav-hide");
    }
    lastScrollTop = scrollTop;
});

// 2. Smooth "Apple-style" Fade Up Animations on Scroll
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1 // Triggers when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Attach observer to all elements with the 'fade-up' class
document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});
