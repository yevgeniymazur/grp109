        // JavaScript for mobile dropdown toggle
        document.addEventListener('DOMContentLoaded', () => {
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dropdown = toggle.nextElementSibling;
                        dropdown.classList.toggle('show');
                    }
                });
            });

            // Close dropdowns when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown')) {
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.classList.remove('show');
                    });
                }
            });
        });
//JavaScript for newsletter
document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('newsletter-form');
           const emailInput = document.getElementById('email');
           const emailError = document.getElementById('email-error');
           const successMessage = document.getElementById('success-message');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
              
                // Reset error messages
                nameError.style.display = 'none';
                emailError.style.display = 'none';
              
                    // Validate form
                let isValid = true;
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
