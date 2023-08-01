// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the YouTube video@@'; // user input
const YouTubeURL = '@@YouTube URL: Copy in the link/URL of the video you want to embed@@'; // user input

// getting the elements from the HTML
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton');
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(YouTubeURL);
onLoad(YouTubeURL);


// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    const summary = document.getElementById('detailsButton');
    name = "🎦 "+ name; // you can add emoji to the summary title here, e.g. 🎦
    summary.textContent = name; // set the name of the button containing the padlet board
    console.log('name ' + name);
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
      // set the SameSite attribute for the cookies
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
      headerLink.style.display = 'none';
    } else {
      /* the element was toggled closed */
      detailsButton.style.backgroundColor = '';
      detailsButton.style.color = '';
      headerLink.style.display = 'block';
    }
  });