document.addEventListener("DOMContentLoaded", function() {
  // Array of carousel images using all your gallery pictures
  const images = [
    "images/pot1.png",
    "images/pot2.png",
    "images/pot3.png",
    "images/pot4.png",
    "images/pot5.png",
    "images/pot6.png",
    "images/pot7.png",
    "images/pot8.png",
    "images/pot9.png",
    "images/pots_in_blue.png",
    "images/pot10.png",
    "images/pot11.jpg",
    "images/pot12.jpg",
    "images/pot13.jpg",
    "images/pot14.jpg",
    "images/pot15.jpg",
    "images/pot16.jpg",
    "images/pot17.jpg",
    "images/pot18.jpg",
    "images/pot19.jpg",
    "images/pot20.jpg",
    "images/pot21.jpg",
    "images/pot22.jpg",
    "images/pot23.jpg"
  ];
  let currentIndex = 0;
  
  const carouselImage = document.getElementById("carousel-image");
  const carouselContainer = document.getElementById("carousel-container");
  const timerCounter = document.getElementById("timer-counter");
  
  // Audio objects for manual navigation sounds
  const rewindSound = new Audio("sounds/rewind.mp3");
  const advanceSound = new Audio("sounds/advance.mp3");
  
  // Interval and counter variables
  let autoInterval;
  let counterInterval;
  let elapsedTime = 0;
  const intervalDuration = 3; // seconds
  
  // Function to update the carousel image based on currentIndex
  function updateImage() {
    carouselImage.src = images[currentIndex];
    carouselImage.alt = `Carousel Image ${currentIndex + 1}`;
  }
  
  // Auto-advance to next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
    resetCounter();
  }
  
  // Rewind to previous image (for manual click on left side)
  function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }
  
  // Update the plain text counter every second
  function updateCounter() {
    elapsedTime++;
    if (elapsedTime > intervalDuration) {
      elapsedTime = 0;
    }
    timerCounter.textContent = `Elapsed Time: ${elapsedTime}s`;
  }
  
  // Start auto cycle and counter intervals
  function startAutoCycle() {
    autoInterval = setInterval(nextImage, intervalDuration * 1000);
    counterInterval = setInterval(updateCounter, 1000);
  }
  
  // Reset auto cycle and counter when a manual change occurs
  function resetAutoCycle() {
    clearInterval(autoInterval);
    clearInterval(counterInterval);
    elapsedTime = 0;
    timerCounter.textContent = `Elapsed Time: ${elapsedTime}s`;
    startAutoCycle();
  }
  
  // Event listener for manual navigation via clicks on the carousel image
  carouselContainer.addEventListener("click", function(e) {
    const rect = carouselContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    // Left half: rewind; right half: advance.
    if (clickX < rect.width / 2) {
      previousImage();
      rewindSound.play();
    } else {
      currentIndex = (currentIndex + 1) % images.length;
      updateImage();
      advanceSound.play();
    }
    // Reset auto cycle and counter after manual navigation
    resetAutoCycle();
  });
  
  // Initialize carousel on page load
  updateImage();
  startAutoCycle();
});

