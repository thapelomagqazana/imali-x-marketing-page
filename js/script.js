// Toggle the fullscreen menu
function toggleMenu() {
    const menuOverlay = document.getElementById("menuOverlay");
    menuOverlay.classList.toggle("active");
}


document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item a");
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const darkModeToggle = document.querySelector("#dark-mode-checkbox");
    const progressBar = document.getElementById("progressBar");

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
        toggleMenu();
        navbar.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Dark mode toggle
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Shrink Navbar on Scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
        navbar.classList.add("shrink");
        } else {
        navbar.classList.remove("shrink");
        }
    });

    // Scroll Progress Indicator
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${scrollProgress}%`;
    });
});