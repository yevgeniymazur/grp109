document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('email-error');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Reset the error message
    emailError.style.display = 'none';

    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = 'Please enter a valid email address';
      emailError.style.display = 'block';
      isValid = false;
    }
    
    if (isValid) {
      // Hide the form and show the success message
      form.style.display = 'none';
      successMessage.textContent = 'Thank you for subscribing to our newsletter!';
      successMessage.style.display = 'block';
      
      // Log the submitted email for debugging purposes
      console.log('Subscription submitted for:', { email: emailInput.value });
    }
  });
});


