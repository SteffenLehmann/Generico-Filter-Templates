// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button that will contain the H5P activity content@@', 'Name: The name of the button that will contain the H5P activity content', opts);
const dURL = getLongInput('@@H5P Interactive content activity URL: the browser URL when you are in the Interactive content actvitiy in Moodle@@', "H5P Interactive content activity URL: the browser URL when you are in the Interactive content actvitiy in Moodl", opts);

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
//const fullscreenButton = document.getElementById('fullscreenButton'+@@AUTOID@@);
//const exitFullscreenButton = document.getElementById('exitFullscreenButton'+@@AUTOID@@);
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const link = document.getElementById('ShareLink'+@@AUTOID@@);


// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(dURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL, nameForSummary);



// function to assign the header links
function assignHeaderLinks(url) {
      headerLink.href = ""+ url;
}


// creates the name for the template
function createNameForSummary(name) {
      if (name){
            name ="🎦 "+ name; // you can add emoji to the summary title here, e.g. 🎦
            detailsButton.textContent = name; // set the name of the button containing the padlet board
      } else if (!name){
            const header = document.getElementById('HeaderContainer'+@@AUTOID@@).style.display = 'none';
            assignParent('stateIndicator', 'iframeContainer', 'Link-container', 'TemplateContainer');
      }
}

