//Instrutions

// The body of template
<details id="Details@@AUTOID@@" closed="">
        <summary class="detailsCollapsible">
             @@Name Displayed on the Button@@
        </summary>
        <div class="present_wrapper">
            <iframe class="iframeStyle" id="@@AUTOID@@" sandbox='allow-scripts allow-same-origin allow-presentation' allowfullscreen='true' allowtransparency='true' frameborder='0' height='315' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' width='420'></iframe>
        </div>
        <p id=results><a id="Results@@AUTOID@@" href=""> Results</a></p>
</details>
<script>
    window.onload = function(){
    }
</script>


// Custom JS
const presentationName = '@@Presentation Name: The name of the Mentimenter presentation@@';
const sharedURL = '@@Mentimeter shared video URL@@'
/* const presentationName = 'MentiEmbedTest';
const sharedURL = 'https://www.mentimeter.com/app/presentation/alssx23dpamkz1y7sq15tdokj3chob2w'
const votingLink = 'https://www.menti.com/aldy2bhofb12' */

function idFromURL(url) { 
    const parts = url.split("/");
    return parts[parts.length - 1];
}

function reNamePresentationName(name) {//The current url for results requires the name of the presentation with %20 instead of the first space
    if (name.indexOf(" ") >= 0) {
        const wordsOfName = name.split(" ");
        name = wordsOfName[0] + "%20" + wordsOfName.slice(1).join(" "); 
    }
    return name;
}

if (typeof (sharedURL, votingLink, presentationName) != 'undefined') {
    const id = idFromURL(sharedURL);
    //const votingURL = idFromURL(votingLink); //not used yet
    const embedURL = "https://www.mentimeter.com/app/presentation/" + id + "/embed"
    const NameName = reNamePresentationName(presentationName);
    const resultsPDF = 'https://static.mentimeter.com/screenshot/pdfs/'+ NameName +'.pdf'+ '?seriesId=' + id + '&screenshotTargetUrl=https%3A%2F%2Fwww.mentimeter.com%2Fpreview'
    
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
    document.getElementById('@@AUTOID@@').src = ""+ embedURL;
    results = document.getElementById('Results'+@@AUTOID@@).href = ""+ resultsPDF;
};

// Custom CSS
.detailsCollapsible{
    pointer: cursor; 
    padding: 5px; 
    width: 100%; 
    border: none; 
    text-align: left; 
    outline: none;}
    
    .detailsCollapsible:hover{
    background-color: #E8E8E8;
    }
    
    .present_wrapper {
    position: relative;
    padding-bottom: 60%; 
    }
    
    .iframeStyle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }