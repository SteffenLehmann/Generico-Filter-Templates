// Custom JS
// user input from Moodle
const nameForSummary = getLongInput('@@Name: The name of the button that will contain the Microsoft file@@', 'Name: The name of the button that will contain the Microsoft file', opts);
const dURL = getLongInput('@@Microsoft file URL@@', "Microsoft file URL", opts);
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
const fullscreenIframeContainer = document.getElementById('iframeContainer'+@@AUTOID@@); 
const fullscreenButton = document.getElementById('fullscreenButton'+@@AUTOID@@);
const exitFullscreenButton = document.getElementById('exitFullscreenButton'+@@AUTOID@@);
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const sharelink = document.getElementById('ShareLink'+@@AUTOID@@);

// split URL
const URLData = parseURL(dURL);
const URLType = getType(URLData);
// function calls to create the temlate on moodle
createNameForSummary(nameForSummary, URLType);

assignHeaderLinks(dURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL, URLData, URLType);


//returns an array of the URL
function parseURL(URL) {
      return URL.split("/");
}
// function to assign the header links
function assignHeaderLinks(url) {
      headerLink.href = ""+ url;
}


// creates the name for the template
function createNameForSummary(inputName, type) {
      let name = inputName; // set the name of the button containing the padlet board
      if (typeof(name) != undefined) {
          if (type == 'pptx'){{name = "👩‍🏫 "+ name;}}
          else if (type == 'docx'){{name = "📄 "+ name;}}
          else if (type == 'xlsx'){{name = "📊 "+ name;}}
          else if (type == 'vsdx'){{name = "✏️ "+ name;}}
      } else {name = "Missing name"+ name;}
      detailsButton.textContent = name;
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
function onLoad(url, URLData, type){
      if (typeof(url) != 'undefined') {
            const embeddUrl = URLtoEmbedURL(URLData, type);
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+embeddUrl;
                document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
                // set the SameSite attribute for the cookies
                //setSameSiteAttribute('None');
            };
      }
}

//returns the filetype of the URL given an array of the URL
function getType(URLData) {
    if (URLData[7] == "_layouts"){
        return URLData[URLData.length-1].split(".")[2].split("&")[0];
    } else if (URLData[7] == "Documents"||URLData[7] == "Shared%20Documents" ){
        return URLData[URLData.length-1].split(".")[1].split("?")[0];
    } else { return console.log("URL not supported: could not parse the URL to identify the filetype. Pleas consult the tutorial.")}
}

function URLtoEmbedURL(URLData, type) {
    if (URLData[7] == "_layouts"){
        return directURLtoEmbedURL(URLData, type);
    } else if (URLData[7] == "Documents"||URLData[7] == "Shared%20Documents" ){
        return copyLinkToEmbedURL(URLData, type);
    }
}

function copyLinkToEmbedURL (URLData, type) {
      if (URLData[5] == "personal" || URLData[5] == "sites"){
          let id = URLData[URLData.length-1].split("=")[1].split("&")[0].substring(1);
          // 8 - 4 - 4 - 4 - 12
          id = id.substring(0,8)+"-"+id.substring(8,12)+"-"+id.substring(12,16)+"-"+id.substring(16,20)+"-"+id.substring(20,32);
          if (type !== "vsdx") {
              return URLData[0]+"/"+URLData[1]+"/"+URLData[2]+"/"+URLData[5]+"/"+URLData[6]+"/"+"_layouts/15/Doc.aspx?sourcedoc="+"{"+id+"}"+"&action=embedview&wdAr=1.7777777777777777&wdEaaCheck=1";  
          } else if (type == "vsdx") {
              return URLData[0]+"/"+URLData[1]+"/"+URLData[2]+"/"+URLData[5]+"/"+URLData[6]+"/"+"_layouts/15/Doc.aspx?sourcedoc="+"{"+id+"}"+"&action=embedview";  
          }
      }
  }

function directURLtoEmbedURL (URLData, type){
      if (URLData[5] == "personal" || URLData[5] == "sites") {
          const sourceID = URLData[9].split("%");
          const idLenght = sourceID[1].length;
          let id = sourceID[1].replace("7B","")
          if (idLenght == id.length) {
              id = id[1].replace("7b"," ")
          }
          if (type !== "vsdx") {
              return URLData[0]+"/"+URLData[1]+"/"+URLData[2]+"/"+URLData[5]+"/"+URLData[6]+"/"+URLData[7]+"/"+URLData[8]+"/"+sourceID[0]+"{"+id+"}"+"&action=embedview&wdAr=1.7777777777777777&wdEaaCheck=1;wdEaaCheck=1";
          } else if (type == "vsdx") {
              return URLData[0]+"/"+URLData[1]+"/"+URLData[2]+"/"+URLData[5]+"/"+URLData[6]+"/"+URLData[7]+"/"+URLData[8]+"/"+sourceID[0]+"{"+id+"}"+"&action=embedview";
          }
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
    
// hide exit fullscreen button
function hideFullscreenExitButton() {
      exitFullscreenButton.style.display = 'none';
}

// show exit fullscreen button
function showFullscreenExitButton() {
      exitFullscreenButton.style.display = 'block';
}

// Event listener for the fullscreen button
fullscreenButton.addEventListener('click', enterFullscreen);

    // Function to enter fullscreen
function enterFullscreen() {
      if (fullscreenIframeContainer.requestFullscreen) {
        fullscreenIframeContainer.requestFullscreen();
      } else if (fullscreenIframeContainer.mozRequestFullScreen) {
        fullscreenIframeContainer.mozRequestFullScreen();
      } else if (fullscreenIframeContainer.webkitRequestFullscreen) {
        fullscreenIframeContainer.webkitRequestFullscreen();
      } else if (fullscreenIframeContainer.msRequestFullscreen) {
        fullscreenIframeContainer.msRequestFullscreen();
      }
}
    
    // Function to exit fullscreen
function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
}
    
// Listen for fullscreen change event
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

// Handle the fullscreen change event to hide/show the exit fullscreen button
function handleFullscreenChange() {
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        // If the iframe enters fullscreen
        showFullscreenExitButton();
      } else {
        // If the iframe exits fullscreen
        hideFullscreenExitButton();
      }
}
    
// Event listener for the exit fullscreen button
exitFullscreenButton.addEventListener('click', () => {
      exitFullscreen();
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
            if (detailsButton.classList.contains('detailsCollapsibleMSFile')) {return;}
            // Light mode
            detailsButton.classList.add('detailsCollapsibleMSFile');
            detailsButton.classList.remove('detailsCollapsibleDarkModeMSFile');
            headerLink.classList.add('HeaderLinkMSFile');
            headerLink.classList.remove('HeaderLinkDarkModeMSFile');
            fullscreenButton.classList.add('LinkMSFile');
            fullscreenButton.classList.remove('LinkDarkModeMSFile');
            sharelink.classList.add('LinkMSFile');
            sharelink.classList.remove('LinkDarkModeMSFile');
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeMSFile')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeMSFile');
            detailsButton.classList.remove('detailsCollapsibleMSFile');
            headerLink.classList.add('HeaderLinkDarkModeMSFile');
            headerLink.classList.remove('HeaderLinkMSFile');
            fullscreenButton.classList.add('LinkDarkModeMSFile');
            fullscreenButton.classList.remove('LinkMSFile');
            sharelink.classList.add('LinkDarkModeMSFile');
            sharelink.classList.remove('LinkMSFile');
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
      setBackgrounColor(newBackgroundColor);
});
