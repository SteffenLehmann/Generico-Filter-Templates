let timeout; // timeout variable for mouse movement

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(hideFullscreenExitButton, 2000);
  }
  // the code block below will be later
  /* // Event listeners for mouse movement that resets the timer and calls the showFullscreenButton function
  mouseMovementCollector.addEventListener('mousemove', () => {
    console.log('mousemove');
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      console.log('mousemove in fullscreen');
      showFullscreenExitButton();
      resetTimer();
    }
  }); */