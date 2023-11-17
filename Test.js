
const directURL = 'https://aaudk.sharepoint.com/:p:/r/sites/persondata-undervisning/_layouts/15/Doc.aspx?sourcedoc=%7B296BD959-A055-412F-8309-026F8C14E9EE%7D&file=Slides_GDPR_til_studerende-final.pptx&action=edit&mobileredirect=true';
const copyLinksite = "https://aaudk.sharepoint.com/:p:/r/sites/persondata-undervisning/Shared%20Documents/Slides_GDPR_til_studerende-final.pptx?d=w296bd959a055412f8309026f8c14e9ee&csf=1&web=1&e=rvWdgX"

const copyLink = "https://aaudk-my.sharepoint.com/:p:/r/personal/mz57me_create_aau_dk/Documents/Moodle%20share%20test/GoogleSlides.pptx?d=w1fb4dc5da32a406ea0822a9b230bc50f&csf=1&web=1&e=ecqgdA"



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
        return URLDate[0]+"/"+URLDate[1]+"/"+URLDate[2]+"/"+URLDate[5]+"/"+URLDate[6]+"/"+"_layouts/15/Doc.aspx?sourcedoc="+"{"+id+"}"+"&amp;action=embedview&amp;wdAr=1.7777777777777777";
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
        return URLDate[0]+"/"+URLDate[1]+"/"+URLDate[2]+"/"+URLDate[5]+"/"+URLDate[6]+"/"+URLDate[7]+"/"+URLDate[8]+"/"+sourceID[0]+"{"+id+"}"+"&amp;action=embedview&amp;wdAr=1.7777777777777777";
    }
}

const goalURL = "https://aaudk.sharepoint.com/sites/persondata-undervisning/_layouts/15/Doc.aspx?sourcedoc={296bd959-a055-412f-8309-026f8c14e9ee}&amp;action=embedview&amp;wdAr=1.7777777777777777"

const testURL = URLtoEmbedURL(copyLinksite);
console.log(goalURL);
console.log(testURL);