document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS safely (prevents halting execution if CDN fails or is offline)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true
    });
  } else {
    console.warn('AOS library is not defined. Animations skipped.');
  }

  // Mobile menu toggle (with null checks)
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  function closeMenu() {
    navLinks.classList.remove('active');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navLinks.classList.add('active');
    menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  if (menuBtn && navLinks) {
    menuBtn.setAttribute('aria-expanded', 'false');

    menuBtn.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  // Typewriter effect (with null check)
  const typewriterElement = document.getElementById('typewriter');

  if (typewriterElement) {
    const phrases = [
      "Software Engineer",
      "Full Stack Developer",
      "Cloud Specialist",
      "Product-Minded Engineer"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, 500);
      } else {
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
      }
    }

    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
  }

  // Skills Category Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillBoxes = document.querySelectorAll('.skill-box');

  if (tabBtns.length > 0 && skillBoxes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons and add to the clicked one
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        // Step 1: Smoothly fade out all visible skill boxes
        skillBoxes.forEach(box => {
          box.style.opacity = '0';
          box.style.transform = 'translateY(15px) scale(0.95)';
          box.style.transition = 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Step 2: Swap the display states and fade the active ones back in
        setTimeout(() => {
          skillBoxes.forEach(box => {
            const boxCategory = box.getAttribute('data-category');
            if (category === 'all' || boxCategory === category) {
              box.classList.remove('hidden');
              // Trigger a browser layout recalculation/reflow to apply the transition
              void box.offsetWidth;
              box.style.opacity = '1';
              box.style.transform = 'translateY(0) scale(1)';
            } else {
              box.classList.add('hidden');
            }
          });
        }, 250);
      });
    });
  }

  // Initialize particles.js safely (using addEventListener)
  window.addEventListener('load', function() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 45,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#F0F4F8"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.8,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 10,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 220,
          "color": "#F0F4F8",
          "opacity": 0.4,
          "width": 1.8
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 200,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
    } else {
      console.warn('particlesJS is not defined. Background particles skipped.');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact Form AJAX & Toast Notification Handler
  const contactForm = document.getElementById('contact-form');
  const formOverlay = document.getElementById('form-overlay');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Select icon based on type
    const iconClass = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

    toast.innerHTML = `
      <i class="${iconClass} toast-icon" aria-hidden="true"></i>
      <div class="toast-message">${message}</div>
    `;

    // Append to container
    toastContainer.appendChild(toast);

    // Trigger animation frames for clean sliding transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
    });

    // Auto-remove after 4.5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, 4500);
  }

  if (contactForm && formOverlay) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      const action = contactForm.getAttribute('action');

      // Enable the loader overlay
      formOverlay.classList.add('active');

      // Success Callback
      function handleSuccess() {
        formOverlay.classList.remove('active');
        contactForm.reset();
        showToast(`Thank you, <strong>${name}</strong>! Your message was sent successfully. I'll get back to you shortly.`, 'success');
      }

      // Error Callback
      function handleError(errText = 'Something went wrong. Please try again.') {
        formOverlay.classList.remove('active');
        showToast(errText, 'error');
      }

      // Check if Formspree action contains a real endpoint ID
      const isRealEndpoint = action && action.startsWith('http') && !action.includes('your_id_here');

      if (isRealEndpoint) {
        const formData = new FormData(contactForm);

        fetch(action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            handleSuccess();
          } else {
            response.json().then(data => {
              if (data && data.errors) {
                handleError(data.errors.map(err => err.message).join(', '));
              } else {
                handleError('Failed to submit form. Please check your credentials.');
              }
            }).catch(() => {
              handleError('Failed to submit form. Please try again later.');
            });
          }
        })
        .catch(err => {
          console.error('Submission AJAX error:', err);
          handleError('Connection error. Please check your network and try again.');
        });
      } else {
        // High-fidelity on-page simulation (perfect out-of-the-box experience)
        setTimeout(() => {
          handleSuccess();
        }, 1800);
      }
    });
  }
});
