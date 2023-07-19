//Instrutions

// The body of template
<details id="Details@@AUTOID@@" closed="">
        <summary class="detailsCollapsible">
             @@Name: Displayed on the Button@@
        </summary>
        <div class="present_wrapper">
            <iframe class="iframeStyle" id="@@AUTOID@@" sandbox='allow-scripts allow-same-origin allow-presentation' allowfullscreen='true' allowtransparency='true' frameborder='0' height='315' style='position: absolute; top: 0; left: 0; width: 100%; height: 100%;' width='420'></iframe>
        </div>
        <div class="Link-container">
                <a id="Results@@AUTOID@@" href="" class="Link"> Results</a>
                <a id="ShareLinkk@@AUTOID@@" href="" class="Link"> Slides</a>
        </div>
</details>
<script>
    window.onload = function(){}
</script>


// Custom JS
/* const presentationName = 'MentiEmbedTest';
const sharedURL = 'https://www.mentimeter.com/app/presentation/alssx23dpamkz1y7sq15tdokj3chob2w'
const votingLink = 'https://www.menti.com/aldy2bhofb12' */
const presentationName = '@@Presentation Name: The file name of the Mentimenter presentation@@';
const sharedURL = '@@Mentimeter shared video URL: Remember to change the settings to share with everyone@@';


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

if (typeof (sharedURL, presentationName) != 'undefined') {
    const id = idFromURL(sharedURL);
    const embedURL = "https://www.mentimeter.com/app/presentation/" + id + "/embed";
    const NameName = reNamePresentationName(presentationName);
    const resultsPDF = 'https://static.mentimeter.com/screenshot/pdfs/' + NameName + '.pdf' + '?seriesId=' + id + '&screenshotTargetUrl=https%3A%2F%2Fwww.mentimeter.com%2Fpreview';
    document.getElementById('Details' + @@AUTOID @@).onclick = function () {
        document.getElementById('@@AUTOID@@').src = "" + embedURL;
        document.getElementById('Results' + @@AUTOID @@).href = "" + resultsPDF;
        document.getElementById('ShareLinkk' + @@AUTOID @@).href = "" + sharedURL;
    };
};

// Custom CSS
.detailsCollapsible{
    pointer: cursor;
    padding: 5px;
    width: 100 %;
    border: none;
    text-align: left;
    outline: none;
}
    
.detailsCollapsible:hover{
    background-color: #E8E8E8;
}
    
.present_wrapper {
    position: relative;
    padding-bottom: 60 %;
    padding-top: 35px;
    height: 0;
    overflow: hidden;
}
    
.iframeStyle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100 %;
    height: 100 %;
}

.Link-container{
    padding: 10px;
    border-radius: 5px;
    display: flex;
}

.Link{
    display: block;
    text-decoration: none;
    padding: 5px 10px;
    border: 1px solid #CCCCCC;
    background-color: #CCCCCC; 
    border-radius: 5px; /* Rounded borders */
    margin-bottom: 5px;
    margin: 0 5px;
    color: #131314;
    font-size: 16px;
}

.Link:hover{
    background-color: #666666;
    border: 1px solid #666666;
    color: #468ff4;
}
