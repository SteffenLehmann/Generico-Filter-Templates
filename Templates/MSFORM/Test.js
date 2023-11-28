
const src="https://forms.office.com/Pages/ResponsePage.aspx?id=Sbrb9QbOb0msPgzxQ2HZNOYO5H49vgtAs0SUl9Yg7E9UQjhMVklDM1E5NFpPMDZFTzJVUktWSUZMOS4u&embed=true"


const copyLink = "https://forms.office.com/Pages/ResponsePage.aspx?id=Sbrb9QbOb0msPgzxQ2HZNOYO5H49vgtAs0SUl9Yg7E9UQjhMVklDM1E5NFpPMDZFTzJVUktWSUZMOS4u"


const direct = "https://forms.office.com/Pages/DesignPageV2.aspx?prevorigin=shell&origin=NeoPortalPage&subpage=design&id=Sbrb9QbOb0msPgzxQ2HZNOYO5H49vgtAs0SUl9Yg7E9UQjhMVklDM1E5NFpPMDZFTzJVUktWSUZMOS4u"

const directembed = "https://forms.office.com/Pages/ResponsePage.aspx?amp;id=Sbrb9QbOb0msPgzxQ2HZNOYO5H49vgtAs0SUl9Yg7E9UQjhMVklDM1E5NFpPMDZFTzJVUktWSUZMOS4u&embed=true"

function URLtoEmbedURL(URL) {
    const URLData = URL.split('=');
    if (URLData.length < 3){return URLData[0]+"="+URLData[1]+"&embed=true";}
    else if (URLData.length > 2){
        console.log(URLData);
        let directURLtoEmbed = URLData[0].split('?')[0].replace('DesignPageV2.aspx','ResponsePage.aspx') +"?"+URLData[3].split('&')[1]+"="+URLData[4]+"&embed=true";
        return directURLtoEmbed = directURLtoEmbed.replace('amp;','');
    }
    else {console.log("No URL found")}
}



//const testURL = URLtoEmbedURL(copyLink);
//console.log(goalURL);


console.log("copyLink "+ URLtoEmbedURL(copyLink));
console.log("direct "+ URLtoEmbedURL(direct));
console.log("SRC    "+ src);