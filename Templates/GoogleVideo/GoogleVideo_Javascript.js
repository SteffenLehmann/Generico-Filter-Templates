// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the google PDF@@'; // user input
const dURL = '@@Google shared URL: Remember to make it public for everyone@@'; // user input

// getting the elements from the HTML
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const headerdownload = document.getElementById('DownloadLinkHeader'+@@AUTOID@@);


// function calls to create the temlate on moodle
const URLs = constructURLs(dURL);
createNameForSummary(nameForSummary);
assignHeaderLinks(dURL, URLs[1]);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL, URLs[0], URLs[1]);


// function to assign the header links
function assignHeaderLinks(url, downloadURL) {
      headerLink.href = ""+ url;
      headerdownload.href = ""+downloadURL;
}


// creates the name for the template
function createNameForSummary(nameforbutton) {
      let name = nameforbutton;
      if (typeof(name) != 'undefined') {
            name = "🎦 "+ name;
      } 
      detailsButton.textContent = name; // set the name of the button containing the padlet board
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
function onLoad(url, embedURL, downloadURL){
      if (typeof(url) != 'undefined') {
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+embedURL;
                document.getElementById('ShareLink'+@@AUTOID@@).href = ""+ url;
                document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
                // set the SameSite attribute for the cookies
                setSameSiteAttribute('None');
            };
      }
}


// function to construct the download URL
function constructURLs(URL){
      if(typeof(URL) != 'undefined') {
            const ID = URL.split("/")[URL.split("/").length-2];

            const embedURL = 'https://drive.google.com/uc?export=preview&id=' + ID;
            const downloadableURL = 'https://drive.google.com/uc?export=download&id=' + ID;
            console.log("embedURL URL "+embedURL);
            return [embedURL ,downloadableURL];
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
        headerdownload.style.display = 'none';

      } else {
        /* the element was toggled closed */
        detailsButton.style.backgroundColor = '';
        detailsButton.style.color = '';
        detailsButton.style.borderBottomRightRadius = '5px';
        detailsButton.style.borderBottomLeftRadius = '5px';
        headerLink.style.display = 'block';
        headerdownload.style.display = 'block';
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
            if (detailsButton.classList.contains('detailsCollapsible')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsible');
            detailsButton.classList.remove('detailsCollapsibleDarkMode');
            headerLink.classList.add('HeaderLink');
            headerLink.classList.remove('HeaderLinkDarkMode');
            if (typeof(headerdownload) != 'undefined') {
                  headerdownload.classList.add('HeaderLink');
                  headerdownload.classList.remove('HeaderLinkDarkMode');
            }
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkMode')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkMode');
            detailsButton.classList.remove('detailsCollapsible');
            headerLink.classList.add('HeaderLinkDarkMode');
            headerLink.classList.remove('HeaderLink');
            if (typeof(headerdownload) != 'undefined') {
                  headerdownload.classList.add('HeaderLinkDarkMode');
                  headerdownload.classList.remove('HeaderLink');
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
