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


    // Set the end date for the countdown (e.g., 7 days from now)
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    function updateCountdown() {
        const now = new Date();
        const timeLeft = endDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = days.toString().padStart(2, '0');
            document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
            document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById("countdown-timer").textContent = "Offer Expired!";
        }
    }

    // Update the countdown every second
    setInterval(updateCountdown, 1000);

    const fadeInElements = document.querySelectorAll(".fade-in");

    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of the element is visible
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    const lazyLoadImages = document.querySelectorAll(".lazy-load");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".lightbox-close");

    // Load images lazily
    const loadImage = (image) => {
        image.src = image.dataset.src;
        image.onload = () => {
            image.classList.add("loaded");
        };
    };

    const observerOptions1 = {
        root: null,
        threshold: 0.1,
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions1);

    lazyLoadImages.forEach((image) => {
        imageObserver.observe(image);

        // Lightbox activation
        image.addEventListener("click", () => {
            lightboxImg.src = image.dataset.src;
            lightboxCaption.textContent = image.alt;
            lightbox.style.display = "flex";
        });
    });

    // Close lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Close lightbox on outside click
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    const popup = document.getElementById("cta-popup");
    const closePopup = document.querySelector(".popup-close");
    const popupTitle = document.getElementById("popup-title");
    const popupMessage = document.getElementById("popup-message");
    const popupInterval = 60000; // Show every 60 seconds
    let popupTimer;

    // Array of popup variants
    const popupVariants = [
        {
            title: "Special Offer Just for You!",
            message: "Sign up now and get 20% off your first transaction."
        },
        {
            title: "Limited-Time Discount!",
            message: "Refer a friend and both of you get $10 credit."
        },
        {
            title: "Exclusive Deal!",
            message: "Upgrade to premium and enjoy 1-month free."
        },
    ];

    let currentVariantIndex = 0;

    // Function to update popup content
    const updatePopupContent = () => {
        const { title, message } = popupVariants[currentVariantIndex];
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        currentVariantIndex = (currentVariantIndex + 1) % popupVariants.length; // Cycle through variants
    };

    // Function to show the popup
    const showPopup = () => {
        updatePopupContent(); // Update content before showing
        popup.classList.add("show");
    };

    // Function to hide the popup and reset timer
    const hidePopup = () => {
        popup.classList.remove("show");
        popupTimer = setTimeout(showPopup, popupInterval);
    };

    // Show the popup after initial delay
    popupTimer = setTimeout(showPopup, popupInterval);

    // Close popup on clicking the close button
    closePopup.addEventListener("click", hidePopup);

    // Optionally, close popup on clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === popup) hidePopup();
    });

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