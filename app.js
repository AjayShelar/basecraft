// Scroll to the Contact section smoothly when the hero CTA is clicked
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

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

    if (name && email && message) {
      console.log('Consultation request prepared', { name, email, message });

      updateFormStatus('Opening your email client so you can send the details…', 'success');

      const mailtoBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Project Details:',
        message
      ].join('\n');

      const mailtoLink = `mailto:ajay@basecraft.in?subject=${encodeURIComponent('Consultation request from ' + name)}&body=${encodeURIComponent(mailtoBody)}`;
      window.location.href = mailtoLink;

      contactForm.reset();

      setTimeout(() => {
        updateFormStatus('If your email client did not open, reach us at ajay@basecraft.in or WhatsApp +91 89289 94960.', 'success');
      }, 1500);
    } else {
      updateFormStatus('Please complete all required fields before submitting the form.', 'error');
    }
  });
}
