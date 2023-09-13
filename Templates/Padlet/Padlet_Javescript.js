// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button containing the padlet board@@','Name: The name of the button containing the padlet board', opts);
const url = getLongInput('@@Padlet shared URL: Remember to make it public for everyone@@', "Padlet shared URL: Remember to make it public for everyone", opts);

/* 
  function to get the user input from the generico object opts. 
  the original input and the bare input must be the same except for the @.
*/
function getLongInput(original, bare,  opts) {
  bare = bare.replace(/\s/g, "");
  if (original === undefined) {
        for(const obj_new of Object.keys(opts)) {
              const obj_sanitised = obj_new.replace(/\s/g, "");
              if(bare == obj_sanitised) {
                    return opts[obj_new];
              }
        }
  }
  
  return original;
}

// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'+@@AUTOID@@); 
const fullscreenButton = document.getElementById('fullscreenButton'+@@AUTOID@@);
const exitFullscreenButton = document.getElementById('exitFullscreenButton'+@@AUTOID@@);
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const headerdownload = document.getElementById('DownloadLinkHeader'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
const urls = constructURLs(url);
assignHeaderLinks(url, urls[1]);
// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(url, urls[0], urls[1]);

// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
  headerLink.href = ""+ url;
  headerdownload.href = ""+downloadURL;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    name = ""+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
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
    detailsButton.style.borderBottomRightRadius = '0px';
    detailsButton.style.borderBottomLeftRadius = '0px';
    headerLink.style.display = 'none';
    headerdownload.style.display = 'none';
  } else {
    /* the element was toggled closed */
    detailsButton.style.backgroundColor = '';
    detailsButton.style.color = '';
    detailsButton.style.borderBottomRightRadius = '5px';
    detailsButton.style.borderBottomLeftRadius = '5px';
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


// function to get the background color of the page
function getBackgroundColor() {
  const bodyElement = document.body;
  const computedStyle = window.getComputedStyle(bodyElement);
  const backgroundColor = computedStyle.backgroundColor;

  return backgroundColor;
}

function setBackgrounColor(backGroundColor) {
  if (backGroundColor == 'rgb(255, 255, 255)') {
        if (detailsButton.classList.contains('detailsCollapsible')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsible');
        detailsButton.classList.remove('detailsCollapsibleDarkMode');
        headerLink.classList.add('HeaderLink');
        headerLink.classList.remove('HeaderLinkDarkMode');
        if (typeof(headerdownload) != 'undefined') {
              headerdownload.classList.add('HeaderLink');
              headerdownload.classList.remove('HeaderLinkDarkMode');
        }
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkMode')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkMode');
        detailsButton.classList.remove('detailsCollapsible');
        headerLink.classList.add('HeaderLinkDarkMode');
        headerLink.classList.remove('HeaderLink');
        if (typeof(headerdownload) != 'undefined') {
              headerdownload.classList.add('HeaderLinkDarkMode');
              headerdownload.classList.remove('HeaderLink');
        }
  }
}

// custom event to check the background color of the page
function checkBackgroundColor() {
  const currentBackgroundColor = getBackgroundColor();
  if (currentBackgroundColor !== previouisBackgroundColor) {
        previouisBackgroundColor = currentBackgroundColor;
        // Trigger the custom event
        const event = new CustomEvent('backgroundColorChanged', {detail: currentBackgroundColor});
        document.dispatchEvent(event);
  }
}
// listen interval for the background color event 
setInterval(checkBackgroundColor, 500);

// event listener for the background color change
document.addEventListener('backgroundColorChanged', (event) => {
  const newBackgroundColor = event.detail;
  console.log('Background color changed:', newBackgroundColor);
  setBackgrounColor(newBackgroundColor);
});