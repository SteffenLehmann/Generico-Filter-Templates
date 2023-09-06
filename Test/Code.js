// Custom JS
// user input from Moodle
const dURL = '@@Google shared URL: Remember to make it public for everyone@@'; // user input

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
//createNameForSummary(nameForSummary);
assignHeaderLinks(dURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL);


// function to assign the header links
function assignHeaderLinks(url) {
      //const urlArray = constructURLs(url);
      //console.log("urlArray" + urlArray);
      headerLink.href = ""+ url;
      //headerdownload.href = ""+urlArray[1];
}


// creates the name for the template
function createNameForSummary(nameforbutton) {
      let name = nameforbutton;
      if (typeof(name) != 'undefined') {
            name = "📄 "+ name;
      }
      document.getElementById('detailsButton'+@@AUTOID@@).textContent = name; 
      //detailsButton.textContent = name; // set the name of the button containing the padlet board
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
function onLoad(url){
      if (typeof(url) != 'undefined') {
        console.log("url " + url);
        const urlArray = constructURLs(url); 
        document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+urlArray[0];
                document.getElementById('ShareLink'+@@AUTOID@@).href = ""+ url;
                document.getElementById('Download'+@@AUTOID@@).href = ""+urlArray[1];
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
function constructURLs(URL){
      if(typeof(URL) != 'undefined') {
            const ID = URL.split("/")[URL.split("/").length-2];
    
            const embedURL = 'https://drive.google.com/file/d/' + ID + '/preview';
            const downloadableURL = 'https://drive.google.com/uc?export=download&id=' + ID;
            console.log("embedURL " + embedURL);
            return [embedURL, downloadableURL];
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
            if (detailsButton.classList.contains('detailsCollapsibleGooglePDF')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsibleGooglePDF');
            detailsButton.classList.remove('detailsCollapsibleDarkModeGooglePDF');
            headerLink.classList.add('HeaderLinkGooglePDF');
            headerLink.classList.remove('HeaderLinkDarkModeGooglePDF');
            sharelink.classList.add('LinkGooglePDF');
            sharelink.classList.remove('LinkDarkModeGooglePDF');
            fullscreenButton.classList.add('LinkGooglePDF');
            fullscreenButton.classList.remove('LinkDarkModeGooglePDF');
            if (typeof(headerdownload) != 'undefined') {
                  headerdownload.classList.add('HeaderLinkGooglePDF');
                  headerdownload.classList.remove('HeaderLinkDarkModeGooglePDF');
                  download.classList.add('LinkGooglePDF');
                  download.classList.remove('LinkDarkModeGooglePDF');
            }
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeGooglePDF')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeGooglePDF');
            detailsButton.classList.remove('detailsCollapsibleGooglePDF');
            headerLink.classList.add('HeaderLinkDarkModeGooglePDF');
            headerLink.classList.remove('HeaderLinkGooglePDF');
            sharelink.classList.add('LinkDarkModeGooglePDF');
            sharelink.classList.remove('LinkGooglePDF');
            fullscreenButton.classList.add('LinkDarkModeGooglePDF');
            fullscreenButton.classList.remove('LinkGooglePDF');
            if (typeof(headerdownload) != 'undefined') {
                  headerdownload.classList.add('HeaderLinkDarkModeGooglePDF');
                  headerdownload.classList.remove('HeaderLinkGooglePDF');
                  download.classList.add('LinkDarkModeGooglePDF');
                  download.classList.remove('LinkGooglePDF');
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
