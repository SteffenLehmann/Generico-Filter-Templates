const presentationName = '@@Presentation Name: The file name of the Mentimenter presentation@@';
const sharedURL = '@@Mentimeter shared video URL: Remember to change the settings to share with everyone@@';

// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'); 
const fullscreenButton = document.getElementById('fullscreenButton');
const exitFullscreenButton = document.getElementById('exitFullscreenButton');
const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton');

// function calls to create the temlate on moodle
createNameForSummary(presentationName);
onLoad(sharedURL, presentationName);

//creates the name for the template
function createNameForSummary(name) {
  if (typeof(name) != 'undefined') {
    const summary = document.getElementById('detailsButton');
    name = "👩‍🏫 "+ name; // you can add emoji to the summary title here, e.g. 🎦
    summary.textContent = name; // set the name of the button containing the padlet board
  } 
}

function idFromURL(url) {
    const parts = url.split("/");
    return parts[parts.length - 1];
}

function reNamePresentationName(name) {//The current url for results requires the name of the presentation with %20 instead of the first space
    if (name.indexOf(" ") >= 0) {
        const wordsOfName = name.split(" ");
        name = wordsOfName[0] + "%20" + wordsOfName.slice(1).join(" ");
    }
    return name;
}

function onLoad(url, name) {
    if (typeof (url, name) != 'undefined') {
        const id = idFromURL(url);
        const embedURL = "https://www.mentimeter.com/app/presentation/" + id + "/embed";
        const renamedPresentation = reNamePresentationName(name);
        const resultsPDF = 'https://static.mentimeter.com/screenshot/pdfs/' + renamedPresentation + '.pdf' + '?seriesId=' + id + '&screenshotTargetUrl=https%3A%2F%2Fwww.mentimeter.com%2Fpreview';
        document.getElementById('Details'+@@AUTOID@@).onclick = function () {
            document.getElementById('Content'+@@AUTOID@@).src = "" + embedURL;
            document.getElementById('Download'+@@AUTOID@@).href = "" + resultsPDF;
            document.getElementById('ShareLink'+@@AUTOID@@).href = "" + url;
        };
    };
}

// event listener for the details element state change
details.addEventListener("toggle", (event) => {
    if (details.open) {
      /* the element was toggled open */
      detailsButton.style.color = '#468ff4';
      detailsButton.style.backgroundColor = '#CCCCCC';
    } else {
      /* the element was toggled closed */
      detailsButton.style.backgroundColor = '';
      detailsButton.style.color = '';
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
  });