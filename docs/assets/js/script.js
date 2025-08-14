var preloader = document.getElementById("preloader");
window.addEventListener("load", function() {
  setTimeout(function() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    // Inicializa Swiper aquí, después de mostrar el contenido
    if (typeof Swiper !== "undefined") {
      if (window.swiperInstance) {
        window.swiperInstance.destroy(true, true);
      }
      window.swiperInstance = new Swiper('.blog-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        mousewheel: { invert: false },
        pagination: {
          el: '.blog-slider__pagination',
          clickable: true,
        }
      });
    }
  }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
  // --- Código original ---
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const sections = document.querySelectorAll('section');
  const bgElements = document.querySelectorAll('.fixed > div');

  // Toggle del menú mobile
  mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    if (mobileMenu.classList.contains('open')) {
      mobileMenu.style.height = '0';
      mobileMenu.classList.remove('open');
    } else {
      mobileMenu.classList.add('open');
      mobileMenu.style.height = `${mobileMenu.scrollHeight}px`;
    }
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuButton.classList.remove('active');
      mobileMenu.style.height = '0';
      mobileMenu.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

   navLinks.forEach(link => {
     link.addEventListener('click', (e) => {
       const href = link.getAttribute('href');
       // Solo previene si es un enlace interno (empieza con #)
       if (href && href.startsWith('#')) {
         e.preventDefault();
         const targetSection = document.querySelector(href);
         if (targetSection) {
           const offsetTop = targetSection.offsetTop - 70;
           window.scrollTo({ top: offsetTop, behavior: 'smooth' });
           targetSection.classList.add('section-highlight');
           setTimeout(() => targetSection.classList.remove('section-highlight'), 1000);
         }
       }
       // Si es un link externo o a otra página, deja que navegue normalmente
     });
   });

  function highlightCurrentSection() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    mobileNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
  });

  setTimeout(() => {
    const headerText = document.querySelector('.text-6xl');
    if (headerText) {
      headerText.style.opacity = 1;
      headerText.style.transform = 'translateY(0)';
    }
  }, 300);

  highlightCurrentSection();

  // --- Envío del formulario a Resend ---
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const subject = document.querySelector('#subject').value;
      const message = document.querySelector('#message').value;

      try {
        const res = await fetch('http://localhost:3000/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await res.json();
        if (data.success) {
          alert('✅ Mensaje enviado correctamente');
          form.reset();
        } else {
          alert('❌ Error al enviar el mensaje');
        }
      } catch (err) {
        alert('❌ Error de conexión con el servidor');
        console.error(err);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const text = "Tus gestos hablan, SignaLink traduce";
  const typingElement = document.getElementById("typing-text");

  // Espera 3 segundos antes de empezar
  setTimeout(() => {
      typingElement.style.opacity = "1"; // mostrar texto
      let index = 0;

      const interval = setInterval(() => {
          typingElement.textContent = text.slice(0, index + 1);
          index++;
          if (index >= text.length) clearInterval(interval);
      }, 100); // velocidad de escritura (100ms por letra)
  }, 2500);
});

document.addEventListener("DOMContentLoaded", function () {
            const footer = document.getElementById("footer");
            function checkFooterVisible() {
                const rect = footer.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                if (rect.top < windowHeight && rect.bottom > 0) {
                    footer.classList.add("footer-visible");
                }
            }
            window.addEventListener("scroll", checkFooterVisible);
            window.addEventListener("resize", checkFooterVisible);
            checkFooterVisible();
        });
