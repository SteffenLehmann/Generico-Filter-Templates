// Copy the share link of the docs, slides, or sheets you want the user to be able to either, view, comment, or edit.

// The body of template
<details closed="" onclick="document.getElementById('@@AUTOID@@').src = '@@Google Share Link@@'">
        <summary class="detailsCollapsible">
@@Name@@
</summary>
        <iframe id="@@AUTOID@@" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allow="autoplay; fullscreen" loading="lazy" height="500" width="100%"></iframe>
</details>

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
    };