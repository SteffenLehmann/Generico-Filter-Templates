// Custom JS
// user input from Moodle
const summaryName = getLongInput('@@Name@@', 'Name: The name of the button that will contain the google folder', opts);
const dURL = getLongInput('@@Google Folder URL@@', 'Google share URL: Remember to make it public for everyone', opts);

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
const shareLink = document.getElementById('ShareLink'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(summaryName);
assignHeaderLinks(dURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(dURL);

function constructEmbedURL(url){
    const embedFolderurl =  "https://drive.google.com/embeddedfolderview?id=";
    const embedFolderurlEnd = "&amp;usp#list"
    let id = url.split("/")[url.split("/").length-1];
    const n = id.includes("?");
    
    if(n == true){
            id = id.split("?");
            id.pop();
    }
    return embedFolderurl + id + embedFolderurlEnd;
}

// creates the name for the template
function createNameForSummary(name) {
    if (typeof(name) != 'undefined') {
        name = "📂 " + name;
    }
    detailsButton.textContent = name; // set the name of the button containing the padlet board
} 
// function to assign the header links
function assignHeaderLinks(url) {
    headerLink.href = ""+ url;
}

function onLoad(url){
    if (typeof(url) != 'undefined') {
        details.onclick = function() {
            const embedUrl = constructEmbedURL(url);
            document.getElementById('Content'+@@AUTOID@@).src = ""+embedUrl;
            document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
        };
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
          if (detailsButton.classList.contains('detailsCollapsibleGoogleFolder')) {return;}
          // Light mode
          detailsButton.classList.add('detailsCollapsibleGoogleFolder');
          detailsButton.classList.remove('detailsCollapsibleDarkModeGoogleFolder');
          headerLink.classList.add('HeaderLinkGoogleFolder');
          headerLink.classList.remove('HeaderLinkDarkModeGoogleFolder');
          shareLink.classList.add('LinkGoogleFolder');
          shareLink.classList.remove('LinkDarkModeGoogleFolder');
    } else if (backGroundColor == 'rgb(25, 26, 30)') {
          if (detailsButton.classList.contains('detailsCollapsibleDarkModeGoogleFolder')) {return;}
          // Dark mode
          detailsButton.classList.add('detailsCollapsibleDarkModeGoogleFolder');
          detailsButton.classList.remove('detailsCollapsibleGoogleFolder');
          headerLink.classList.add('HeaderLinkDarkModeGoogleFolder');
          headerLink.classList.remove('HeaderLinkGoogleFolder');
          shareLink.classList.add('LinkDarkModeGoogleFolder');
          shareLink.classList.remove('LinkGoogleFolder');
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
