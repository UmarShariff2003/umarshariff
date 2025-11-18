// theme.js

// Read CSS variables into a JS theme object
function getThemeTokens() {
  const styles = getComputedStyle(document.documentElement);

  const keys = [
    "--color-bg",
    "--color-bg-elevated",
    "--color-surface",
    "--color-text-primary",
    "--color-text-secondary",
    "--color-text-muted",
    "--color-accent",
    "--color-accent-soft",
    "--color-btn-bg",
    "--color-btn-bg-hover",
    "--color-btn-text",
  ];

  const theme = {};
  keys.forEach((key) => {
    theme[key.replace("--", "")] = styles.getPropertyValue(key).trim();
  });

  return theme;
}

// Example: log once on load so you can inspect & reuse
document.addEventListener("DOMContentLoaded", () => {
  const theme = getThemeTokens();
  console.log("Current theme tokens:", theme);
});

// ====== MOBILE NAVBAR TOGGLE ======
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileLinks = document.querySelectorAll(".nav-mobile a");

  // Toggle open/close when clicking the hamburger
  toggle.addEventListener("click", () => {
    header.classList.toggle("nav-open");
  });

  // Close menu when any mobile link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
    });
  });
});

// ====== CONTACT FORM SUBMISSION WITH EMAILJS ======
  document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS
  emailjs.init("JVa_6vRwOIXMqLXQg"); 

  const form = document.getElementById("contactForm");
  const btn = form.querySelector(".primary-btn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button while sending
    btn.textContent = "Sending...";
    btn.disabled = true;

    // Send email
    emailjs
      .send("service_h76vwyw", "template_rtaar78", {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        phone: form.phone.value,
        email: form.email.value,
        message: form.message.value,
      })
      .then(() => {
        // SUCCESS
        alert("✅ Message sent successfully!");

        // RESET THE FORM COMPLETELY
        form.reset();

        // Re-enable button
        btn.textContent = "Submit";
        btn.disabled = false;
      })
      .catch((error) => {
        // ERROR
        console.error("EmailJS Error:", error);
        alert("❌ Failed to send message. Please try again.");

        // Reset button
        btn.textContent = "Submit";
        btn.disabled = false;

        // OPTIONAL: also reset form on error
        form.reset();
      });
  });
});
