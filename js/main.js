
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    const themeToggle = document.querySelector(".theme-toggle");

    const showMoreButton = document.querySelector(".show-more-button");
    const extraTimelineItem = document.querySelector(".timeline-extra");

    const backToTopButton = document.querySelector(".back-to-top");
    const currentYear = document.querySelector("#current-year");

    const lightbox = document.querySelector(".lightbox");
    const lightboxTitle = document.querySelector("#lightbox-title");
    const lightboxDescription = document.querySelector(".lightbox-description");
    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxImage = document.querySelector("#lightbox-image");

    const galleryItems = document.querySelectorAll(".gallery-item");

    // Display the current year.
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Mobile navigation.
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navItems.forEach((item) => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Light and dark theme.
    if (themeToggle) {
        const savedTheme = localStorage.getItem("portfolio-theme");

        if (savedTheme === "dark") {
            document.documentElement.dataset.theme = "dark";
            themeToggle.textContent = "☀";
        }

        themeToggle.addEventListener("click", () => {
            const isDark =
                document.documentElement.dataset.theme !== "dark";

            document.documentElement.dataset.theme =
                isDark ? "dark" : "light";

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            themeToggle.textContent = isDark ? "☀" : "☾";
        });
    }

    // Show more professional journey.
    if (showMoreButton && extraTimelineItem) {
        showMoreButton.addEventListener("click", () => {
            const willShow = extraTimelineItem.hidden;

            extraTimelineItem.hidden = !willShow;

            showMoreButton.setAttribute(
                "aria-expanded",
                String(willShow)
            );

            showMoreButton.textContent =
                willShow ? "Show Less −" : "Show More +";
        });
    }

    // Scroll reveal animations.
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        document.querySelectorAll(
            ".timeline-item, .interest-card, .section-heading"
        ).forEach((element) => {
            observer.observe(element);
        });
    }

    // Back to top button.
    if (backToTopButton) {
        window.addEventListener("scroll", () => {
            backToTopButton.classList.toggle(
                "visible",
                window.scrollY > 500
            );
        });

        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Close the gallery lightbox.
    const closeLightbox = () => {
        if (lightbox) {
            lightbox.hidden = true;
            document.body.style.overflow = "";
        }
    };

    // Open the gallery lightbox.
    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            if (!lightbox) return;

            const image = item.querySelector("img");

            lightboxTitle.textContent =
                item.dataset.galleryTitle || "Gallery Preview";

            lightboxDescription.textContent =
                item.dataset.galleryDescription || "";

            if (lightboxImage) {
                if (image) {
                    lightboxImage.src = image.src;
                    lightboxImage.alt = image.alt;
                    lightboxImage.hidden = false;
                } else {
                    lightboxImage.removeAttribute("src");
                    lightboxImage.hidden = true;
                }
            }

            lightbox.hidden = false;
            document.body.style.overflow = "hidden";

            if (lightboxClose) {
                lightboxClose.focus();
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close the lightbox using Escape.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
});
