// Give the section a title and copy in the distribution link of the survey you want to embed.

// The body of template
<details id="Details@@AUTOID@@" closed="">
    <summary class="detailsCollapsible">
        @@Name: the name displayed on the section@@
    </summary>
    <div class="SurveyXact">
        <iframe class="iframeStyle" id="@@AUTOID@@" src="" frameborder="0" scrolling="no" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
    </div>
    <a href="@@SurveyXact URL: the distribution link of the survey@@"> Link </a>
</details>
<script>
    window.onload = function(){}
</script>


// Custom JS
const url = '@@SurveyXact URL: the distribution link of the survey@@';
if(typeof(url) != 'undefined'){
    document.getElementById('Details'+@@AUTOID@@).onclick= function() {
        document.getElementById('@@AUTOID@@').src = ""+url;
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

.SurveyXact {
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
