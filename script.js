// ========================================
// SCRIPT.JS - CAMPOS LAW FIRM
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const header = document.querySelector('.header');
  const userIcon = document.getElementById('userIcon');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.getElementById('modalClose');
  const loginForm = document.getElementById('loginForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const caseModal = document.getElementById('caseModal');
  const openCaseModal = document.getElementById('openCaseModal');
  const caseModalClose = document.getElementById('caseModalClose');
  const caseForm = document.getElementById('caseForm');

  // ========================================
  // MENÚ MÓVIL
  // ========================================
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // ========================================
  // MODAL LOGIN
  // ========================================
  if (userIcon && loginModal) {
    userIcon.addEventListener('click', () => {
      loginModal.classList.add('active');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      loginModal.classList.remove('active');
    });
  }

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('active');
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Funcionalidad de login en desarrollo');
    });
  }

  // ========================================
  // MODAL CASE FORM (Cuéntanos tu caso)
  // ========================================
  if (openCaseModal && caseModal) {
    openCaseModal.addEventListener('click', () => {
      caseModal.classList.add('active');
    });
  }

  if (caseModalClose) {
    caseModalClose.addEventListener('click', () => {
      caseModal.classList.remove('active');
    });
  }

  if (caseModal) {
    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) {
        caseModal.classList.remove('active');
      }
    });
  }

  if (caseForm) {
    caseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Mensaje enviado! Te contactaremos pronto.');
      caseModal.classList.remove('active');
      caseForm.reset();
    });
  }

  // ========================================
  // NEWSLETTER
  // ========================================
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por suscribirte! (Funcionalidad en desarrollo)');
      newsletterForm.reset();
    });
  }

  // ========================================
  // INICIALIZAR FUNCIONES
  // ========================================
  initializeScrollAnimations();
  initializeCounters();
  initializePricingToggle();
});

// ========================================
// ANIMACIONES AL SCROLL
// ========================================
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// CONTADOR ANIMADO
// ========================================
function initializeCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 2000;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const increment = target / (speed / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.innerText = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => observer.observe(counter));
}

// ========================================
// SWITCH DE PRECIOS MENSUAL/ANUAL
// ========================================
function initializePricingToggle() {
  const toggle = document.getElementById('pricingToggle');
  if (!toggle) return;

  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const amounts = document.querySelectorAll('.pricing-price .amount[data-monthly]');
  const annualNotes = document.querySelectorAll('.annual-note');

  let isAnnual = false;

  toggle.addEventListener('click', () => {
    isAnnual = !isAnnual;

    toggle.classList.toggle('annual');
    monthlyLabel.classList.toggle('active');
    annualLabel.classList.toggle('active');

    amounts.forEach(amount => {
      const monthly = parseFloat(amount.getAttribute('data-monthly'));
      const annual = parseFloat(amount.getAttribute('data-annual'));
      const price = isAnnual ? annual : monthly;
      amount.innerText = '$' + price;
    });

    annualNotes.forEach(note => {
      note.style.display = isAnnual ? 'block' : 'none';
    });
  });
}

// ========================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});