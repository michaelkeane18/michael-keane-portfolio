// Smooth active nav highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--blue)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Contact form handler (mailto fallback — replace with a backend/Formspree endpoint)
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type=text]').value;
  const email = form.querySelector('input[type=email]').value;
  const subject = form.querySelectorAll('input[type=text]')[1]?.value || 'Portfolio enquiry';
  const message = form.querySelector('textarea').value;
  const mailto = `mailto:michaelkeane18@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
  window.location.href = mailto;
}

// Animate stat numbers on scroll into view
const statNums = document.querySelectorAll('.stat-item .num, .th-stat .big');
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      numObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  numObserver.observe(el);
});
