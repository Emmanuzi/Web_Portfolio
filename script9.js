// ===== ENHANCED LOADING SCREEN FUNCTIONALITY =====
class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.mainContent = document.getElementById("mainContent");
    this.percentageElement = document.getElementById("loadingPercentage");
    this.currentPercentage = 0;
    this.targetPercentage = 100;

    this.init();
  }

  init() {
    // Preload critical assets
    this.preloadAssets();

    // Start the loading animation
    this.animatePercentage();

    // Hide loading screen after animation completes
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 3500);
  }

  preloadAssets() {
    // Preload fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "preload";
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap";
    fontLink.as = "style";
    document.head.appendChild(fontLink);

    // Preload Font Awesome
    const faLink = document.createElement("link");
    faLink.rel = "preload";
    faLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    faLink.as = "style";
    document.head.appendChild(faLink);
  }

  animatePercentage() {
    const duration = 3000;
    const startTime = Date.now();

    const updatePercentage = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      this.currentPercentage = Math.floor(easeOutQuart * this.targetPercentage);

      this.percentageElement.textContent = `${this.currentPercentage}%`;

      if (progress < 1) {
        requestAnimationFrame(updatePercentage);
      }
    };

    updatePercentage();
  }

  hideLoadingScreen() {
    this.loadingScreen.classList.add("fade-out");

    setTimeout(() => {
      this.mainContent.classList.add("show");
    }, 400);

    setTimeout(() => {
      this.loadingScreen.style.display = "none";
    }, 800);
  }
}

// ===== MAGNETIC CURSOR SYSTEM =====
class MagneticCursor {
  constructor() {
    this.cursor = document.querySelector(".custom-cursor");
    this.cursorTrail = document.querySelector(".cursor-trail");
    this.magneticElements = document.querySelectorAll(".magnetic");

    this.mouse = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.trailPos = { x: 0, y: 0 };

    this.init();
  }

  init() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    this.bindEvents();
    this.animateCursor();
  }

  bindEvents() {
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    document.addEventListener("mousedown", () => {
      this.cursor.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
      this.cursor.classList.remove("click");
    });

    // Magnetic effect for interactive elements
    this.magneticElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.cursor.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        this.cursor.classList.remove("hover");
        element.style.transform = "";
      });

      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.2;
        const deltaY = (e.clientY - centerY) * 0.2;

        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
    });
  }

  animateCursor() {
    // Smooth cursor movement
    this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * 0.1;
    this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * 0.1;

    // Trail follows with delay
    this.trailPos.x += (this.mouse.x - this.trailPos.x) * 0.05;
    this.trailPos.y += (this.mouse.y - this.trailPos.y) * 0.05;

    this.cursor.style.transform = `translate(${this.cursorPos.x - 10}px, ${
      this.cursorPos.y - 10
    }px)`;
    this.cursorTrail.style.transform = `translate(${this.trailPos.x - 4}px, ${
      this.trailPos.y - 4
    }px)`;

    requestAnimationFrame(() => this.animateCursor());
  }
}

