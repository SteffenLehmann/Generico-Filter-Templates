// Copy in the link/URL of the video you want to embed. 

// The body of template
<details  id="Details@@AUTOID@@" closed="" >
     <summary class="detailsCollapsible">
         @@Name@@
     </summary>
     <div class="video_wrapper">
         <iframe class="iframeStyle" id="@@AUTOID@@" src="" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     </div>
</details>
<script>
   window.onload = function(){}
</script>

// Custom JS
var YTurl = '@@YouTube URL@@';
if(typeof(YTurl) != 'undefined'){
      var YTembedurl =  "//www.youtube.com/embed/";
      var YTid = YTurl.split("=")[YTurl.split("=").length-1];
      YTembedurl += YTid + "/";

      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
             document.getElementById('@@AUTOID@@').src = ""+YTembedurl  ;
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