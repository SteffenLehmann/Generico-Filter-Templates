// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the Miro board@@'; // user input
const url = '@@Miro URL: Copy the link/URL of the Miro board you want to embed@@'; // user input

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

onLoad(url, embedurl);

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    name = ""+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
  } 
}
// construct the URL for the embed
function constructURL(url) {
  if (typeof(url) != 'undefined') {
    let embedurl =  "https://miro.com/app/live-embed/";
    const id = url.split("/")[url.split("/").length-2];
    embedurl += id + "/";
    return embedurl;
  }
}

// on load function e.g. when the Collapsible button is clicked
function onLoad(url, embedurl){
    if(typeof(url, embedurl) != 'undefined'){
        document.getElementById('Details'+@@AUTOID@@).onclick= function() {
            document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
            document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
            setSameSiteAttribute('None');
    };
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
  console.log('Background color changed:', newBackgroundColor);
  setBackgrounColor(newBackgroundColor);
});