// ===== ENHANCED MORPHING TRANSITION SYSTEM =====
class MorphingTransitions {
  constructor() {
    this.currentSection = 0;
    this.sections = document.querySelectorAll(".section-morph");
    this.morphingBg = document.querySelector(".morphing-bg");
    this.shapes = document.querySelectorAll(".shape");
    this.navLinks = document.querySelectorAll(".nav a");

    this.sectionData = [
      {
        gradient: "var(--hero-gradient)",
        shapes: [
          { top: "10%", left: "-10%", width: "300px", height: "300px" },
          { top: "60%", right: "-5%", width: "200px", height: "200px" },
          { bottom: "20%", left: "20%", width: "150px", height: "150px" },
        ],
      },
      {
        gradient: "var(--about-gradient)",
        shapes: [
          { top: "20%", right: "10%", width: "250px", height: "250px" },
          { top: "70%", left: "5%", width: "180px", height: "180px" },
          {
            bottom: "10%",
            right: "30%",
            width: "120px",
            height: "120px",
          },
        ],
      },
      {
        gradient: "var(--skills-gradient)",
        shapes: [
          { top: "15%", left: "15%", width: "200px", height: "200px" },
          { top: "50%", right: "20%", width: "160px", height: "160px" },
          { bottom: "25%", left: "40%", width: "140px", height: "140px" },
        ],
      },
      {
        gradient: "var(--education-gradient)",
        shapes: [
          { top: "25%", right: "5%", width: "220px", height: "220px" },
          { top: "65%", left: "10%", width: "170px", height: "170px" },
          {
            bottom: "15%",
            right: "25%",
            width: "130px",
            height: "130px",
          },
        ],
      },
      {
        gradient: "var(--interests-gradient)",
        shapes: [
          { top: "30%", left: "5%", width: "240px", height: "240px" },
          { top: "55%", right: "15%", width: "190px", height: "190px" },
          { bottom: "20%", left: "35%", width: "160px", height: "160px" },
        ],
      },
      {
        gradient: "var(--projects-gradient)",
        shapes: [
          { top: "20%", right: "20%", width: "280px", height: "280px" },
          { top: "60%", left: "15%", width: "200px", height: "200px" },
          {
            bottom: "10%",
            right: "10%",
            width: "150px",
            height: "150px",
          },
        ],
      },
      {
        gradient: "var(--contact-gradient)",
        shapes: [
          { top: "35%", left: "10%", width: "260px", height: "260px" },
          { top: "50%", right: "25%", width: "180px", height: "180px" },
          { bottom: "30%", left: "50%", width: "140px", height: "140px" },
        ],
      },
    ];

    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupNavigation();
    this.setupScrollHandler();
    this.setupTouchGestures();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = Array.from(this.sections).indexOf(entry.target);
          this.morphToSection(sectionIndex);
          this.animateSection(entry.target);
        }
      });
    }, options);

    this.sections.forEach((section) => observer.observe(section));
  }

  setupTouchGestures() {
    if (window.innerWidth <= 768) {
      let startY = 0;
      let startTime = 0;

      document.addEventListener(
        "touchstart",
        (e) => {
          startY = e.touches[0].clientY;
          startTime = Date.now();
        },
        { passive: true }
      );

      document.addEventListener(
        "touchend",
        (e) => {
          const endY = e.changedTouches[0].clientY;
          const endTime = Date.now();
          const deltaY = startY - endY;
          const deltaTime = endTime - startTime;

          // Swipe detection
          if (Math.abs(deltaY) > 50 && deltaTime < 300) {
            if (deltaY > 0 && this.currentSection < this.sections.length - 1) {
              // Swipe up - next section
              this.sections[this.currentSection + 1].scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            } else if (deltaY < 0 && this.currentSection > 0) {
              // Swipe down - previous section
              this.sections[this.currentSection - 1].scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }
        },
        { passive: true }
      );
    }
  }

  morphToSection(index) {
    if (index === this.currentSection) return;

    this.sections[this.currentSection].classList.remove("active");
    this.sections[this.currentSection].classList.add("leaving");

    setTimeout(() => {
      this.sections[this.currentSection].classList.remove("leaving");
    }, 600);

    this.sections[index].classList.add("active");
    this.currentSection = index;

    this.morphingBg.style.background = this.sectionData[index].gradient;

    this.shapes.forEach((shape, i) => {
      const shapeData = this.sectionData[index].shapes[i];
      if (shapeData) {
        Object.assign(shape.style, shapeData);
      }
    });

    this.updateNavigation(index);
  }

  animateSection(section) {
    const title = section.querySelector(".section-title");
    if (title) {
      setTimeout(() => title.classList.add("animate"), 200);
    }

    const staggerItems = section.querySelectorAll(".stagger-item");
    staggerItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate");
      }, 300 + index * 100);
    });

    const glassCards = section.querySelectorAll(".glass-card");
    glassCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate");
      }, 400 + index * 150);
    });

    this.handleSpecialAnimations(section);
  }

  handleSpecialAnimations(section) {
    const sectionId = section.id;

    switch (sectionId) {
      case "about":
        const profileImg = section.querySelector(".profile-img");
        const aboutTexts = section.querySelectorAll(".about-text p");

        setTimeout(() => profileImg?.classList.add("animate"), 600);
        aboutTexts.forEach((p, index) => {
          setTimeout(() => p.classList.add("animate"), 400 + index * 200);
        });
        break;

      case "skills":
        const skillCategories = section.querySelectorAll(".skill-category");
        skillCategories.forEach((category, index) => {
          setTimeout(
            () => category.classList.add("animate"),
            600 + index * 200
          );
        });
        break;

      case "education":
        const downloadBtn = section.querySelector(".download-cv");
        setTimeout(() => downloadBtn?.classList.add("animate"), 800);
        break;

      case "contact":
        const formGroups = section.querySelectorAll(".form-group");
        const submitBtn = section.querySelector(".submit-btn");

        formGroups.forEach((group, index) => {
          setTimeout(() => group.classList.add("animate"), 300 + index * 100);
        });
        setTimeout(() => submitBtn?.classList.add("animate"), 700);
        break;

      case "projects":
        const projectCards = section.querySelectorAll(".project-card");
        projectCards.forEach((card) => {
          const techTags = card.querySelectorAll(".tech-tag");
          const projectLinks = card.querySelectorAll(".project-link");

          setTimeout(() => {
            techTags.forEach((tag, index) => {
              setTimeout(
                () => (tag.style.transitionDelay = `${index * 0.1}s`),
                index * 50
              );
            });
            projectLinks.forEach((link, index) => {
              setTimeout(
                () => (link.style.transitionDelay = `${0.5 + index * 0.1}s`),
                index * 100
              );
            });
          }, 500);
        });
        break;
    }
  }

  updateNavigation(index) {
    this.navLinks.forEach((link, i) => {
      link.classList.toggle("active", i === index);
    });
  }

  setupNavigation() {
    this.navLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.sections[index].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    });
  }

  setupScrollHandler() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleParallax() {
    const scrolled = window.pageYOffset;

    this.shapes.forEach((shape, index) => {
      const speed = 0.2 + index * 0.1;
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
        scrolled * 0.05
      }deg)`;
    });
  }
}

// ===== ENHANCED FORM VALIDATION =====
class FormValidator {
  constructor() {
    this.form = document.querySelector(".contact-form");
    this.inputs = this.form.querySelectorAll(".form-input, .form-textarea");
    this.submitBtn = this.form.querySelector(".submit-btn");

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearErrors(input));
    });

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.previousElementSibling.textContent;

    // Remove existing error
    this.clearErrors(field);

    // Validation rules
    if (field.hasAttribute("required") && !value) {
      this.showError(field, `${fieldName} is required`);
      return false;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(field, "Please enter a valid email address");
        return false;
      }
    }

    return true;
  }

  showError(field, message) {
    field.style.borderColor = "#e53e3e";

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.style.cssText = `
                color: #e53e3e;
                font-size: 0.8rem;
                margin-top: 0.5rem;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            `;
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.style.opacity = "1";
      errorDiv.style.transform = "translateY(0)";
    }, 10);
  }

  clearErrors(field) {
    field.style.borderColor = "";
    const error = field.parentNode.querySelector(".field-error");
    if (error) {
      error.remove();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let isValid = true;
    this.inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    }
  }

  submitForm() {
    this.submitBtn.style.transform = "scale(0.95)";
    this.submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Sending...';
    this.submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      this.showSuccessMessage();
      this.form.reset();
      this.submitBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> Send Message';
      this.submitBtn.style.transform = "";
      this.submitBtn.disabled = false;
    }, 2000);
  }

  showSuccessMessage() {
    const successDiv = document.createElement("div");
    successDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(67, 233, 123, 0.3);
                z-index: 10000;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            `;
    successDiv.innerHTML =
      '<i class="fas fa-check-circle"></i> Message sent successfully!';

    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.style.opacity = "1";
      successDiv.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      successDiv.style.opacity = "0";
      successDiv.style.transform = "translateX(100%)";
      setTimeout(() => successDiv.remove(), 500);
    }, 3000);
  }
}

