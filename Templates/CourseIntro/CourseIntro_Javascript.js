// Custom JS
// user input from Moodle
const studieCurriculum = "@@Studie curriculum module link@@"
const courseDescriptions = '@@Course description: please add a description@@'; // user input
const examDescriptions = '@@Exam Description: please add a description@@'; // user input
const educatorName = '@@Teacher: Name of the teacher@@'; // user input
const educatorLink = '@@Teacher: Email or profile link for the teacher@@'; // user input
const coordiatorName = '@@Coordinator: Name of the coordinator@@'; // user input
const coordiatorLink = '@@Coordinator: Email or profile link for the coordinator@@'; // user input
const secretaryName = '@@Secretary: Name of the secretary@@'; // user input
const secretaryLink = '@@Secretary: Email or profile link for the secretary@@'; // user input

// getting the elements from the HTML
const fullscreenIframeContainer = document.getElementById('iframeContainer'+@@AUTOID@@); 
const fullscreenButton = document.getElementById('fullscreenButton'+@@AUTOID@@);
const exitFullscreenButton = document.getElementById('exitFullscreenButton'+@@AUTOID@@);
const details1 = document.getElementById('Details1'+@@AUTOID@@);
const details2 = document.getElementById('Details2'+@@AUTOID@@);
const details3 = document.getElementById('Details3'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);
const courseInfoButton = document.getElementById('courseInfoButton'+@@AUTOID@@);
const examInfoButton = document.getElementById('exam'+@@AUTOID@@);
const headerLink = document.getElementById('ShareLinkHeader'+@@AUTOID@@);
const detailsList = [details1, details2, details3];

function addEducatorInfo(educatorName, educatorLink, coordiatorName, coordiatorLink, secretaryName, secretaryLink) {
      if (typeof(educatorName) != 'undefined' || typeof(educatorLink) != 'undefined') {
            const educatorElement = document.getElementById('educator'+@@AUTOID@@);
            educatorElement.innerHTML = educatorName;
            educatorElement.href = educatorLink;
      }
      if (typeof(coordiatorName) != 'undefined' || typeof(coordiatorLink) != 'undefined') {
            const coordinatorElement = document.getElementById('coordinator'+@@AUTOID@@);
            coordinatorElement.innerHTML = coordiatorName;
            coordinatorElement.href = coordiatorLink;
      }
      if (typeof(secretaryName) != 'undefined' || typeof(secretaryLink) != 'undefined') {
            const secretaryElement = document.getElementById('secretary'+@@AUTOID@@);
            secretaryElement.innerHTML = secretaryName;
            secretaryElement.href = secretaryLink;
      }
}
// function calls to create the temlate on moodle
assignHeaderLinks(studieCurriculum);
addEducatorInfo(educatorName, educatorLink, coordiatorName, coordiatorLink, secretaryName, secretaryLink);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

//hideEnterFullscreenButtonOnPresentation(downloadURL[1]);
onLoad(studieCurriculum, courseDescriptions, examDescriptions);

// function to assign the header links
function assignHeaderLinks(url) {
      headerLink.href = ""+ url;
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
function onLoad(url, courseText, examText){
      if (typeof(url) != 'undefined') {
            details1.onclick= function() {
                document.getElementById('Content'+@@AUTOID@@).src = ""+url;
                document.getElementById('ShareLink'+@@AUTOID@@).href = ""+ url;
                // set the SameSite attribute for the cookies
                setSameSiteAttribute('None');
            };
      }
      if (typeof(courseText) != 'undefined') {
            details2.onclick= function() {
                  document.getElementById('courseInfo'+@@AUTOID@@).innerHTML = courseText;
            };
      }
      if (typeof(examText) != 'undefined') {
            details3.onclick= function() {
                  document.getElementById('examInfo'+@@AUTOID@@).innerHTML = examText;
            };
      }
}


// event listener for the details element state change
detailsList.forEach(detail => {
      detail.addEventListener("toggle", (event) => {
            console.log("toggled");
            let indexOfDetail = detailsList.indexOf(detail);
            detailsStateChange(detail, indexOfDetail)}
      );
});   

function detailsStateChange(element, index) {
      const detailsContentList = [detailsButton, courseInfoButton, examInfoButton];
      buttonForElement = detailsContentList[index];
      if (element.open){
            console.log("opened " + element);
            console.log(element);
            /* the element was toggled open */
            buttonForElement.style.color = '#468ff4';
            buttonForElement.style.backgroundColor = '#CCCCCC';
            buttonForElement.style.borderBottomRightRadius = '0px';
            buttonForElement.style.borderBottomLeftRadius = '0px';
            if (index == 0) {
                  headerLink.style.display = 'none';
            }
            
      } else {
            console.log("closed "+ element);
            /* the element was toggled closed */
            buttonForElement.style.backgroundColor = '';
            buttonForElement.style.color = '';
            buttonForElement.style.borderBottomRightRadius = '5px';
            buttonForElement.style.borderBottomLeftRadius = '5px';
            if (index == 0) {
                  headerLink.style.display = 'block';
            }
      }
}

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
      } else if (backGroundColor == 'rgb(25, 26, 30)') {
            if (detailsButton.classList.contains('detailsCollapsibleDarkMode')) {return;}
            // Dark mode
            detailsButton.classList.add('detailsCollapsibleDarkMode');
            detailsButton.classList.remove('detailsCollapsible');
            headerLink.classList.add('HeaderLinkDarkMode');
            headerLink.classList.remove('HeaderLink');
      }
}

// custom event to check the background color of the page
function checkBackgroundColor() {
      //check if fullscreen is negative
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            return;
      } else {
            const currentBackgroundColor = getBackgroundColor();
            if (currentBackgroundColor !== previouisBackgroundColor) {
                  previouisBackgroundColor = currentBackgroundColor;
                  // Trigger the custom event
                  const event = new CustomEvent('backgroundColorChanged', {detail: currentBackgroundColor});
                  document.dispatchEvent(event);
            }
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
