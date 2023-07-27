/* let timeout; // timeout variable for mouse movement

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(hideFullscreenExitButton, 2000);
  }
  // the code block below will be later
  // Event listeners for mouse movement that resets the timer and calls the showFullscreenButton function
  mouseMovementCollector.addEventListener('mousemove', () => {
    console.log('mousemove');
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      console.log('mousemove in fullscreen');
      showFullscreenExitButton();
      resetTimer();
    }
  }); */

const presentationName = 'MentiEmbedTest';
const sharedURL = 'https://www.mentimeter.com/app/presentation/alssx23dpamkz1y7sq15tdokj3chob2w'

onLoad(sharedURL, presentationName);
function onLoad(url, name) {
  if (typeof (url, name) != 'undefined') {
      const id = idFromURL(url);
      const embedURL = "https://www.mentimeter.com/app/presentation/" + id + "/embed";
      const renamedPresentation = reNamePresentationName(name);
      const resultsPDF = 'https://static.mentimeter.com/screenshot/pdfs/' + renamedPresentation + '.pdf' + '?seriesId=' + id + '&screenshotTargetUrl=https%3A%2F%2Fwww.mentimeter.com%2Fpreview';
      console.log('embedURL: ' + embedURL);
      console.log('resultsPDF: ' + resultsPDF);
      console.log('url: ' + url);
      };
  };
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