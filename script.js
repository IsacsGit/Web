// 1. Navbar Hide/Show on Scroll
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add("nav-hide"); // Scrolling down
    } else {
        navbar.classList.remove("nav-hide"); // Scrolling up
    }
    lastScrollTop = scrollTop;
});

// 2. Smooth "Apple-style" Fade Up Animations on Scroll
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
});

// 3. FAQ Accordion Logic (For Support Page)
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Toggle the active class for the icon rotation
        question.classList.toggle('active');
        
        // Find the answer directly beneath the clicked question
        const answer = question.nextElementSibling;
        
        // Smooth slide down/up
        if (question.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = 0;
        }
    });
});