// ===== PERFORMANCE OPTIMIZATION =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.optimizeAnimations();
    this.setupServiceWorker();
  }

  setupLazyLoading() {
    const lazyElements = document.querySelectorAll(
      ".stagger-item, .glass-card"
    );

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lazy-loaded");
            lazyObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    lazyElements.forEach((el) => lazyObserver.observe(el));
  }

  optimizeAnimations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency <= 2) {
      document.documentElement.style.setProperty(
        "--animation-duration",
        "0.3s"
      );
    }

    // Pause animations when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        document.body.style.animationPlayState = "paused";
      } else {
        document.body.style.animationPlayState = "running";
      }
    });
  }

  setupServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("SW registered"))
        .catch((error) => console.log("SW registration failed"));
    }
  }
}

// ===== DARK MODE TOGGLE FUNCTIONALITY =====
const themeToggle = document.getElementById("theme-switch");
const body = document.body;

const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

if (currentTheme === "dark") {
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", function () {
  const theme = this.checked ? "dark" : "light";
  body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Animate theme transition
  body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    body.style.transition = "";
  }, 300);
});

// ===== SKILL TAGS INTERACTION =====
const skillTags = document.querySelectorAll(".skill-tag");

skillTags.forEach((tag) => {
  tag.addEventListener("click", function () {
    this.style.animation = "pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    setTimeout(() => {
      this.style.animation = "";
    }, 600);
  });
});

// ===== INITIALIZE ALL SYSTEMS =====
document.addEventListener("DOMContentLoaded", () => {
  new LoadingScreen();

  setTimeout(() => {
    new MagneticCursor();
    new MorphingTransitions();
    new FormValidator();
    new PerformanceOptimizer();
  }, 3500);

  // Animate footer social links
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const socialLinks = entry.target.querySelectorAll(".social-link");
          socialLinks.forEach((link, index) => {
            setTimeout(() => link.classList.add("animate"), index * 100);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const footer = document.querySelector(".footer");
  if (footer) observer.observe(footer);
});

// ===== PREVENT SCROLL DURING LOADING =====
document.body.style.overflow = "hidden";

setTimeout(() => {
  document.body.style.overflow = "auto";
}, 3500);

// ===== KEYBOARD NAVIGATION =====
document.addEventListener("keydown", (e) => {
  const currentSection = document.querySelector(".section-morph.active");
  const sections = Array.from(document.querySelectorAll(".section-morph"));
  const currentIndex = sections.indexOf(currentSection);

  if (e.key === "ArrowDown" && currentIndex < sections.length - 1) {
    e.preventDefault();
    sections[currentIndex + 1].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  } else if (e.key === "ArrowUp" && currentIndex > 0) {
    e.preventDefault();
    sections[currentIndex - 1].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});

// ===== LOADING ANIMATION =====
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  setTimeout(() => {
    const heroSection = document.querySelector("#home");
    if (heroSection) {
      heroSection.classList.add("active");
    }
  }, 3600);
});
