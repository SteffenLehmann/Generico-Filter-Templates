const URL = "https://open.spotify.com/episode/5QgCmmTyfEvtg2Fdkv0T2s?si=84R-SM8ERfWoEbLlG8r_-Q";

function constructEmbedURL(URL){
  if (typeof(URL) != 'undefined') {
        URL = URL.split("/")[URL.split("/").length-1];
        URL = URL.split("?")[0];
        return URL;
  }
}

console.log(constructEmbedURL(URL));