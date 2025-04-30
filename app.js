// Scroll to the Contact section smoothly when the "Get Started" button is clicked
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let message = document.getElementById('message').value;

  if (name && email && message) {
    // Here, you would typically send the form data to a server, but for now, we'll just log it
    console.log('Form submitted', { name, email, message });

    alert('Thank you for reaching out! We will get back to you soon.');
    document.getElementById('contact-form').reset(); // Reset the form
  } else {
    alert('Please fill out all fields!');
  }
});
