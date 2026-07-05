const menu = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const topButton = document.getElementById("backToTop");
const progressBar = document.getElementById("progress-bar");

// ==========================================================================
// 1. MOBILE MENU TOGGLE
// ==========================================================================
if (menu) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// ==========================================================================
// 2. GLOBAL SCROLL ENGINE (HEADER DYNAMICS, BACK TO TOP, PROGRESS BAR)
// ==========================================================================
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // A. Dynamic Header Effects
    if (scrollY > 30) {
        header.style.padding = "0";
        header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, .08)";
    } else {
        header.style.padding = ""; // Resets back to original CSS height/padding
        header.style.boxShadow = "0 2px 18px rgba(0, 0, 0, .08)";
    }

    // B. Back To Top Toggle
    if (topButton) {
        if (scrollY > 500) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    // C. Scroll Progress Bar Calculations
    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
    }
});

// Back To Top Click Action
if (topButton) {
    topButton.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

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

if (testimonialCards.length > 0 && dots.length > 0) {
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
}

// ==========================================================================
// 6. FAQ ACCORDION
// ==========================================================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // Initialize the active item on page load so it's visible instantly
    if (item.classList.contains("active") && answer) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    if (question && answer) {
        question.addEventListener("click", () => {
            // Close all other open FAQ items (Exclusive Accordion Mode)
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove("active");
                    const otherAnswer = faq.querySelector(".faq-answer");
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
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
    }
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

```
```javascript
const menu = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const topButton = document.getElementById("backToTop");
const progressBar = document.getElementById("progress-bar");

// ==========================================================================
// 1. MOBILE MENU TOGGLE
// ==========================================================================
if (menu) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

// ==========================================================================
// 2. GLOBAL SCROLL ENGINE (HEADER DYNAMICS, BACK TO TOP, PROGRESS BAR)
// ==========================================================================
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // A. Dynamic Header Effects
    if (scrollY > 30) {
        header.style.padding = "0";
        header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, .08)";
    } else {
        header.style.padding = ""; // Resets back to original CSS height/padding
        header.style.boxShadow = "0 2px 18px rgba(0, 0, 0, .08)";
    }

    // B. Back To Top Toggle
    if (topButton) {
        if (scrollY > 500) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }
    }

    // C. Scroll Progress Bar Calculations
    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = progress + "%";
    }
});

// Back To Top Click Action
if (topButton) {
    topButton.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

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

if (testimonialCards.length > 0 && dots.length > 0) {
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
}

// ==========================================================================
// 6. FAQ ACCORDION
// ==========================================================================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // Initialize the active item on page load so it's visible instantly
    if (item.classList.contains("active") && answer) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    if (question && answer) {
        question.addEventListener("click", () => {
            // Close all other open FAQ items (Exclusive Accordion Mode)
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove("active");
                    const otherAnswer = faq.querySelector(".faq-answer");
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
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
    }
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


