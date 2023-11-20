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
//const fullscreenButton = document.getElementById('fullscreenButton'+@@AUTOID@@);
//const exitFullscreenButton = document.getElementById('exitFullscreenButton'+@@AUTOID@@);
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);


// function calls to create the temlate on moodle
createNameForSummary(nameForSummary);
assignHeaderLinks(dURL);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(dURL);



// function to assign the header links
function assignHeaderLinks(url) {
      headerLink.href = ""+ url;
}


// creates the name for the template
function createNameForSummary(name) {
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
function onLoad(url){
      if (typeof(url) != 'undefined') {
            const embeddUrl = URLtoEmbedURL(url);
            document.getElementById('Details'+@@AUTOID@@).onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+embeddUrl;
                // set the SameSite attribute for the cookies
                //setSameSiteAttribute('None');
            };
      }
}

function URLtoEmbedURL(URL) {
      const URLDate = URL.split("/");
      console.log(URLDate);
      if (URLDate[7] == "_layouts"){
          return directURLtoEmbedURL(URLDate);
      } else if (URLDate[7] == "Documents"||URLDate[7] == "Shared%20Documents" ){
          return copyLinkToEmbedURL(URLDate);
      }
  }
  /*
  Private file share[
    0 'https:',
    1 '',
    2 'aaudk-my.sharepoint.com',
    3 ':p:',
    4 'r',
    5 'personal',
    6 'mz57me_create_aau_dk',
    7 'Documents',
    8 'Moodle%20share%20test',
    9 'GoogleSlides.pptx?d=w1fb4dc5da32a406ea0822a9b230bc50f&csf=1&web=1&e=ecqgdA'
  ]
  Site file shared[
    0 'https:',
    1 '',
    2 'aaudk.sharepoint.com',
    3 ':p:',
    4 'r',
    5 'sites',
    6 'persondata-undervisning',
    7 'Shared%20Documents',
    8 'Slides_GDPR_til_studerende-final.pptx?d=w296bd959a055412f8309026f8c14e9ee&csf=1&web=1&e=rvWdgX'
  ]
  */
  function copyLinkToEmbedURL (URLDate) {
      if (URLDate[5] == "personal" || URLDate[5] == "sites"){
          let id = URLDate[URLDate.length-1].split("=")[1].split("&")[0].substring(1);
          console.log(id);
          // 8 - 4 - 4 - 4 - 12
          id = id.substring(0,8)+"-"+id.substring(8,12)+"-"+id.substring(12,16)+"-"+id.substring(16,20)+"-"+id.substring(20,32);
          console.log(id)
          return URLDate[0]+"/"+URLDate[1]+"/"+URLDate[2]+"/"+URLDate[5]+"/"+URLDate[6]+"/"+"_layouts/15/Doc.aspx?sourcedoc="+"{"+id+"}"+"&action=embedview&wdAr=1.7777777777777777&wdEaaCheck=1";
      }
  }
  
  /*
  Sharetype is [6] and email is [7] and sourceID is [9]
  Embed URL "https://aaudk-my.sharepoint.com/personal/mz57me_create_aau_dk/_layouts/15/Doc.aspx?sourcedoc={1fb4dc5d-a32a-406e-a082-2a9b230bc50f}&amp;action=embedview&amp;wdAr=1.7777777777777777"
  [
      0 'https:',
      1 '',
      2 'aaudk-my.sharepoint.com',
      3 ':p:',
      4 'r',
      5 'personal',
      6 'mz57me_create_aau_dk',
      7 '_layouts',
      8 '15',
      9 'Doc.aspx?sourcedoc=%7B1FB4DC5D-A32A-406E-A082-2A9B230BC50F%7D&file=GoogleSlides.pptx&action=edit&mobileredirect=true'
  ]
  */
  function directURLtoEmbedURL (URLDate){
      if (URLDate[5] == "personal" || URLDate[5] == "sites") {
          const sourceID = URLDate[9].split("%");
          const idLenght = sourceID[1].length;
          let id = sourceID[1].replace("7B","")
          if (idLenght == id.length) {
              id = id[1].replace("7b"," ")
          }
          return URLDate[0]+"/"+URLDate[1]+"/"+URLDate[2]+"/"+URLDate[5]+"/"+URLDate[6]+"/"+URLDate[7]+"/"+URLDate[8]+"/"+sourceID[0]+"{"+id+"}"+"&action=embedview&wdAr=1.7777777777777777&wdEaaCheck=1;wdEaaCheck=1";
      }
  }

/* // hide the enter fullscreen button on if the iframe is a presentation
function hideEnterFullscreenButtonOnPresentation(type) {
      if (type == 'presentation'){
            fullscreenButton.style.display = 'none';
      } 
} */


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
    
/* // hide exit fullscreen button
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
      console.log('exitFullscreen');
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
}); */

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
            link.classList.add('LinkMSFile');
            link.classList.remove('LinkDarkModeMSFile');
            /* fullscreenButton.classList.add('LinkMSFile');
            fullscreenButton.classList.remove('LinkDarkModeMSFile'); */
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkModeMSFile')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkModeMSFile');
            detailsButton.classList.remove('detailsCollapsibleMSFile');
            headerLink.classList.add('HeaderLinkDarkModeMSFile');
            headerLink.classList.remove('HeaderLinkMSFile');
            link.classList.add('LinkDarkModeMSFile');
            link.classList.remove('LinkMSFile');
            /* fullscreenButton.classList.add('LinkDarkModeMSFile');
            fullscreenButton.classList.remove('LinkMSFile'); */
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
