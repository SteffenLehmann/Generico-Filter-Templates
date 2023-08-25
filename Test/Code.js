

// function to construct the download URL
function constructDownloadURL(URL){
    if(typeof(URL) != 'undefined') {
          let id = URL.split("/")[URL.split("/").length-1];
          id = id.split("?")[0];
          return "https://drive.google.com/embeddedfolderview?id="+id;
    }
}



function constructEmbedURL(url){
    const embedFolderurl =  "https://drive.google.com/embeddedfolderview?id=";
    const embedFolderurlEnd = "&amp;usp#list"
    let id = url.split("/")[url.split("/").length-1];
    const n = id.includes("?");
    
    if(n == true){
            id = id.split("?");
            id.pop();
    }
    return embedFolderurl + id + embedFolderurlEnd;
}
//console.log(constructDownloadURL("https://drive.google.com/drive/folders/1xvwJCWEp6KhPt9_PmuHa1pwKbOXl0e6s?usp=sharing"))
console.log(constructEmbedURL("https://drive.google.com/drive/folders/1xvwJCWEp6KhPt9_PmuHa1pwKbOXl0e6s?usp=sharing"))