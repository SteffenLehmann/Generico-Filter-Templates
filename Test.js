// Copy the link/URL from the Padlet board you want to Embed. 

// The body of template 
<details id="Details@@AUTOID@@" closed="">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <summary class="detailsCollapsible">
        @@Name: The name of the button containing the padlet board@@
    </summary>
        <div class="present_wrapper" >
               <iframe id="@@AUTOID@@"  src="" frameborder="0" allow="camera;microphone;geolocation" style="width:100%;height:900px;display:block;padding:0;margin:0"></iframe>
         </div>
         <div class="Link-container">
                <a id="ShareLink@@AUTOID@@" href="" target="_blank" class="Link"><i class="fas fa-external-link-alt"></i> Link</a>
                <a id="Download@@AUTOID@@" href="" target="_blank" class="Link"><i class="fas fa-download"></i> Download</a>
                <button id="fullscreen" class="Link"> <i class= "fas fa-expand-arrows-alt"></i> Full-screen</button>
        </div>
</details>
<script>
window.onload = function(){}
</script>

// Custom JS
const url = '@@Padlet shared URL: Remember to make it public for everyone@@';
let iframeElement;
const fullscreen = document.getElementById('fullscreen');
if(typeof(url) != 'undefined'){
    const id =  url.split("-")[url.split("-").length-1];
    const embedurl = "https://padlet.com/embed/" + id;
    const downloadURL = "https://padlet.com/_/exports/document_status?public_key=" + id;
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        document.getElementById('@@AUTOID@@').src = ""+embedurl;
        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
        document.getElementById('Download'+@@AUTOID@@).href = ""+downloadURL;
    };
    iframeElement = document.getElementById(@@AUTOID@@);
    
}
fullscreen.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (iframeElement.requestFullscreen) {
            iframeElement.requestFullscreen();
        } else if (iframeElement.mozRequestFullScreen) {
            iframeElement.mozRequestFullScreen();
        } else if (iframeElement.webkitRequestFullscreen) {
            iframeElement.webkitRequestFullscreen();
        } else if (iframeElement.msRequestFullscreen) {
            iframeElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Listen for the fullscreenchange event on the document object
document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement === iframeElement) {
        // If the iframe is in fullscreen, add the exit button to its content
        const iframeDocument = iframeElement.contentDocument;
        const exitButton = document.createElement("button");
        exitButton.className = "icon-button";
        exitButton.innerText = "Exit Fullscreen";
        exitButton.onclick = toggleFullscreen;
        iframeDocument.body.appendChild(exitButton);
    } else {
        // If the iframe exits fullscreen, remove the exit button from its content
        const iframeDocument = iframeElement.contentDocument;
        const exitButton = iframeDocument.querySelector(".icon-button");
        if (exitButton) {
            exitButton.remove();
        }
    }
});

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
    height: 0;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 2px;
    box-sizing: border-box;
    width: 100%;
}
    
.iframeStyle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.Link-container{
    padding: 10px;
    border-radius: 5px;
    display: flex;
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