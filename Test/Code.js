// Custom JS
const url = '@@Padlet shared URL: Remember to make it public for everyone@@';
const fullscreenIframeContainer = document.getElementById('iframeContainer');
const fullscreen = document.getElementById('fullscreenButton');
const screenHeight = window.screen.height + 'px';
let embeddedIframe;
onLoad(url);

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

// Listen for fullscreen change event
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    // If the iframe enters fullscreen
    exitFullscreenButton.style.display = 'block';
    fullscreenButton.style.display = 'none';
  } else {
    // If the iframe exits fullscreen
    exitFullscreenButton.style.display = 'none';
    fullscreenButton.style.display = 'block';
  }
}

// Event listener for the exit fullscreen button
exitFullscreenButton.addEventListener('click', () => {
  exitFullscreen();
});