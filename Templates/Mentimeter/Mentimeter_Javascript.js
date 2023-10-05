// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button containing the Mentimenter presentation@@', "Name: The name of the button containing the Mentimenter presentation", opts);
const sharedURL = getLongInput('@@Mentimeter shared video URL: Remember to change the settings to share with everyone@@', "Mentimeter shared video URL: Remember to change the settings to share with everyone", opts);

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
const headerdownload = document.getElementById('DownloadLinkHeader'+@@AUTOID@@);
const sharelink = document.getElementById('ShareLink'+@@AUTOID@@);
const download = document.getElementById('Download'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
const urls = constructURLS(sharedURL);
assignHeaderLinks(sharedURL, urls[1]);
// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

onLoad(sharedURL, urls[0], urls[1]);

// render listener for the header so the collapsible button uses all avaliable space
window.addEventListener('DOMContentLoaded', function() {
  let firstElementHeight = document.querySelector('.container > :first-child').offsetHeight;
  let elements = document.querySelectorAll('.container > div');

  for (let i = 0; i < elements.length; i++) {
        elements[i].style.height = firstElementHeight + 'px';
  }
});

// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
  headerLink.href = ""+ url;
  if (typeof(downloadURL) != 'undefined'){
    headerdownload.href = ""+downloadURL;
  }
  showHeaderButtons(downloadURL);
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    name = "👩‍🏫 "+ name; // you can add emoji to the summary title here, e.g. 🎦
    detailsButton.textContent = name; // set the name of the button containing the padlet board
  } 
}
// url spilter to get the id of the presentation
function idFromURL(url) {
    const parts = url.split("/");
    return parts[parts.length - 1];
}
//The current url for results requires the name of the presentation with %20 instead of the first space
function reNamePresentationName(name) {
    if (name.indexOf(" ") >= 0) {
        const wordsOfName = name.split(" ");
        name = wordsOfName[0] + "%20" + wordsOfName.slice(1).join(" ");
    }
    return name;
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

// function to construct the embed and download url
function constructURLS(url) {
  if (typeof (url) != 'undefined') {
      const id = idFromURL(url);
      const embedURL = "https://www.mentimeter.com/app/presentation/" + id + "/embed";
      return [embedURL];
  }
}
// on load function e.g. when the Collapsible button is clicked
function onLoad(url, embedURL, resultURL) {
    if (typeof (url, embedURL) != 'undefined') {
        document.getElementById('Details'+@@AUTOID@@).onclick = function () {
            document.getElementById('Content'+@@AUTOID@@).src = "" + embedURL;
            document.getElementById('ShareLink'+@@AUTOID@@).href = "" + url;
            if (typeof (resultURL) != 'undefined') {
              document.getElementById('Download'+@@AUTOID@@).href = "" + resultURL;
            } else {
              document.getElementById('Download'+@@AUTOID@@).style.display = 'none';
            }
            setSameSiteAttribute('None');
        };
    };
}

// event listener for the details element state change
details.addEventListener("toggle", (event) => {
    if (details.open) {
      /* the element was toggled open */
      detailsButton.style.color = '#468ff4';
      detailsButton.style.backgroundColor = '#CCCCCC';
      detailsButton.style.borderBottomRightRadius = '0px';
      detailsButton.style.borderBottomLeftRadius = '0px';
      hideHeaderButtons();
    } else {
      /* the element was toggled closed */
      detailsButton.style.backgroundColor = '';
      detailsButton.style.color = '';
      detailsButton.style.borderBottomRightRadius = '5px';
      detailsButton.style.borderBottomLeftRadius = '5px';
      showHeaderButtons(urls[1]);
    }
  });

  // hide download header button
  function hideHeaderButtons() {
    headerdownload.style.display = 'none';
    headerLink.style.display = 'none';
  }
  
  // show download header button
  function showHeaderButtons(downloadURL) {
    headerLink.style.display = 'block';
    if (typeof(downloadURL) != 'undefined'){
      headerdownload.style.display = 'block';
      
    } else {
      headerdownload.style.display = 'none';
    }
  }

  
// function to get the background color of the page
function getBackgroundColor() {
  const bodyElement = document.body;
  const computedStyle = window.getComputedStyle(bodyElement);
  const backgroundColor = computedStyle.backgroundColor;

  return backgroundColor;
}

function setBackgrounColor(backGroundColor) {
  if (backGroundColor == 'rgb(255, 255, 255)') {
        if (detailsButton.classList.contains('detailsCollapsibleMentimeter')) {return;}
        // Light mode
        detailsButton.classList.add('detailsCollapsibleMentimeter');
        detailsButton.classList.remove('detailsCollapsibleDarkModeMentimeter');
        headerLink.classList.add('HeaderLinkMentimeter');
        headerLink.classList.remove('HeaderLinkDarkModeMentimeter');
        sharelink.classList.add('LinkMentimeter');
        sharelink.classList.remove('LinkDarkModeMentimeter');
        if (typeof(headerdownload) != 'undefined') {
              headerdownload.classList.add('HeaderLinkMentimeter');
              headerdownload.classList.remove('HeaderLinkDarkModeMentimeter');
              download.classList.add('LinkMentimeter');
              download.classList.remove('LinkDarkModeMentimeter');
        }
  } else if (backGroundColor == 'rgb(25, 26, 30)') {
        if (detailsButton.classList.contains('detailsCollapsibleDarkModeMentimeter')) {return;}
        // Dark mode
        detailsButton.classList.add('detailsCollapsibleDarkModeMentimeter');
        detailsButton.classList.remove('detailsCollapsibleMentimeter');
        headerLink.classList.add('HeaderLinkDarkModeMentimeter');
        headerLink.classList.remove('HeaderLinkMentimeter');
        sharelink.classList.add('LinkDarkModeMentimeter');
        sharelink.classList.remove('LinkMentimeter');
        if (typeof(headerdownload) != 'undefined') {
              headerdownload.classList.add('HeaderLinkDarkModeMentimeter');
              headerdownload.classList.remove('HeaderLinkMentimeter');
              download.classList.add('LinkDarkModeMentimeter');
              download.classList.remove('LinkMentimeter');
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
