
const input = '<iframe src="https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=f167ebb4-841e-4ae9-9ada-55382c303e16" width="640" height="360" frameborder="0" scrolling="no" allowfullscreen title="PDFslides.pdf"></iframe>'


const goalURL = "https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=f167ebb4-841e-4ae9-9ada-55382c303e16"

const shareLink = 'https://aaudk.sharepoint.com/:b:/r/sites/Moodleintegrationtest/Shared%20Documents/Moodle%20Test%20data/PDFslides.pdf?csf=1&web=1&e=ngZypc'

const direct = "https://aaudk.sharepoint.com/sites/Moodleintegrationtest/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMoodleintegrationtest%2FShared%20Documents%2FMoodle%20Test%20data%2FPDFslides%2Epdf&viewid=ef1e7c66%2D7e5b%2D48da%2D9439%2D8e371b4732da&parent=%2Fsites%2FMoodleintegrationtest%2FShared%20Documents%2FMoodle%20Test%20data"

const print = "https://aaudk.sharepoint.com/sites/Moodleintegrationtest/Shared%20Documents/Moodle%20Test%20data/PDFslides.pdf"


function parseURL(URL) {
    const parseURL = URL.split('"')[1];
    if (parseURL !== undefined){return parseURL;} 
    else {console.log("No URL found")}
}



//const testURL = URLtoEmbedURL(copyLink);
//console.log(goalURL);


console.log(parseURL(input));
