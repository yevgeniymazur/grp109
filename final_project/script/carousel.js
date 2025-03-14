/**
 * Fast Forward sound effect used in this project is provided by SoundBible.com.
 * Licensed under Creative Commons Attribution 3.0 (CC BY 3.0).
 * See https://creativecommons.org/licenses/by/3.0/ for license details.
 * Rewind sound "Hyena Laughing" by SoundBible.com.
 * Licensed under Creative Commons Attribution 3.0 (CC BY 3.0).
 * Source: https://soundbible.com/2191-Hyena-Laughing.html
 */

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
  const intervalDuration = 3; // seconds for auto-advance
  
  // Get DOM elements
  const carouselImage = document.getElementById("carousel-image");
  const carouselContainer = document.getElementById("carousel-container");
  const timerCounter = document.getElementById("timer-counter");
  
  // Audio objects for manual navigation sounds
  const rewindSound = new Audio("sound/hyena-laugh_daniel-simion.mp3");
  const advanceSound = new Audio("sound/Fast Forward-SoundBible.com-2077194936.mp3");
  
  // Variables for combined timer
  let elapsedTime = 0;
  let combinedInterval;
  
  // Update the carousel image
  function updateImage() {
    carouselImage.src = images[currentIndex];
    carouselImage.alt = `Carousel Image ${currentIndex + 1}`;
  }
  
  // Combined tick function: update timer and change image when needed
  function tick() {
    elapsedTime++;
    // When elapsed time reaches the interval, change the image and reset the timer
    if (elapsedTime >= intervalDuration) {
      nextImage();
      elapsedTime = 0;
    }
    timerCounter.textContent = `Elapsed Time: ${elapsedTime}s`;
  }
  
  // Function to advance to the next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }
  
  // Function to go to the previous image
  function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }
  
  // Start the combined interval timer
  function startCombinedInterval() {
    combinedInterval = setInterval(tick, 1000);
  }
  
  // Reset the combined interval timer (used after manual navigation)
  function resetCombinedInterval() {
    clearInterval(combinedInterval);
    elapsedTime = 0;
    timerCounter.textContent = `Elapsed Time: ${elapsedTime}s`;
    startCombinedInterval();
  }
  
  // Event listener for manual navigation via clicks on the carousel image
  carouselContainer.addEventListener("click", function(e) {
    const rect = carouselContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    // If click is on the left half, rewind; on the right half, advance.
    if (clickX < rect.width / 2) {
      previousImage();
      rewindSound.play();
    } else {
      nextImage();
      advanceSound.play();
    }
    // Reset the combined interval so the 3-second timer starts over
    resetCombinedInterval();
  });
  
  // Initialize the carousel and timer on page load
  updateImage();
  startCombinedInterval();
});

