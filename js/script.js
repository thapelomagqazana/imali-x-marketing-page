document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item a");
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const darkModeToggle = document.querySelector("#dark-mode-checkbox");

    navItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            navItems.forEach((link) => {
                if (link !== item) link.classList.add("inactive");
            });
        });

        item.addEventListener("mouseout", () => {
            navItems.forEach((link) => {
                link.classList.remove("inactive");
            });
        });
    });

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
        navbar.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Dark mode toggle
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Add shadow on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
        } else {
        navbar.classList.remove("scrolled");
        }
    });
});