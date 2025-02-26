//clickButton Isaac M
document.getElementById('myButton').addEventListener('click', function() {
    // Store the smiley face in local storage
    localStorage.setItem('smileyResponse', '😊');

    // Redirect to the output page
    window.location.href = 'output.html';
});
  // Retrieve and display the smiley face
        const smiley = localStorage.getItem('smileyResponse');
        if (smiley) {
            document.getElementById('smiley-display').textContent = smiley;
            localStorage.removeItem('smileyResponse'); // Clear the stored data
        }
