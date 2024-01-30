dURL = 'https://aaudk-my.sharepoint.com/:w:/r/personal/mz57me_create_aau_dk/_layouts/15/Doc.aspx?sourcedoc=%7BEB9D946E-38C5-49B0-B323-C9B66BCA308E%7D&file=googleDoc.docx&action=default&mobileredirect=true'

const URLData = parseURL(dURL);
const URLType = getType(URLData);

function parseURL(URL) {
    return URL.split("/");
}

console.log(('URLData ' + URLData));
console.log(('URLData[5] ' + URLData[5]));
console.log(('URLType ' + URLType));
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