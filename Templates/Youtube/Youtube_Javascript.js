// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the YouTube video@@'; // user input
const YouTubeURL = '@@YouTube URL: Copy in the link/URL of the video you want to embed@@'; // user input
// getting the elements from the HTML
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);


// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(YouTubeURL);
// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);
onLoad(YouTubeURL);

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    name = "🎦 "+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
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
  if(typeof(url) != 'undefined'){
    const YTid = url.split("=")[url.split("=").length-1];
    const embedURL = "//www.youtube.com/embed/" + YTid + "/";
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
      document.getElementById('Content'+@@AUTOID@@).src = ""+embedURL;
      document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
      setSameSiteAttribute('None');
      };
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
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModeYouTube')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModeYouTube');
        detailsButton.classList.remove('detailsCollapsibleYouTube');
        headerLink.classList.add('HeaderLinkDarkModeYouTube');
        headerLink.classList.remove('HeaderLinkYouTube');
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
