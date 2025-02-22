// Isaac M Feedback Survey

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation (you can add more robust validation)
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            document.getElementById('feedback-message').textContent = 'Thank you for your feedback!';
            document.getElementById('feedbackForm').reset();
        });
