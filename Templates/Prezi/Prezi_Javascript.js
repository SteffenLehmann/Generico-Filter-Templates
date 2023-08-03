// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the Prezi presentation@@'; // user input
const preziURL = '@@Prezi URL: From your Prezi dashboard find the presentation you would like to share. Click the three dots in its thumbnail and select Sharing and privacy from the list. Then you can copy the link.@@';

// getting the elements from the HTML
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(preziURL);
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