// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button that will contain the video@@', 'Name: The name of the button that will contain the video', opts);
const dURL = getLongInput('@@Microsoft iframe SRC URL for video file@@', "Microsoft iframe SRC URL for video file", opts);
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
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const sharelink = document.getElementById('ShareLink'+@@AUTOID@@);

// split URL

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary, dURL);

assignHeaderLinks(dURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL);


//creates the name for the template
function createNameForSummary(name, url) {
      if (typeof(name) != 'undefined') {
            name = "🎦 "+ name; // you can add emoji to the summary title here, e.g. 🎦
            detailsButton.textContent = name; // set the name of the button containing the padlet board
      } 
    }
// function to assign the header links
function assignHeaderLinks(url) {
      headerLink.href = ""+ url;
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
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+url;
                document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
            };
      } else {document.getElementById('ShareLink'+@@AUTOID@@).style.display = 'none';}
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

      } else {
        /* the element was toggled closed */
        detailsButton.style.backgroundColor = '';
        detailsButton.style.color = '';
        detailsButton.style.borderBottomRightRadius = '5px';
        detailsButton.style.borderBottomLeftRadius = '5px';
        headerLink.style.display = 'block';
      }
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
            if (detailsButton.classList.contains('detailsCollapsibleMSStream')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsibleMSStream');
            detailsButton.classList.remove('detailsCollapsibleDarkModeMSStream');
            headerLink.classList.add('HeaderLinkMSStream');
            headerLink.classList.remove('HeaderLinkDarkModeMSStream');
            sharelink.classList.add('LinkMSStream');
            sharelink.classList.remove('LinkDarkModeMSStream');
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeMSStream')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeMSStream');
            detailsButton.classList.remove('detailsCollapsibleMSStream');
            headerLink.classList.add('HeaderLinkDarkModeMSStream');
            headerLink.classList.remove('HeaderLinkMSStream');
            sharelink.classList.add('LinkDarkModeMSStream');
            sharelink.classList.remove('LinkMSStream');
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
 function removeIframeFocus(element) {
      //element.style.outline = "transparent"; // or any other color you want
      element.style.backgroundColor = "#E1E1E1";
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
        removeIframeFocus(iframeState);
      }
     }, 500);

// prevent event probagation
const linkContainer = document.getElementById('Link-container'+@@AUTOID@@);
linkContainer.addEventListener('click', function(event) {
      event.stopPropagation();
}, false);