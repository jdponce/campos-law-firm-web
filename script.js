// Menú responsive
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (menuBtn.querySelector('i').classList.contains('fa-times')) {
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Scroll suave para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header transparente al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageDiv = this.querySelector('.form-message');
        messageDiv.textContent = '✓ Mensaje enviado. Te contactaremos en menos de 24 horas.';
        messageDiv.style.color = '#28a745';
        messageDiv.style.marginTop = '15px';
        this.reset();
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 5000);
    });
}

// Intersection Observer para animaciones adicionales
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que no tienen animación automática
document.querySelectorAll('.team-card, .plan-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Detectar clics fuera del menú para cerrarlo
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (menuBtn.querySelector('i').classList.contains('fa-times')) {
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        }
    }
});