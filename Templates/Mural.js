// Copy the Embed Link of the Mural board you want to embed

// The body of template
<details id="Details@@AUTOID@@" closed="">
    <summary class="detailsCollapsible">
        @@Name@@
    </summary>
    <div class="miro_wrapper">
          <iframe  class="iframeStyle" id="@@AUTOID@@" frameborder="0" scrolling="no" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" style='min-width: 640px; min-height: 480px; background-color: #f4f4f4; border: 1px solid #efefef'
        sandbox='allow-same-origin allow-scripts allow-modals allow-popups allow-popups-to-escape-sandbox' src=""></iframe>
    </div>
</details>
<script>
window.onload = function(){
}
</script>

// Custom JS
var url = '@@Mural Embed Link@@';
if(typeof(url) != 'undefined'){
      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
      document.getElementById('@@AUTOID@@').src = ""+url ;
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
    
    .iframeStyle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }