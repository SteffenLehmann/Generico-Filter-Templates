// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name@@', 'Name: The name of the button that will contain the google document', opts);
const dURL = getLongInput('@@Google Share Link@@',"Google share URL: Remember to make it public for everyone", opts);


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
const shareLink = document.getElementById('ShareLink'+@@AUTOID@@);
const downloadLink = document.getElementById('Download'+@@AUTOID@@);

// function calls to create the temlate on moodle
const downloadURL = constructDownloadURL(dURL);
createNameForSummary(nameForSummary, downloadURL[1]);
assignHeaderLinks(dURL, downloadURL[0]);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL, downloadURL[0], nameForSummary);

// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
      headerLink.href = ""+ url;
      headerdownload.href = ""+downloadURL;
}

// creates the name for the template
function createNameForSummary(nameforbutton, ID) {
      let name = nameforbutton;
      if (name) {
            const summary = document.getElementById('detailsButton');
            if (ID == 'presentation'){{name = "👩‍🏫 "+ name;}}
            else if (ID == 'document'){{name = "📄 "+ name;}}
            else if (ID == 'forms'){{name = "📝 "+ name;}}
            else if (ID == 'spreadsheets'){{name = "📊 "+ name;}}
      detailsButton.textContent = name; // set the name of the button containing the padlet board
  } else if (!name) {
      const header = document.getElementById('HeaderContainer'+@@AUTOID@@).style.display = 'none';
      assignParent('stateIndicator', 'iframeContainer', 'Link-container', 'TemplateContainer');
  }
}
function assignParent(stateIndicator, iframeContainer, linkContainer, TemplateContainer) {
      const container = document.getElementById(TemplateContainer+@@AUTOID@@);
      const MoveArray = [document.getElementById(stateIndicator+@@AUTOID@@), document.getElementById(iframeContainer+@@AUTOID@@), document.getElementById(linkContainer+@@AUTOID@@)];
      for (let i = 0; i < MoveArray.length; i++) {
            container.appendChild(MoveArray[i]);
      }
}
    
// on load function e.g. when the Collapsible button is clicked
function onLoad(url, downloadURL, nameForSummary){
      if (url && nameForSummary) {
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                  assignContent(url, downloadURL);
            };
      } else if (url && !nameForSummary) {
            assignContent(url, downloadURL);
      }
}

function assignContent(url, downloadURL) {
      document.getElementById('Content'+@@AUTOID@@).src = ""+url;
      document.getElementById('ShareLink'+@@AUTOID@@).href = ""+ url;
      document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
}

// hide the enter fullscreen button on if the iframe is a presentation
function hideEnterFullscreenButtonOnPresentation(type) {
      if (type == 'presentation'){
            fullscreenButton.style.display = 'none';
      } 
}

// function to construct the download URL
function constructDownloadURL(URL){
      if(URL) {
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
        detailsButton.style.color = '#3357c2';
        detailsButton.style.backgroundColor = '#E1E1E1';
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
            if (detailsButton.classList.contains('detailsCollapsibleGoogleEdit')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsibleGoogleEdit');
            detailsButton.classList.remove('detailsCollapsibleDarkModeGoogleEdit');
            headerLink.classList.add('HeaderLinkGoogleEdit');
            headerLink.classList.remove('HeaderLinkDarkModeGoogleEdit');
            shareLink.classList.add('LinkGoogleEdit');
            shareLink.classList.remove('LinkDarkModeGoogleEdit');
            fullscreenButton.classList.add('LinkGoogleEdit');
            fullscreenButton.classList.remove('LinkDarkModeGoogleEdit');
            if (headerdownload) {
                  headerdownload.classList.add('HeaderLinkGoogleEdit');
                  headerdownload.classList.remove('HeaderLinkDarkModeGoogleEdit');
                  downloadLink.classList.add('LinkGoogleEdit');
                  downloadLink.classList.remove('LinkDarkModeGoogleEdit');
            }
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeGoogleEdit')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeGoogleEdit');
            detailsButton.classList.remove('detailsCollapsibleGoogleEdit');
            headerLink.classList.add('HeaderLinkDarkModeGoogleEdit');
            headerLink.classList.remove('HeaderLinkGoogleEdit');
            shareLink.classList.add('LinkDarkModeGoogleEdit');
            shareLink.classList.remove('LinkGoogleEdit');
            fullscreenButton.classList.add('LinkDarkModeGoogleEdit');
            fullscreenButton.classList.remove('LinkGoogleEdit');
            if (headerdownload) {
                  headerdownload.classList.add('HeaderLinkDarkModeGoogleEdit');
                  headerdownload.classList.remove('HeaderLinkGoogleEdit');
                  downloadLink.classList.add('LinkDarkModeGoogleEdit');
                  downloadLink.classList.remove('LinkGoogleEdit');
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
      setBackgrounColor(newBackgroundColor);
});

 // function to remove the iframe focus style
 function removeIframeFocus(element, summaryName) {
      if (!summaryName) {
            element.style.backgroundColor = "transparent";
            return;
      } else element.style.backgroundColor = "#E1E1E1";
}
// function to add the iframe focus style
function addIframeFocus(element) {
      //element.style.outline = '#f44646';
      element.style.backgroundColor = "#468ff4";
}

//checks if the iframe has focus (fall back method)  
window.setInterval(function() {
      const iframeState = document.getElementById('stateIndicator'+@@AUTOID@@);
      if (document.activeElement == document.getElementById('Content'+@@AUTOID@@)) {
        addIframeFocus(iframeState);
      } else {
        removeIframeFocus(iframeState, nameForSummary);
      }
     }, 500);

// prevent event probagation
const linkContainer = document.getElementById('Link-container'+@@AUTOID@@);
linkContainer.addEventListener('click', function(event) {
      event.stopPropagation();
}, false);
