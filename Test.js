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
url = 'https://www.youtube.com/watch?v=vvIP7vabO4c'
onLoad(url);
  function onLoad(url){
    if(typeof(url) != 'undefined'){
        var embedURL =  "//www.youtube.com/embed/";
        var YTid = url.split("=")[url.split("=").length-1];
        embedURL += YTid + "/";
        console.log('embedURL ' + embedURL);
        console.log('url ' + url);
        };
  }
