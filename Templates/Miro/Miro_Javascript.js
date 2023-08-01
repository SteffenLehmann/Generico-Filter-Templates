// Custom JS
// user input from Moodle
const nameForSummary = '@@Name: The name of the button containing the Miro board@@'; // user input
const url = '@@Miro URL: Copy the link/URL of the Miro board you want to embed@@'; // user input

// getting the elements from the HTML
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton');
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);

// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(url);
const embedurl = constructURL(url);
onLoad(url, embedurl);

// function to assign the header links
function assignHeaderLinks(url) {
  headerLink.href = ""+ url;
}

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    const summary = document.getElementById('detailsButton');
    name = ""+ name; // you can add emoji to the summary title here, e.g. 🎦
    summary.textContent = name; // set the name of the button containing the padlet board
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
      headerLink.style.display = 'none';
    } else {
      /* the element was toggled closed */
      detailsButton.style.backgroundColor = '';
      detailsButton.style.color = '';
      headerLink.style.display = 'block';
    }
  });
  