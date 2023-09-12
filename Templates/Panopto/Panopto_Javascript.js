// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button containing the Panopto video@@', "Name: The name of the button containing the Panopto video", opts);
const sharedURL = getLongInput('@@Panopto shared video URL: remember to set it to public@@', "Panopto shared video URL: remember to set it to public", opts);

/* 
  function to get the user input from the generico object opts. 
  the original input and the bare input must be the same except for the @@@@.
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
assignHeaderLinks(sharedURL);
// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(sharedURL);

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    name = "🎦 "+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
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

function constructEmbedURL(url) {
  if (typeof (url) != 'undefined') {
    // set the SameSite attribute for the cookies
    const parts = url.split("?")
    const ID = parts[parts.length - 1]
    const embedURL = "https://panopto.aau.dk/Panopto/Pages/Embed.aspx?" + ID + "&autoplay=false&offerviewer=true&showtitle=true&showbrand=true&captions=true&interactivity=all"
    return embedURL
  }
}

// on load function e.g. when the Collapsible button is clicked
function onLoad(url){
  const embedURL = constructEmbedURL(url);  
  if (typeof (embedURL) != 'undefined') {
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
  }
);

// function to get the background color of the page
function getBackgroundColor() {
  const bodyElement = document.body;
  const computedStyle = window.getComputedStyle(bodyElement);
  const backgroundColor = computedStyle.backgroundColor;

  return backgroundColor;
}

function setBackgrounColor(backGroundColor) {
  if (backGroundColor == 'rgb(255, 255, 255)') {
        if (detailsButton.classList.contains('detailsCollapsiblePanopto')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsiblePanopto');
        detailsButton.classList.remove('detailsCollapsibleDarkModePanopto');
        headerLink.classList.add('HeaderLinkPanopto');
        headerLink.classList.remove('HeaderLinkDarkModePanopto');
        sharelink.classList.add('LinkPanopto');
        sharelink.classList.remove('LinkDarkModePanopto');
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModePanopto')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModePanopto');
        detailsButton.classList.remove('detailsCollapsiblePanopto');
        headerLink.classList.add('HeaderLinkDarkModePanopto');
        headerLink.classList.remove('HeaderLinkPanopto');
        sharelink.classList.add('LinkDarkModePanopto');
        sharelink.classList.remove('LinkPanopto');
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

