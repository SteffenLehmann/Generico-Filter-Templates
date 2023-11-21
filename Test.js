

const goalURL = "https://aaudk-my.sharepoint.com/personal/mz57me_create_aau_dk/_layouts/15/Doc.aspx?sourcedoc={1fb4dc5d-a32a-406e-a082-2a9b230bc50f}&amp;action=embedview&amp;wdAr=1.7777777777777777&amp;wdEaaCheck=1"

const directURL = 'https://aaudk.sharepoint.com/:p:/r/sites/persondata-undervisning/_layouts/15/Doc.aspx?sourcedoc=%7B296BD959-A055-412F-8309-026F8C14E9EE%7D&file=Slides_GDPR_til_studerende-final.pptx&action=edit&mobileredirect=true';
const copyLinksite = "https://aaudk.sharepoint.com/:p:/r/sites/persondata-undervisning/Shared%20Documents/Slides_GDPR_til_studerende-final.pptx?d=w296bd959a055412f8309026f8c14e9ee&csf=1&web=1&e=rvWdgX"

const copyLink = "https://aaudk-my.sharepoint.com/:p:/r/personal/mz57me_create_aau_dk/Documents/Moodle%20share%20test/GoogleSlides.pptx?d=w1fb4dc5da32a406ea0822a9b230bc50f&csf=1&web=1&e=BW8LKq"

const copyLinksiteExcel = "https://aaudk.sharepoint.com/:x:/r/sites/Moodleintegrationtest/Shared%20Documents/Moodle%20Test%20data/Generico%20filter.xlsx?d=w57a1c87f4b004fd8a89a9dc877a99330&csf=1&web=1&e=1MZxef"

const directURLSiteExcel = "https://aaudk.sharepoint.com/:x:/r/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc=%7B57A1C87F-4B00-4FD8-A89A-9DC877A99330%7D&file=Generico%20filter.xlsx&action=default&mobileredirect=true"

const copyLinksiteDoc = "https://aaudk.sharepoint.com/:w:/r/sites/Moodleintegrationtest/Shared%20Documents/Moodle%20Test%20data/googleDoc.docx?d=w88f5789267fc4971a6ebcd422f68e16f&csf=1&web=1&e=Lc3XbM"

const directURLSiteDoc = "https://aaudk.sharepoint.com/:w:/r/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc=%7B88F57892-67FC-4971-A6EB-CD422F68E16F%7D&file=googleDoc.docx&action=default&mobileredirect=true"

const copyLinksitePPT = "https://aaudk.sharepoint.com/:p:/r/sites/persondata-undervisning/Shared%20Documents/Slides_GDPR_til_studerende-final.pptx?d=w296bd959a055412f8309026f8c14e9ee&csf=1&web=1&e=rvWdgX"

const directURLSitePPT = "https://aaudk.sharepoint.com/:p:/r/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc=%7B44A7AB73-F1D7-4180-AEE7-4AE19D859207%7D&file=GoogleSlides.pptx&action=edit&mobileredirect=true"
//returns an array of the URL
function parseURL(URL) {
    return URL.split("/");
    }
//returns the filetype of the URL given an array of the URL
function getType(URLData) {
    console.log(URLData);
    if (URLData[7] == "_layouts"){
        return URLData[URLData.length-1].split(".")[2].split("&")[0];
    } else if (URLData[7] == "Documents"||URLData[7] == "Shared%20Documents" ){
        return URLData[URLData.length-1].split(".")[1].split("?")[0];
    } else { return console.log("URL not supported: could not parse the URL to identify the filetype. Pleas consult the tutorial.")}
}

function URLtoEmbedURL(URLDate) {
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
        // 8 - 4 - 4 - 4 - 12
        id = id.substring(0,8)+"-"+id.substring(8,12)+"-"+id.substring(12,16)+"-"+id.substring(16,20)+"-"+id.substring(20,32);
        return URLDate[0]+"/"+URLDate[1]+"/"+URLDate[2]+"/"+URLDate[5]+"/"+URLDate[6]+"/"+"_layouts/15/Doc.aspx?sourcedoc="+"{"+id+"}"+"&action=embedview&wdAr=1.7777777777777777&wdEaaCheck=1";
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
        return URLDate[0]+"/"+URLDate[1]+"/"+URLDate[2]+"/"+URLDate[5]+"/"+URLDate[6]+"/"+URLDate[7]+"/"+URLDate[8]+"/"+sourceID[0]+"{"+id+"}"+"&action=embedview&wdAr=1.7777777777777777&wdEaaCheck=1;wdEaaCheck=1";
    }
}


// creates the name for the template
function createNameForSummary(inputName, type) {
    let name = inputName; // set the name of the button containing the padlet board
    if (typeof(name) != 'undefined') {
        if (type == 'pptx'){{name = "👩‍🏫 "+ name;}}
        else if (type == 'docx'){{name = "📄 "+ name;}}
        else if (type == 'xlsx'){{name = "📊 "+ name;}}
    } else {name = "Missing name"+ name;}
    return name;
}

//const testURL = URLtoEmbedURL(copyLink);
//console.log(goalURL);
const URLDAta = parseURL(directURLSiteExcel);

const URLType = getType(URLDAta);
const testname = "null";
console.log(createNameForSummary(testname, getType(URLDAta)));
console.log(URLtoEmbedURL(URLDAta));
