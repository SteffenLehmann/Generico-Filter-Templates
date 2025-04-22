// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name@@', "Name: The name of the button that will contain the Miro board", opts);
const url = getLongInput('@@Miro URL@@', "Miro share URL: Copy the browser link/URL of the Miro board you want to embed", opts);
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
assignHeaderLinks(url);
const embedurl = constructURL(url);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(url, embedurl, nameForSummary);

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

//creates the name for the template
function createNameForSummary(name) {
  if (name) {
    name = "✏️ "+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
  } else if (!name) {
    debugger;
    const header = document.getElementById('HeaderContainer'+@@AUTOID@@).style.display = 'none';
    assignParent('stateIndicator', 'iframeContainer', 'Link-container', 'TemplateContainer');
  }
}

// function to assign the parent element
function assignParent(stateIndicator, iframeContainer, linkContainer, TemplateContainer) {
  const container = document.getElementById(TemplateContainer+@@AUTOID@@);
  const MoveArray = [document.getElementById(stateIndicator+@@AUTOID@@), document.getElementById(iframeContainer+@@AUTOID@@), document.getElementById(linkContainer+@@AUTOID@@)];
  debugger;
  for (let i = 0; i < MoveArray.length; i++) {
        container.appendChild(MoveArray[i]);
  }
}
// construct the URL for the embed
function constructURL(url) {
  if (url) {
    let embedurl =  "https://miro.com/app/live-embed/";
    const id = url.split("/")[url.split("/").length-2];
    embedurl += id + "/";
    return embedurl;
  }
}

// on load function e.g. when the Collapsible button is clicked
function onLoad(url, embedurl, nameForSummary){
    if(url && embedurl && nameForSummary){
      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        assignContent(url, embedurl);
    };
  } else if (url && embedurl && !nameForSummary) {
      assignContent(url, embedurl);
  }   
}

function assignContent(url, embedurl) {
  document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
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
        if (detailsButton.classList.contains('detailsCollapsibleMiro')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsibleMiro');
        detailsButton.classList.remove('detailsCollapsibleDarkModeMiro');
        headerLink.classList.add('HeaderLinkMiro');
        headerLink.classList.remove('HeaderLinkDarkModeMiro');
        sharelink.classList.add('LinkMiro');
        sharelink.classList.remove('LinkDarkModeMiro');
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModeMiro')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModeMiro');
        detailsButton.classList.remove('detailsCollapsibleMiro');
        headerLink.classList.add('HeaderLinkDarkModeMiro');
        headerLink.classList.remove('HeaderLinkMiro');
        sharelink.classList.add('LinkDarkModeMiro');
        sharelink.classList.remove('LinkMiro');
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
    element.style.backgroundColor = "#E1E1E1";
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