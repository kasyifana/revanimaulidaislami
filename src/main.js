import './style.css';

// ==========================================
// 1. Mobile Menu Toggle Responsive Handler
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
});

// ==========================================
// 2. Intersection Observer Animation Engine
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.15 // trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-fade-in');
  animatedElements.forEach(el => observer.observe(el));
});

// Note: Profile and Experience Image fallback handlers are loaded synchronously in index.html to resolve ESM load race conditions.


// ==========================================
// 5. WhatsApp Form Direct Action Router
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('send-form-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      if (!name || !message) {
        alert('Please fill out your Name and Message to connect with Revani.');
        return;
      }

      // Format WhatsApp prefilled message beautifully
      const waNumber = '62882006702566';
      const textIntro = `*Hello Revani!*%0AAn inquiry has been made from your Portfolio Website.%0A%0A`;
      const textDetails = `*Name:* ${name}%0A*Email:* ${email || 'Not specified'}%0A*Subject:* ${subject || 'General Inquiry'}%0A%0A`;
      const textMessage = `*Message:*%0A${message}`;
      
      const fullUrl = `https://wa.me/${waNumber}?text=${textIntro}${textDetails}${textMessage}`;
      
      // Open in a new tab
      window.open(fullUrl, '_blank');
    });
  }

  // ==========================================
  // 6. Achievement Certificate Modal Controller
  // ==========================================
  const seminarCard = document.getElementById('seminar-card');
  const modal = document.getElementById('achievement-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (seminarCard && modal && closeModalBtn) {
    const innerCard = modal.querySelector('div');

    const openModal = () => {
      modal.classList.remove('hidden');
      // Timeout to allow DOM layout before animation triggers
      setTimeout(() => {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        innerCard.classList.remove('scale-95');
        innerCard.classList.add('scale-100');
        document.body.classList.add('overflow-hidden');
      }, 20);
    };

    const closeModal = () => {
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      innerCard.classList.remove('scale-100');
      innerCard.classList.add('scale-95');
      document.body.classList.remove('overflow-hidden');

      // Wait for CSS animation transition to finish before hiding from DOM entirely
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
    };

    // Open when seminar card is clicked
    seminarCard.addEventListener('click', openModal);

    // Close when close button is clicked
    closeModalBtn.addEventListener('click', closeModal);

    // Close when clicking outside of the card content (on the backdrop overlay)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close when pressing Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }
});

