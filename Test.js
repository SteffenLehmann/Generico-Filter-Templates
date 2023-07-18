//Instrutions

// The body of template
<details id="Details@@AUTOID@@" closed="">
        <summary class="detailsCollapsible">
             @@Name Displayed on the Button@@
        </summary>
        <div class="present_wrapper">
            <iframe class="iframeStyle" id="@@AUTOID@@" frameborder="0"  style="overflow: hidden;" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
</details>
<script>
    window.onload = function(){}
</script>


// Custom JS
/* const presentationName = 'MentiEmbedTest';
const sharedURL = 'https://www.mentimeter.com/app/presentation/alssx23dpamkz1y7sq15tdokj3chob2w'
const votingLink = 'https://www.menti.com/aldy2bhofb12' */

const sharedURL = '@@Mentimeter shared video URL@@'


function idFromURL(url) { 
    const parts = url.split("/");
    return parts[parts.length - 1];
}

if (typeof (sharedURL) != 'undefined') {
    const id = idFromURL(sharedURL);
    const embedURL = "https://www.mentimeter.com/app/presentation/" + id + "/embed"
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        document.getElementById('@@AUTOID@@').src = ""+ embedURL;
    };
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