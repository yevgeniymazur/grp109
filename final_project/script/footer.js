document.addEventListener("DOMContentLoaded", function() {
  // Array of names to scroll through
  const names = ["Natalia", "Isaac", "Yevgeniy"];
  let currentIndex = 0;
  const scrollingNamesElement = document.getElementById("scrollingNames");

  // Function to update the scrolling name
  function scrollNames() {
    scrollingNamesElement.textContent = names[currentIndex];
    currentIndex = (currentIndex + 1) % names.length;
  }
  
  // Initialize with the first name and update every 2 seconds
  scrollNames();
  setInterval(scrollNames, 2000);
});
