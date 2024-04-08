function constructDownloadURL(URL){
    if(URL) {
          const downloadID = URL.split("/")[URL.split("/").length-2];
          const downloadType = URL.split("/")[URL.split("/").length-4];
          let downloadURL;

          if (downloadType == "presentation"){
                downloadURL =  "https://docs.google.com/presentation/d/";
          } else if (downloadType == "document"){
                downloadURL =  "https://docs.google.com/document/d/";
          } else if (downloadType == "spreadsheets"){
                downloadURL =  "https://docs.google.com/spreadsheets/d/";
          }
          const downloadableURL = downloadURL + downloadID + "/export/pdf";
          return downloadableURL;
    } else {
          console.log("downloadURL is "+'undefined');
          return  undefined;
    }
}

function constructEmbedURL(URL){
    if (URL) {
          const embedID = URL.split("/")[URL.split("/").length-2];
          const embedType = URL.split("/")[URL.split("/").length-5];
          let embedURL;
          let embedURLend;
          
          if (embedType == "presentation"){
                embedURL =  "https://docs.google.com/presentation/d/e/";
                embedURLend = "/embed?start=false&loop=false&delayms=3000";
          } else if (embedType == "document"){
                embedURL =  "https://docs.google.com/document/d/e/";
                embedURLend = "/pub?embedded=true";
          } else if (embedType == "forms"){
                embedURL =  "https://docs.google.com/forms/d/e/";
                embedURLend = "/viewform?embedded=true";
          } else if (embedType == "spreadsheets"){
                embedURL =  "https://docs.google.com/spreadsheets/d/e/";
                embedURLend = "/pubhtml?widget=true&amp;headers=false";
          }
          const embeddedURL = embedURL + embedID + embedURLend;
          return [embeddedURL, embedType];
    }
}

function constructFolderEmbedURL(URL, viewType){
    if (URL) {
              const folderID = URL.split("/")[URL.split("/").length-1];
              const folderURL = "https://drive.google.com/embeddedfolderview?id=" + folderID + "#"+viewType;
              return folderURL;
      }
}

folderURL = "https://drive.google.com/drive/u/2/folders/1zWF8T9a8hS9XxbAx7fyUIXpgNNhk_1aO"
url = "https://docs.google.com/presentation/d/1gAA2awM4Btq99kJwbIvQGzBOsBEmFQf1gi7GwEjxSwg/edit#slide=id.p1"
embed = constructEmbedURL("https://docs.google.com/presentation/d/e/2PACX-1vROUZdtMs9wsg3d7xazDkCMihLC5l6Cz0Vn9WIkoyoinly1fW_uUvJWehTibV-tdP583LIIslTGdNge/embed?start=false&amp;loop=false&amp;delayms=3000&amp;slide=id.p33#slide=id.p33");
console.log(embed[0]);
console.log(constructDownloadURL(url));
//console.log(constructFolderEmbedURL(folderURL, "grid"));
//<script src="https://hk.moodle.aau.dk/mod/hvp/library/js/h5p-resizer.js" charset="UTF-8"></script>

