// Copy the link/URL of the Google folder you want to embed. Remember to make the folder public.

// The body of template
<details id="Details@@AUTOID@@" closed="">
        <summary class="detailsCollapsible">
                @@Name@@
        </summary>
         <div class="folder_wrapper">
               <iframe class="iframeStyle" id="@@AUTOID@@" frameborder="0" loading="lazy"></iframe>
         </div>
</details>
<script>
window.onload = function(){
}
</script>

// Custom JS 
var url = '@@Google Folder URL@@';
if(typeof(url) != 'undefined'){
      var embedurl =  "https://drive.google.com/embeddedfolderview?id=";
      var embedurlEnd = "&amp;usp#list"
      var id = url.split("/")[url.split("/").length-1];
      var n = id.includes("?");
      
       if(n == true){
             id = id.split("?");
             id.pop();
       }
      embedurl += id + embedurlEnd;
      document.getElementById('Details'+@@AUTOID@@).onclick= function() {
      document.getElementById('@@AUTOID@@').src = ""+embedurl;
};
}
// Custom CSS
    pointer: cursor; 
    padding: 5px; 
    width: 100%; 
    border: none; 
    text-align: left; 
    outline: none;}
    
    .detailsCollapsible:hover{
    background-color: #E8E8E8;
    }
    
    .folder_wrapper {
    position: relative;
    padding-bottom: 35%; 
    }
    
    .iframeStyle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    }