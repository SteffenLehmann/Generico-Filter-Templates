// Copy the link/URL from the Padlet board you want to Embed. 

// The body of template 
<details id="Details@@AUTOID@@" closed="">
    <summary class="detailsCollapsible">
        @@Name@@
    </summary>
        <div class="padlet-embed" style="border:1px solid rgba(0,0,0,0.1);border-radius:2px;box-sizing:border-box;overflow:hidden;position:relative;width:100%;background:#F4F4F4">
               <iframe id="@@AUTOID@@"  src="" frameborder="0" allow="camera;microphone;geolocation" style="width:100%;height:608px;display:block;padding:0;margin:0"></iframe>
         </div>
</details>
<script>
window.onload = function(){
}
</script>

// Custom JS
var url = '@@Padlet URL@@';

if(typeof(url) != 'undefined'){
      var embedurl =  url.split("/")[url.split("/").length-3];
      var id = url.split("/")[url.split("/").length-1];
      embedurl = "https://" + embedurl;
      embedurl += "/embed/" + id;

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
    
    .miro_wrapper {
    position: relative;
    padding-bottom: 70%; 
    }
    
    .iframeStylePadlet{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }