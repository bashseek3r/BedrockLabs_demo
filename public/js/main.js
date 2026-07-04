const menu = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("header");

// ==========================================================================
// 1. MOBILE MENU TOGGLE
// ==========================================================================
menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// ==========================================================================
// 2. DYNAMIC HEADER EFFECTS ON SCROLL
// ==========================================================================
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.style.padding = "0";
        header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, .08)";
    } else {
        header.style.padding = ""; // Resets back to your original CSS height/padding
        header.style.boxShadow = "0 2px 18px rgba(0, 0, 0, .08)";
    }
});

// ==========================================================================
// 3. SCROLL ANIMATION (GLOBAL UTILITY)
// ==========================================================================
// This tracks ANY element across your pages given the .animate-on-scroll class
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2 // Triggers when 20% of the element becomes visible on screen
});

animatedElements.forEach(element => {
    element.classList.add("hidden"); // Pre-hides elements so they can fade-in smoothly via CSS
    observer.observe(element);
});

// ==========================================================================
// 4. ANIMATED COUNTERS ENGINE
// ==========================================================================
// Automatically animates numerical values when stats roll into view
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // If the stats block isn't on screen yet, do nothing
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target; // Converts string data attribute to a number
        let count = 0;
        const speed = target / 80; // Controls increment rate dynamically based on target size

        const update = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(update); // Leverages native hardware browser frame rates
            } else {
                counter.innerText = target; // Guarantees it lands dead-on your final target value
            }
        };

        update();
        counterObserver.unobserve(counter); // Stops watching once the calculation finishes running
    });
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ==========================================================================
// 5. TESTIMONIALS SLIDER
// ==========================================================================
const testimonialCards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index) {
    testimonialCards.forEach(card => card.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    testimonialCards[index].classList.add("active");
    dots[index].classList.add("active");
}

// Click-to-slide navigation dots
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Automated transition interval (Loops every 5 seconds)
setInterval(() => {
    currentSlide++;

    if (currentSlide >= testimonialCards.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}, 5000);

// ==========================================================================
// 6. FAQ ACCORDION
// ==========================================================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // Initialize the active item on page load so it's visible instantly
    if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    question.addEventListener("click", () => {
        // Close all other open FAQ items (Exclusive Accordion Mode)
        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove("active");
                faq.querySelector(".faq-answer").style.maxHeight = null;
            }
        });

        // Toggle the current item
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// ==========================================================================
// 7. APPOINTMENT FORM HANDLING
// ==========================================================================
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        alert("Thank you! Your appointment request has been received.");
        appointmentForm.reset();
    });
}

