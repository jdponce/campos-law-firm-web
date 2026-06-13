// Header scroll effect y menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const header = document.querySelector('.header');
  const userIcon = document.getElementById('userIcon');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.getElementById('modalClose');
  const loginForm = document.getElementById('loginForm');
  const newsletterForm = document.getElementById('newsletterForm');
  
  // Menú móvil
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
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
  
  // Modal Login
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
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por suscribirte! (Funcionalidad en desarrollo)');
      newsletterForm.reset();
    });
  }
  
  // Animaciones al scroll
  initializeScrollAnimations();
  
  // Contador animado
  initializeCounters();
  
  // Switch de precios
  initializePricingToggle();
});

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

function initializePricingToggle() {
  const toggle = document.getElementById('pricingToggle');
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

// Smooth scroll para enlaces internos
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