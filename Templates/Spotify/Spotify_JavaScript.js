

/* const URL1 = "https://open.spotify.com/episode/5QgCmmTyfEvtg2Fdkv0T2s?si=84R-SM8ERfWoEbLlG8r_-Q";
const URL2 = "https://open.spotify.com/episode/5QgCmmTyfEvtg2Fdkv0T2s?si=84R-SM8ERfWoEbLlG8r_-Q";
const URL3 = "https://open.spotify.com/episode/5QgCmmTyfEvtg2Fdkv0T2s?si=84R-SM8ERfWoEbLlG8r_-Q";

function constructEmbedURL(URL){
  if (typeof(URL) != 'undefined') {
        URL = URL.split("/")[URL.split("/").length-1];
        URL = URL.split("?")[0];
        return URL;
  }
} */

// on load function e.g. when the Collapsible button is clicked



/* window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embedIframe'+@@AUTOID@@);
    const options = {
      width: '100%',
      height: '200',
      uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
    };
    const callback = (EmbedController) => {
      document.querySelectorAll('.episode').forEach(
        episode => {
          episode.addEventListener('click', () => {
            EmbedController.loadUri(episode.dataset.spotifyId)
          });
        })
    };
    IFrameAPI.createController(element, options, callback);
} */
console.log("Spotify_JavaScript.js loaded");
window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById('embed-iframe');
    let options = {
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };
  