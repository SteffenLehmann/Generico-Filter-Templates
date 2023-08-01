// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the google document@@'; // user input
const dURL = '@@Google shared URL: Remember to make it public for everyone@@'; // user input

// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'); 
const fullscreenButton = document.getElementById('fullscreenButton');
const exitFullscreenButton = document.getElementById('exitFullscreenButton');
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton');
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const headerdownload = document.getElementById('DownloadLinkHeader'+@@AUTOID@@);


// function calls to create the temlate on moodle
const downloadURL = constructDownloadURL(dURL);
createNameForSummary(nameForSummary, downloadURL[1]);
assignHeaderLinks(dURL, downloadURL[0]);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL, downloadURL[0]);

window.addEventListener('DOMContentLoaded', function() {
      let firstElementHeight = document.querySelector('.container > :first-child').offsetHeight;
      let elements = document.querySelectorAll('.container > div');

      for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = firstElementHeight + 'px';
      }
});

// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
      headerLink.href = ""+ url;
      headerdownload.href = ""+downloadURL;
}


// creates the name for the template
function createNameForSummary(nameforbutton, ID) {
      let name = nameforbutton;
      if (typeof(name) != 'undefined') {
            const summary = document.getElementById('detailsButton');
            if (ID == 'presentation'){{name = "👩‍🏫 "+ name;}}
            else if (ID == 'document'){{name = "📄 "+ name;}}
            else if (ID == 'forms'){{name = "📝 "+ name;}}
            else if (ID == 'spreadsheets'){{name = "📊 "+ name;}}
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
    
// on load function e.g. when the Collapsible button is clicked
function onLoad(url, downloadURL){
      if (typeof(url) != 'undefined') {
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+url;
                document.getElementById('ShareLink'+@@AUTOID@@).href = ""+ url;
                document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
                // set the SameSite attribute for the cookies
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
            return [downloadableURL, downloadType];
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