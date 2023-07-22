// Custom JS
const url = '@@Padlet shared URL: Remember to make it public for everyone@@';
const fullscreenIframeContainer = document.getElementById('iframeContainer');
const fullscreen = document.getElementById('fullscreenButton');
if(typeof(url) != 'undefined'){
    const id =  url.split("-")[url.split("-").length-1];
    const embedurl = "https://padlet.com/embed/" + id;
    const downloadURL = "https://padlet.com/_/exports/document_status?public_key=" + id;
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
        document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
    };
}


// Event listener for the fullscreen button
fullscreen.addEventListener('click', enterFullscreen);


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
// Event listeners for the fullscreen change event
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement === fullscreenIframeContainer) {
    exitFullscreenButton.style.display = 'block';
    fullscreenButton.style.display = 'none';
  } else {
    exitFullscreenButton.style.display = 'none';
    fullscreenButton.style.display = 'block';
  }
});

document.addEventListener('webkitfullscreenchange', () => {
  if (document.webkitFullscreenElement === fullscreenIframeContainer) {
    exitFullscreenButton.style.display = 'block';
    fullscreenButton.style.display = 'none';
  } else {
    exitFullscreenButton.style.display = 'none';
    fullscreenButton.style.display = 'block';
  }
});

// Event listener for the exit fullscreen button
exitFullscreenButton.addEventListener('click', () => {
  exitFullscreen();
});