// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the google@@'; // user input
const pURL = '@@Google Publish to Web Link:@@'; // user input
const dURL = '@@Google shared URL: Remember to make it public for everyone@@'; // user input

// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'); 
const fullscreenButton = document.getElementById('fullscreenButton');
const exitFullscreenButton = document.getElementById('exitFullscreenButton');
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton');

// function calls to create the temlate on moodle
const embedURLArray = constructEmbedURL(pURL);
const downloadURL = constructDownloadURL(dURL);
createNameForSummary(nameForSummary, embedURLArray[1]);
hideEnterFullscreenButtonOnPresentation(embedURLArray[1]);
onLoad(embedURLArray[0], dURL, downloadURL);

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

// on load function e.g. when the Collapsible button is clicked
function onLoad(embedurl, url, downloadURL){
      if (typeof(embedurl) != 'undefined') {
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                  document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
                  if (typeof(url) != 'undefined') {
                        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
                        document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
                  } else {
                        document.getElementById('Download'+@@AUTOID@@).style.display = 'none';
                        document.getElementById('ShareLink'+@@AUTOID@@).style.display = 'none';
                  }
            };
      }
}

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
            console.log("embedID " +embedID);
            console.log("embedType " +embedType);
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
      } else {
        /* the element was toggled closed */
        detailsButton.style.backgroundColor = '';
        detailsButton.style.color = '';
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