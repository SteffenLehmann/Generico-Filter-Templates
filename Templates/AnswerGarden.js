// Copy the link/URL from the AnswerGarden word cloud you want to embed.

// The body of template
<details id="Details@@AUTOID@@" closed="">
    <summary class="detailsCollapsible">
        @@Name@@
    </summary>
    <div class="video_wrapper">
          <iframe  class="iframeStyle" id="@@AUTOID@@" style="border: none;" scrolling="no" frameborder="0" title="AnswerGarden" allowtransparency="true" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" src=""></iframe>
    </div>
</details>
<script>
window.onload = function(){
}
</script>

// Custom JS
var url = '@@AnswerGarden URL@@';
if(typeof(url) != 'undefined'){
      var embedurl =  "https://answergarden.ch/embed/";
      var id = url.split("/")[url.split("/").length-1];
      embedurl += id ;
      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
      document.getElementById('@@AUTOID@@').src = ""+embedurl;
};
}

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