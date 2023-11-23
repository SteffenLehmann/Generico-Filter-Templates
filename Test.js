
const input = 'https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=f167ebb4-841e-4ae9-9ada-55382c303e16'

const src="https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc={31b1fea2-0a51-4176-af98-f73960708d9b}&amp;action=embedview"

const embedURL = "https://aaudk.sharepoint.com/:w:/r/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc=%7B88F57892-67FC-4971-A6EB-CD422F68E16F%7D&file=googleDoc.docx&action=default&mobileredirect=true"

const goalURL="https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc={31b1fea2-0a51-4176-af98-f73960708d9b}&action=embedview"

const vsdxcopyLink = "https://aaudk.sharepoint.com/:u:/r/sites/Moodleintegrationtest/Shared%20Documents/Tegning.vsdx?d=w31b1fea20a514176af98f73960708d9b&csf=1&web=1&e=HvcvPB"

const vsdxdirectURL = "https://aaudk.sharepoint.com/:u:/r/sites/Moodleintegrationtest/_layouts/15/Doc.aspx?sourcedoc=%7B31B1FEA2-0A51-4176-AF98-F73960708D9B%7D&file=Tegning.vsdx&action=edit&mobileredirect=true&cid=ddac950f-1710-4285-be55-0c5e20ecfeb0&or=PrevEdit"

//returns an array of the URL
function parseURL(URL) {
    console.log(URL.split("/"));
    return URL.split("/");
}

// creates the name for the template
function createNameForSummary(inputName, type) {
    let name = inputName; // set the name of the button containing the padlet board
    if (typeof(name) != undefined) {
        if (type == 'pptx'){{name = "👩‍🏫 "+ name;}}
        else if (type == 'docx'){{name = "📄 "+ name;}}
        else if (type == 'xlsx'){{name = "📊 "+ name;}}
        else if (type == 'vsdx'){{name = "✏️ "+ name;}}
    } else {name = "Missing name"+ name;}
    console.log(name);
}

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

URLData = parseURL(embedURL);
const URLType = getType(URLData);
console.log(URLType);
createNameForSummary("nameForSummary", URLType);


console.log("dire "+URLtoEmbedURL(URLData, URLType));
console.log("goal "+goalURL);
