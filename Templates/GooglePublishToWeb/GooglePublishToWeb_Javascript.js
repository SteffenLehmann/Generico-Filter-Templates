// Custom JS
// user input from Moodle
const summaryName = getLongInput("@@Name: The name of the button that will contain the google document@@", 'Name: The name of the button that will contain the google document', opts);
const pURL = getLongInput("@@Google Publish to Web Link: open the file menu in the top left corner and find the share section then select publish to web@@", 'Google Publish to Web Link: open the file menu in the top left corner and find the share section then select publish to web', opts);
const dURL = getLongInput("@@Google share URL: Remember to make it public for everyone@@", 'Google share URL: Remember to make it public for everyone', opts);

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
const sharelink = document.getElementById('ShareLink'+@@AUTOID@@);
const download = document.getElementById('Download'+@@AUTOID@@);
// function calls to create the temlate on moodle
const embedURLArray = constructEmbedURL(pURL);
const downloadURL = constructDownloadURL(dURL);


createNameForSummary(summaryName, embedURLArray[1]);
assignHeaderLinks(embedURLArray[0], pURL, downloadURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(embedURLArray[0], pURL, downloadURL, summaryName);


// creates the name for the template
function createNameForSummary(nameforbutton, ID) {
      let name = nameforbutton;
      if (name) {
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

//function to assign the stateIndicator, iframecontainer and Link-container parent to the TemplateContainerGooglePub
function assignParent(stateIndicator, iframeContainer, linkContainer, TemplateContainer) {
      /* const stateIndicatorToMove = document.getElementById(stateIndicator+@@AUTOID@@);
      const iframeContainer = document.getElementById(iframeContainer+@@AUTOID@@);
      const ContainerForLinks = document.getElementById(linkContainer+@@AUTOID@@); */
      const container = document.getElementById(TemplateContainer+@@AUTOID@@);
      const MoveArray = [document.getElementById(stateIndicator+@@AUTOID@@), document.getElementById(iframeContainer+@@AUTOID@@), document.getElementById(linkContainer+@@AUTOID@@)];
      
      for (let i = 0; i < MoveArray.length; i++) {
            container.appendChild(MoveArray[i]);
      }
}

// function to assign the header links
function assignHeaderLinks(publishURL ,shareURL, downloadURL) {
      if (shareURL) {
            headerLink.href = ""+ shareURL;
            headerdownload.href = ""+downloadURL;
      } else if (publishURL) {
            headerLink.href = ""+ publishURL;
            hideDownloadButtons(shareURL);
      } else {
            headerLink.style.display = 'none';
            hideDownloadButtons(shareURL);
      }
}

// on load function e.g. when the Collapsible button is clicked
function onLoad(embedurl, shareURL, downloadURL, summaryName){
      if (embedurl && summaryName) {
            hideEnterFullscreenButtonOnPresentation(embedURLArray[1]);
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                  assignContent(embedurl, shareURL, downloadURL);
            };
      } else if (embedurl && !summaryName) {
            hideEnterFullscreenButtonOnPresentation(embedURLArray[1]);
            assignContent(embedurl, shareURL, downloadURL);
      }
}

function assignContent(embedurl, shareURL, downloadURL) {
      document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
      if (shareURL) {
            sharelink.href = ""+shareURL;
            download.href = ""+downloadURL;
      } else {
            sharelink.href = ""+embedurl;
            sharelink.style.marginLeft = "auto";
            hideDownloadButtons(downloadURL);
      }
      
}
// hide the enter fullscreen button on if the iframe is a presentation
function hideEnterFullscreenButtonOnPresentation(type) {
      if (type == 'presentation'){
            fullscreenButton.style.display = 'none';
      } 
}

function hideDownloadButtons(link) {
      if (!link) {
            download.style.display = 'none';
            headerdownload.style.display = 'none';
      }
}

function constructEmbedURL(URL) {
    if (URL) {
        let embedID, embedType, embedURL, embedURLend;

        // Determine if the URL contains "/d/e/" or "/d/"
        if (URL.includes("/d/e/")) {
            embedID = URL.split("/")[URL.split("/").length - 2];
            embedType = URL.split("/")[URL.split("/").length - 5];
            // Use /d/e/ in the final embed URL
            embedURL = `https://docs.google.com/${embedType}/d/e/`;
        } else if (URL.includes("/d/")) {
            embedID = URL.split("/")[URL.split("/").length - 2];
            embedType = URL.split("/")[URL.split("/").length - 4];
            // Use /d/ in the final embed URL
            embedURL = `https://docs.google.com/${embedType}/d/`;
        }

        // Set the appropriate URL ending based on the type of document
        if (embedType == "presentation") {
            embedURLend = "/embed?start=false&loop=false&delayms=3000";
        } else if (embedType == "document") {
            embedURLend = "/pub?embedded=true";
        } else if (embedType == "forms") {
            embedURLend = "/viewform?embedded=true";
        } else if (embedType == "spreadsheets") {
            embedURLend = "/pubhtml?widget=true&amp;headers=false";
        }

        // Construct and return the final embedded URL along with the type
        const embeddedURL = embedURL + embedID + embedURLend;
        return [embeddedURL, embedType];
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
            return downloadableURL;
      } else {
            console.log("downloadURL is "+'undefined');
            return  undefined;
      }
}


// event listener for the details element state change
details.addEventListener('toggle', (event) => toggleSummary(event, dURL));
//The toggle function that changes the style of the button when the details element is open or closed
function toggleSummary(event, dURL) {
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
        if (dURL) {
            headerdownload.style.display = 'block';
        }
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
            if (detailsButton.classList.contains('detailsCollapsibleGooglePub')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsibleGooglePub');
            detailsButton.classList.remove('detailsCollapsibleDarkModeGooglePub');
            headerLink.classList.add('HeaderLinkGooglePub');
            headerLink.classList.remove('HeaderLinkDarkModeGooglePub');
            sharelink.classList.add('LinkGooglePub');
            sharelink.classList.remove('LinkDarkModeGooglePub');
            fullscreenButton.classList.add('LinkGooglePub');
            fullscreenButton.classList.remove('LinkDarkModeGooglePub');
            if (headerdownload) {
                  headerdownload.classList.add('HeaderLinkGooglePub');
                  headerdownload.classList.remove('HeaderLinkDarkModeGooglePub');
                  download.classList.add('LinkGooglePub');
                  download.classList.remove('LinkDarkModeGooglePub');
            }
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeGooglePub')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeGooglePub');
            detailsButton.classList.remove('detailsCollapsibleGooglePub');
            headerLink.classList.add('HeaderLinkDarkModeGooglePub');
            headerLink.classList.remove('HeaderLinkGooglePub');
            sharelink.classList.add('LinkDarkModeGooglePub');
            sharelink.classList.remove('LinkGooglePub');
            fullscreenButton.classList.add('LinkDarkModeGooglePub');
            fullscreenButton.classList.remove('LinkGooglePub');
            if (headerdownload) {
                  headerdownload.classList.add('HeaderLinkDarkModeGooglePub');
                  headerdownload.classList.remove('HeaderLinkGooglePub');
                  download.classList.add('LinkDarkModeGooglePub');
                  download.classList.remove('LinkGooglePub');
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
        removeIframeFocus(iframeState, summaryName);
      }
     }, 500);

// prevent event probagation
const linkContainer = document.getElementById('Link-container'+@@AUTOID@@);
linkContainer.addEventListener('click', function(event) {
      event.stopPropagation();
}, false);
