// Collapsible Buttons on Moodle used to hide content. Everything you place between the two {GENERICO} tags will be hidden.

// The body of template
<details closed="">
<summary class="detailsCollapsible">@@Name@@</summary>

// End tags
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
}