// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button that will contain the YouTube video@@', "Name: The name of the button that will contain the YouTube video", opts);
const youTubeURL = getLongInput('@@YouTube URL: Copy in the link/URL of the video you want to embed@@', "YouTube URL: Copy in the link/URL of the video you want to embed", opts);

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
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const sharelink = document.getElementById('ShareLink'+@@AUTOID@@);


// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(youTubeURL);
// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);
onLoad(youTubeURL, nameForSummary);

//creates the name for the template
function createNameForSummary(name) {
  if (name) {
    name = "🎦 "+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
  } else if (!name){
    const header = document.getElementById('HeaderContainer'+@@AUTOID@@).style.display = 'none';
    assignParent('stateIndicator', 'iframeContainer', 'Link-container', 'TemplateContainer');
  }
}
//function to assign the stateIndicator, iframecontainer and Link-container parent to the TemplateContainerGooglePub
function assignParent(stateIndicator, iframeContainer, linkContainer, TemplateContainer) {
  const container = document.getElementById(TemplateContainer+@@AUTOID@@);
  const MoveArray = [document.getElementById(stateIndicator+@@AUTOID@@), document.getElementById(iframeContainer+@@AUTOID@@), document.getElementById(linkContainer+@@AUTOID@@)];
  for (let i = 0; i < MoveArray.length; i++) {
        container.appendChild(MoveArray[i]);
  }
}

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

function getUniqueTag() {
  let isCodeExecuted = false;

  if (!isCodeExecuted) {
        const uniqueTag = crypto.randomUUID();
        isCodeExecuted = true;
        return uniqueTag;
  }
}

// on load function e.g. when the Collapsible button is clicked
function onLoad(url, nameForSummary){
  if(url && nameForSummary){
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        assignContent(url);
      };
  } else if (url && !nameForSummary) {
    assignContent(url);
  }
}

function assignContent(url){
  const YTid = url.split("=")[url.split("=").length-1];
  const embedURL = "//www.youtube.com/embed/" + YTid + "/";
  document.getElementById('Content'+@@AUTOID@@).src = ""+embedURL;
  document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
  
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
        if (detailsButton.classList.contains('detailsCollapsibleYouTube')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsibleYouTube');
        detailsButton.classList.remove('detailsCollapsibleDarkModeYouTube');
        headerLink.classList.add('HeaderLinkYouTube');
        headerLink.classList.remove('HeaderLinkDarkModeYouTube');
        sharelink.classList.add('LinkYouTube');
        sharelink.classList.remove('LinkDarkModeYouTube');
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModeYouTube')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModeYouTube');
        detailsButton.classList.remove('detailsCollapsibleYouTube');
        headerLink.classList.add('HeaderLinkDarkModeYouTube');
        headerLink.classList.remove('HeaderLinkYouTube');
        sharelink.classList.add('LinkDarkModeYouTube');
        sharelink.classList.remove('LinkYouTube');
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