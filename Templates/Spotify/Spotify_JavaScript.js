const summaryName = getLongInput('@@Name: The name of the button that will contain the podcast@@','Name: The name of the button that will contain the podcast', opts);
const url = getLongInput('@@URL: The URL for the podcast episode@@', "URL: The URL for the podcast episode", opts);

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

const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const content = document.getElementById('content'+@@AUTOID@@)

createNameForSummary(summaryName);
assignHeaderLinks(url);
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(url);

function onLoad(url) {
  if (typeof(url) != 'undefined') {
    url = constructEmbedURL(url);
    content.src= url;
    setSameSiteAttribute('None');
  }
}

function constructEmbedURL(URL){
  if (typeof(URL) != 'undefined') {
        URL = URL.split("/")[URL.split("/").length-1];
        URL = URL.split("?")[0];
        URL = "https://open.spotify.com/embed/episode/" + URL + "?utm_source=generator&theme=0"
        return URL;
  }
}
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    detailsButton.textContent = "🎙️ "+ name; // set the name of the button containing the padlet board
  } 
}

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

function setSameSiteAttribute(sameSiteValue) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [name, value] = cookie.split("=");

    // Set the cookie with the desired SameSite attribute
    document.cookie = `${name}=${value}; SameSite=${sameSiteValue}; Secure`;
  }
}

// event listener for the details element state change
details.addEventListener("toggle", (event) => {
  if (details.open) {
    /* the element was toggled open */
    detailsButton.style.color = '#468ff4';
    detailsButton.style.backgroundColor = '#CCCCCC';
    detailsButton.style.borderBottomRightRadius = '5px';
    detailsButton.style.borderBottomLeftRadius = '5px';
    headerLink.style.display = 'none';
  } else {
    /* the element was toggled closed */
    detailsButton.style.backgroundColor = '';
    detailsButton.style.color = '';
    detailsButton.style.borderBottomRightRadius = '5px';
    detailsButton.style.borderBottomLeftRadius = '5px';
    headerLink.style.display = 'block';
    content.pauseIframeAudio();
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
        if (detailsButton.classList.contains('detailsCollapsibleSpotify')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsibleSpotify');
        detailsButton.classList.remove('detailsCollapsibleDarkModeSpotify');
        headerLink.classList.add('HeaderLinkSpotify');
        headerLink.classList.remove('HeaderLinkDarkModeSpotify');
        if (typeof(headerdownload) != 'undefined') {
              headerdownload.classList.add('HeaderLinkSpotify');
              headerdownload.classList.remove('HeaderLinkDarkModeSpotify');
        }
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModeSpotify')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModeSpotify');
        detailsButton.classList.remove('detailsCollapsibleSpotify');
        headerLink.classList.add('HeaderLinkDarkModeSpotify');
        headerLink.classList.remove('HeaderLinkSpotify');
        if (typeof(headerdownload) != 'undefined') {
              headerdownload.classList.add('HeaderLinkDarkModeSpotify');
              headerdownload.classList.remove('HeaderLinkSpotify');
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
