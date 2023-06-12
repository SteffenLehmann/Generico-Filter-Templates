// Copy the link/URL of the Prezi presentation you want to embed.

// The body of template 
<details id="Details@@AUTOID@@" closed="">
        <summary class="detailsCollapsible">
                @@Name@@
        </summary>
        <div class="video_wrapper">
              <iframe class="iframeStyle" id="@@AUTOID@@" src="" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen" loading="lazy"></iframe>
        </div>
</details>
<script>
      window.onload = function(){
       }
</script>

// Custom JS
var url = '@@Prezi URL@@';
if(typeof(url) != 'undefined'){
      var embedurl =  "https://prezi.com/p/";
      var embedurlEnd = "/embed/";
      var id = url.split("/")[url.split("/").length-2];
      embedurl += id + embedurlEnd ;
      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
      document.getElementById('@@AUTOID@@').src = ""+embedurl;
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
    
    .video_wrapper {
    position: relative;
    padding-bottom: 56.25%; 
    }
    
    .iframeStyle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }