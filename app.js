// Scroll to the Contact section smoothly when the hero CTA is clicked
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

const header = document.querySelector('header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('#primary-navigation a');

if (header && navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const privacyConsent = document.getElementById('privacy-consent');

function updateFormStatus(message, type = 'success') {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove('is-success', 'is-error', 'is-visible');
  formStatus.classList.add('is-visible');
  if (type === 'error') {
    formStatus.classList.add('is-error');
  } else {
    formStatus.classList.add('is-success');
  }
}

// Handle form submission
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      updateFormStatus('Please complete all required fields before submitting the form.', 'error');
      return;
    }

    if (privacyConsent && !privacyConsent.checked) {
      updateFormStatus('Please agree to the Privacy Policy before submitting the form.', 'error');
      privacyConsent.focus();
      return;
    }

    if (name && email && message) {
      console.log('Consultation request prepared', { name, email, message });

      updateFormStatus('Opening your email client so you can send the details…', 'success');

      const mailtoBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        'Privacy consent: Yes',
        '',
        'Project Details:',
        message
      ].join('\n');

      const mailtoLink = `mailto:ajay.shelar@basecraft.in?subject=${encodeURIComponent('Consultation request from ' + name)}&body=${encodeURIComponent(mailtoBody)}`;
      window.location.href = mailtoLink;

      contactForm.reset();

      setTimeout(() => {
        updateFormStatus('If your email client did not open, reach us at ajay.shelar@basecraft.in or WhatsApp +91 89289 94960.', 'success');
      }, 1500);
    }
  });
}
