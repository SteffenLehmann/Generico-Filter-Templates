// Custom JS
const url = '@@Padlet shared URL: Remember to make it public for everyone@@'; // user input 
const fullscreenIframeContainer = document.getElementById('iframeContainer'); 
const fullscreenButton = document.getElementById('fullscreenButton');
const exitFullscreenButton = document.getElementById('exitFullscreenButton');
let embeddedIframe; // iframe element
let timeout; // timeout variable for mouse movement
onLoad(url);


// on load function e.g. when the Collapsible button is clicked
function onLoad(url){
  if(typeof(url) != 'undefined'){
    const id =  url.split("-")[url.split("-").length-1];
    const embedurl = "https://padlet.com/embed/" + id;
    const downloadURL = "https://padlet.com/_/exports/document_status?public_key=" + id;
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        embeddedIframe = document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
        document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
    };
  }
}


// hide exit fullscreen button
function hideFullscreenExitButton() {
  exitFullscreenButton.style.display = 'none';
}
// show exit fullscreen button
function showFullscreenExitButton() {
  exitFullscreenButton.style.display = 'block';
}
// reset timer
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



// Event listener for the fullscreen button
fullscreenButton.addEventListener('click', enterFullscreen);


// Function to enter fullscreen
function enterFullscreen() {
  if (fullscreenIframeContainer.requestFullscreen) {
    fullscreenIframeContainer.requestFullscreen();
  } else if (fullscreenIframeContainer.mozRequestFullScreen) {
    fullscreenIframeContainer.mozRequestFullScreen();
  } else if (fullscreenIframeContainer.webkitRequestFullscreen) {
    fullscreenIframeContainer.webkitRequestFullscreen();
  } else if (fullscreenIframeContainer.msRequestFullscreen) {
    fullscreenIframeContainer.msRequestFullscreen();
  }
}

// Function to exit fullscreen
function exitFullscreen() {
  console.log('exitFullscreen');
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

// Listen for fullscreen change event
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    // If the iframe enters fullscreen
    showFullscreenExitButton();
  } else {
    // If the iframe exits fullscreen
    hideFullscreenExitButton();
  }
}

// Event listener for the exit fullscreen button
exitFullscreenButton.addEventListener('click', () => {
  console.log('exitFullscreenButton clicked');
  exitFullscreen();
});