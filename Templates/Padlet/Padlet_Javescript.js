// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the padlet board@@'; // user input
const url = '@@Padlet shared URL: Remember to make it public for everyone@@'; // user input

// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'); 
const fullscreenButton = document.getElementById('fullscreenButton');
const exitFullscreenButton = document.getElementById('exitFullscreenButton');
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton');
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const headerdownload = document.getElementById('DownloadLinkHeader'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
const urls = constructURLs(url);
assignHeaderLinks(url, urls[1]);
onLoad(url, urls[0], urls[1]);

// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
  headerLink.href = ""+ url;
  headerdownload.href = ""+downloadURL;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    const summary = document.getElementById('detailsButton');
    name = ""+ name; // you can add emoji to the summary title here, e.g. 🎦
    summary.textContent = name; // set the name of the button containing the padlet board
  } 
}

// set the SameSite attribute for the cookies
function setSameSiteAttribute(sameSiteValue) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [name, value] = cookie.split("=");

    // Set the cookie with the desired SameSite attribute
    document.cookie = `${name}=${value}; SameSite=${sameSiteValue}; Secure`;
  }
}

// function to construct the URLs
function constructURLs(url) {
  if(typeof(url) != 'undefined'){
    const id =  url.split("-")[url.split("-").length-1];
    const embedurl = "https://padlet.com/embed/" + id;
    const downloadURL = "https://padlet.com/_/exports/document_status?public_key=" + id;
    return [embedurl, downloadURL];
  }
}

// on load function e.g. when the Collapsible button is clicked
function onLoad(url, embedurl, downloadURL){
  if(typeof(url) != 'undefined'){
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
        document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
        setSameSiteAttribute('None');
    };
  }
}

// event listener for the details element state change
details.addEventListener("toggle", (event) => {
  if (details.open) {
    /* the element was toggled open */
    detailsButton.style.color = '#468ff4';
    detailsButton.style.backgroundColor = '#CCCCCC';
    headerLink.style.display = 'none';
    headerdownload.style.display = 'none';
  } else {
    /* the element was toggled closed */
    detailsButton.style.backgroundColor = '';
    detailsButton.style.color = '';
    headerLink.style.display = 'block';
    headerdownload.style.display = 'block';
  }
});

// hide exit fullscreen button
function hideFullscreenExitButton() {
  exitFullscreenButton.style.display = 'none';
}

// show exit fullscreen button
function showFullscreenExitButton() {
  exitFullscreenButton.style.display = 'block';
}

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

// Handle the fullscreen change event to hide/show the exit fullscreen button
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
  exitFullscreen();
});