// Instructions: Copy the link/URL of the Miro board you want to embed

// The body of template 3 

<details id="Details@@AUTOID@@" closed="">
    <summary class="detailsCollapsible">
        @@Name@@
    </summary>
    <div class="miro_wrapper">
          <iframe  class="iframeStyle" id="@@AUTOID@@" frameborder="0" scrolling="no" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" src=""></iframe>
    </div>
</details>
<script>
window.onload = function(){
}
</script>

// Custom JS (template 3)

var url = '@@Miro URL@@';
if(typeof(url) != 'undefined'){
      var embedurl =  "https://miro.com/app/live-embed/";
      var id = url.split("/")[url.split("/").length-2];
      embedurl += id + "/";
      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
      document.getElementById('@@AUTOID@@').src = ""+embedurl;
};
}

// Custom CSS (template 3) 
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