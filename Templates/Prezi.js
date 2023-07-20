// Description: 

// The body of template 
<details id="Details@@AUTOID@@" closed="">
        <summary class="detailsCollapsible">
                @@The name of the button containg the prezi presentation@@
        </summary>
        <div class="present_wrapper">
              <iframe class="iframeStyle" id="@@AUTOID@@" src="" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen" loading="lazy"></iframe>
        </div>
        <div class="Link-container">
                <a id="ShareLink@@AUTOID@@" href="" target="_blank" class="Link"> Link</a>
        </div>
</details>
<script>
      window.onload = function(){
       }
</script>

// Custom JS
const url = '@@Prezi URL: From your Prezi dashboard, find the presentation you would like to share, click the three dots in its thumbnail and select Sharing and privacy from the list. Then you can copy the link.@@';
if(typeof(url) != 'undefined'){
    const embedurl =  "https://prezi.com/p/embed/";
    const id = url.split("/")[url.split("/").length-2];
    embedurl += id + '/'
    console.log(embedurl);
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        document.getElementById('@@AUTOID@@').src = ""+embedurl;
        document.getElementById('ShareLink'+@@AUTOID@@).href = ""+url;
    };
}

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
    padding-bottom: 60 %;
    padding-top: 35px;
    height: 0;
    overflow: hidden;
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