function assignParent(stateIndicator, iframeContainer, linkContainer, templateContainer) {
      const container = document.getElementById(templateContainer+@@AUTOID@@);
      const MoveArray = [document.getElementById(stateIndicator+@@AUTOID@@), document.getElementById(iframeContainer+@@AUTOID@@), document.getElementById(linkContainer+@@AUTOID@@)];

      for (let i = 0; i < MoveArray.length; i++) {
            container.appendChild(MoveArray[i]);
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
function onLoad(url, nameForSummary){
      const embeddUrl = URLtoEmbedURL(url);
      if (url && nameForSummary) {
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                  assignContent(url, embeddUrl);
            };
      } else if (url && !nameForSummary) {
            assignContent(url, embeddUrl);
      }
}
function assignContent(url, embeddUrl) {
      document.getElementById('Content'+@@AUTOID@@).src = ""+embeddUrl;
      document.getElementById('ShareLink'+@@AUTOID@@).href = ""+ url;
      // set the SameSite attribute for the cookies
      setSameSiteAttribute('None');
}

function URLtoEmbedURL(URL) {
      const embedURL = URL.replace('view.php', 'embed.php');
      return embedURL;
}
/* // hide the enter fullscreen button on if the iframe is a presentation
function hideEnterFullscreenButtonOnPresentation(type) {
      if (type == 'presentation'){
            fullscreenButton.style.display = 'none';
      } 
} */


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
            if (detailsButton.classList.contains('detailsCollapsibleH5P')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsibleH5P');
            detailsButton.classList.remove('detailsCollapsibleDarkModeH5P');
            headerLink.classList.add('HeaderLinkH5P');
            headerLink.classList.remove('HeaderLinkDarkModeH5P');
            link.classList.add('LinkH5P');
            link.classList.remove('LinkDarkModeH5P');
            /* fullscreenButton.classList.add('LinkH5P');
            fullscreenButton.classList.remove('LinkDarkModeH5P'); */
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeH5P')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeH5P');
            detailsButton.classList.remove('detailsCollapsibleH5P');
            headerLink.classList.add('HeaderLinkDarkModeH5P');
            headerLink.classList.remove('HeaderLinkH5P');
            link.classList.add('LinkDarkModeH5P');
            link.classList.remove('LinkH5P');
            /* fullscreenButton.classList.add('LinkDarkModeH5P');
            fullscreenButton.classList.remove('LinkH5P'); */
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
 function removeIframeFocus(element, nameForSummary) {
      if (!nameForSummary) {
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

// function to adjust the iframe size
function adjustIframeSize() {
      var iframe = document.getElementById('Content'+@@AUTOID@@);
      if (iframe) {
            // Calculate the maximum height based on viewport height and desired aspect ratio
            var maxHeight = window.innerHeight * 0.65; // 58vh
            console.log("maxHeight " +maxHeight);
            // Set the maximum height of the iframe
            iframe.style.maxHeight = maxHeight + 'px';
    
            // Calculate the width based on the aspect ratio and maximum height
            var aspectRatioWidth = maxHeight * (16 / 9); // Assuming a 16:9 aspect ratio
    
            // Set the width of the iframe to ensure it maintains the aspect ratio
            iframe.style.width = aspectRatioWidth + 'px';
        }
  }
  
  // Call the adjustIframeSize function when the iframe's content is fully loaded
//window.onload = adjustIframeSize;
  
// Call the adjustIframeSize function when the browser window is resized
//window.addEventListener('resize', adjustIframeSize);

// H5P iframe Resizer
(function () {
      if (!window.postMessage || !window.addEventListener || window.h5pResizerInitialized) {
        return; // Not supported
      }
      window.h5pResizerInitialized = true;
    
      // Map actions to handlers
      var actionHandlers = {};
    
      /**
       * Prepare iframe resize.
       *
       * @private
       * @param {Object} iframe Element
       * @param {Object} data Payload
       * @param {Function} respond Send a response to the iframe
       */
      actionHandlers.hello = function (iframe, data, respond) {
        // Make iframe responsive
        iframe.style.width = '80%';
    
        // Bugfix for Chrome: Force update of iframe width. If this is not done the
        // document size may not be updated before the content resizes.
        iframe.getBoundingClientRect();
    
        // Tell iframe that it needs to resize when our window resizes
        var resize = function () {
          if (iframe.contentWindow) {
            // Limit resize calls to avoid flickering
            respond('resize');
          }
          else {
            // Frame is gone, unregister.
            window.removeEventListener('resize', resize);
          }
        };
        window.addEventListener('resize', resize, false);
    
        // Respond to let the iframe know we can resize it
        respond('hello');
      };
    
      /**
       * Prepare iframe resize.
       *
       * @private
       * @param {Object} iframe Element
       * @param {Object} data Payload
       * @param {Function} respond Send a response to the iframe
       */
      actionHandlers.prepareResize = function (iframe, data, respond) {
        // Do not resize unless page and scrolling differs
        if (iframe.clientHeight !== data.scrollHeight ||
            data.scrollHeight !== data.clientHeight) {
    
          // Reset iframe height, in case content has shrinked.
          iframe.style.height = data.clientHeight + 'px';
          respond('resizePrepared');
        }
      };
    
      /**
       * Resize parent and iframe to desired height.
       *
       * @private
       * @param {Object} iframe Element
       * @param {Object} data Payload
       * @param {Function} respond Send a response to the iframe
       */
      actionHandlers.resize = function (iframe, data) {
        // Resize iframe so all content is visible. Use scrollHeight to make sure we get everything
        iframe.style.height = data.scrollHeight + 'px';
      };
    
      /**
       * Keyup event handler. Exits full screen on escape.
       *
       * @param {Event} event
       */
      var escape = function (event) {
        if (event.keyCode === 27) {
          exitFullScreen();
        }
      };
    
      // Listen for messages from iframes
      window.addEventListener('message', function receiveMessage(event) {
        if (event.data.context !== 'h5p') {
          return; // Only handle h5p requests.
        }
    
        // Find out who sent the message
        var iframe, iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
          if (iframes[i].contentWindow === event.source) {
            iframe = iframes[i];
            break;
          }
        }
    
        if (!iframe) {
          return; // Cannot find sender
        }
    
        // Find action handler handler
        if (actionHandlers[event.data.action]) {
          actionHandlers[event.data.action](iframe, event.data, function respond(action, data) {
            if (data === undefined) {
              data = {};
            }
            data.action = action;
            data.context = 'h5p';
            event.source.postMessage(data, event.origin);
          });
        }
      }, false);
    
      // Let h5p iframes know we're ready!
      var iframes = document.getElementsByTagName('iframe');
      var ready = {
        context: 'h5p',
        action: 'ready'
      };
      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].src.indexOf('h5p') !== -1) {
          iframes[i].contentWindow.postMessage(ready, '*');
        }
      }
    
    })();
    