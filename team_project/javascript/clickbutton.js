// clickButton Isaac M
document.getElementById('myButton').addEventListener('click', function() {
    // Store the smiley face in local storage
    localStorage.setItem('smileyResponse', '😊');

    // Redirect to the output page
    window.location.href = 'output.html';
});
