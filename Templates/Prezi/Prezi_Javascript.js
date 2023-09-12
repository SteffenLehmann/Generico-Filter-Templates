// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button containing the Prezi presentation@@','Name: The name of the button containing the Prezi presentation', opts);
const preziURL = getLongInput('@@Prezi URL: From your Prezi dashboard find the presentation you would like to share. Click the three dots in its thumbnail and select Sharing and privacy from the list. Then you can copy the link.@@', "Prezi URL: From your Prezi dashboard find the presentation you would like to share. Click the three dots in its thumbnail and select Sharing and privacy from the list. Then you can copy the link.", opts);


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
assignHeaderLinks(preziURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(preziURL);

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    name = "👩‍🏫 "+ name; // you can add emoji to the summary title here, e.g. 🎦
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
// on load function e.g. when the Collapsible button is clicked
function onLoad(url) {
    if(typeof(url) != 'undefined'){
        const id = url.split("/")[url.split("/").length-2];
        const embedurl = "https://prezi.com/p/embed/" + id + '/'
        document.getElementById('Details'+@@AUTOID@@).onclick= function() {
            document.getElementById('Content'+@@AUTOID@@).src = ""+embedurl;
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
        if (detailsButton.classList.contains('detailsCollapsiblePrezi')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsiblePrezi');
        detailsButton.classList.remove('detailsCollapsibleDarkModePrezi');
        headerLink.classList.add('HeaderLinkPrezi');
        headerLink.classList.remove('HeaderLinkDarkModePrezi');
        sharelink.classList.add('LinkPrezi');
        sharelink.classList.remove('LinkDarkModePrezi');
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModePrezi')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModePrezi');
        detailsButton.classList.remove('detailsCollapsiblePrezi');
        headerLink.classList.add('HeaderLinkDarkModePrezi');
        headerLink.classList.remove('HeaderLinkPrezi');
        sharelink.classList.add('LinkDarkModePrezi');
        sharelink.classList.remove('LinkPrezi');
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
