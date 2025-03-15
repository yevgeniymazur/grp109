 document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('newsletter-form');
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const successMessage = document.getElementById('success-message');
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Reset error messages
                nameError.style.display = 'none';
                emailError.style.display = 'none';
                
                // Validate form
                let isValid = true;
                
                if (nameInput.value.trim() === '') {
                    nameError.textContent = 'Please enter your name';
                    nameError.style.display = 'block';
                    isValid = false;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.style.display = 'block';
                    isValid = false;
                }
                
                if (isValid) {
                    // In a real application, you would send the form data to a server here
                    // For this example, we'll just show a success message
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // You could add AJAX code here to submit the form data
                    console.log('Subscription submitted for:', {
                        name: nameInput.value,
                        email: emailInput.value
                    });
                }
            });
        });
