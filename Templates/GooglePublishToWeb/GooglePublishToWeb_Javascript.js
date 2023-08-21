// Custom JS
// user input from Moodle
const summaryName = '@@Name: The name of the button containing the google document@@'; // user input
const pURL = '@@Google Publish to Web Link: it is the second share option@@'; // user input
const dURL = '@@Google shared URL: Remember to make it public for everyone@@'; // user input
// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'+@@AUTOID@@); 
const fullscreenButton = document.getElementById('fullscreenButton'+@@AUTOID@@);
const exitFullscreenButton = document.getElementById('exitFullscreenButton'+@@AUTOID@@);
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const headerdownload = document.getElementById('DownloadLinkHeader'+@@AUTOID@@);


// function calls to create the temlate on moodle
const embedURLArray = constructEmbedURL(pURL);
const downloadURL = constructDownloadURL(dURL);
createNameForSummary(summaryName, embedURLArray[1]);
assignHeaderLinks(dURL, downloadURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(embedURLArray[0], dURL, downloadURL);


// creates the name for the template
function createNameForSummary(nameforbutton, ID) {
      let name = nameforbutton;
      if (typeof(name) != 'undefined') {
            if (ID == 'presentation'){{name = "👩‍🏫 "+ name;}}
            else if (ID == 'document'){{name = "📄 "+ name;}}
            else if (ID == 'forms'){{name = "📝 "+ name;}}
            else if (ID == 'spreadsheets'){{name = "📊 "+ name;}}
      detailsButton.textContent = name; // set the name of the button containing the padlet board
  } 
}

// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
      headerLink.href = ""+ url;
      headerdownload.href = ""+downloadURL;
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

// on load function e.g. when the Collapsible button is clicked
function onLoad(embedurl, url, downloadURL){
      if (typeof(embedurl) != 'undefined') {
            hideEnterFullscreenButtonOnPresentation(embedURLArray[1]);
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                  document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
                  if (typeof(url) != 'undefined') {
                        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
                        document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
                  } else {
                        document.getElementById('Download'+@@AUTOID@@).style.display = 'none';
                        document.getElementById('ShareLink'+@@AUTOID@@).style.display = 'none';
                  }
                  setSameSiteAttribute('None');
            };
      }
}
// hide the enter fullscreen button on if the iframe is a presentation
function hideEnterFullscreenButtonOnPresentation(type) {
      if (type == 'presentation'){
            fullscreenButton.style.display = 'none';
      } 
}

// function to construct the embed URL
function constructEmbedURL(URL){
      if (typeof(URL) != 'undefined') {
            const embedID = URL.split("/")[URL.split("/").length-2];
            const embedType = URL.split("/")[URL.split("/").length-5];
            let embedURL;
            let embedURLend;
            
            if (embedType == "presentation"){
                  embedURL =  "https://docs.google.com/presentation/d/e/";
                  embedURLend = "/embed?start=false&loop=false&delayms=3000";
            } else if (embedType == "document"){
                  embedURL =  "https://docs.google.com/document/d/e/";
                  embedURLend = "/pub?embedded=true";
            } else if (embedType == "forms"){
                  embedURL =  "https://docs.google.com/forms/d/e/";
                  embedURLend = "/viewform?embedded=true";
            } else if (embedType == "spreadsheets"){
                  embedURL =  "https://docs.google.com/spreadsheets/d/e/";
                  embedURLend = "/pubhtml?widget=true&amp;headers=false";
            }
            const embeddedURL = embedURL + embedID + embedURLend;
            return [embeddedURL, embedType];
      }
}
// function to construct the download URL
function constructDownloadURL(URL){
      if(typeof(URL) != 'undefined') {
            const downloadID = URL.split("/")[URL.split("/").length-2];
            const downloadType = URL.split("/")[URL.split("/").length-4];
            let downloadURL;

            if (downloadType == "presentation"){
                  downloadURL =  "https://docs.google.com/presentation/d/";
            } else if (downloadType == "document"){
                  downloadURL =  "https://docs.google.com/document/d/";
            } else if (downloadType == "spreadsheets"){
                  downloadURL =  "https://docs.google.com/spreadsheets/d/";
            }
            const downloadableURL = downloadURL + downloadID + "/export/pdf";
            return downloadableURL;
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
