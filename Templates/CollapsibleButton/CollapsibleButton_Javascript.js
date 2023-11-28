const details = document.getElementById('Details'+@@AUTOID@@);
const detailsButton = document.getElementById('detailsButton'+@@AUTOID@@);

// check the background color of the page
let previouisBackgroundColor = getBackgroundColor();
setBackgrounColor(previouisBackgroundColor);

// event listener for the details element state change
details.addEventListener("toggle", (event) => {
  toggleDetails();
});

function toggleDetails() {
  if (details.open) {
    /* the element was toggled open */
    detailsButton.style.color = "#468ff4";
    detailsButton.style.backgroundColor = "#CCCCCC";
  } else {
    /* the element was toggled closed */
    detailsButton.style.backgroundColor = "";
    detailsButton.style.color = "";
  }
}

// function to get the background color of the page
function getBackgroundColor() {
  const bodyElement = document.body;
  const computedStyle = window.getComputedStyle(bodyElement);
  const backgroundColor = computedStyle.backgroundColor;

  return backgroundColor;
}

function setBackgrounColor(backGroundColor) {   
  if (backGroundColor == "rgb(255, 255, 255)") {
    if (detailsButton.classList.contains("detailsCollapsible")) {
      return;
    }
    // Light mode
    detailsButton.classList.add("detailsCollapsible");
    detailsButton.classList.remove("detailsCollapsibleDarkMode");
  } else if (backGroundColor == "rgb(25, 26, 30)") {
    if (detailsButton.classList.contains("detailsCollapsibleDarkMode")) {
      return;
    }
    // Dark mode
    detailsButton.classList.add("detailsCollapsibleDarkMode");
    detailsButton.classList.remove("detailsCollapsible");
  }
}

// custom event to check the background color of the page
function checkBackgroundColor() {
  const currentBackgroundColor = getBackgroundColor();
  if (currentBackgroundColor !== previouisBackgroundColor) {
    previouisBackgroundColor = currentBackgroundColor;
    // Trigger the custom event
    const event = new CustomEvent("backgroundColorChanged", {
      detail: currentBackgroundColor,
    });
    document.dispatchEvent(event);
  }
}
// listen interval for the background color event
setInterval(checkBackgroundColor, 500);

// event listener for the background color change
document.addEventListener("backgroundColorChanged", (event) => {
  const newBackgroundColor = event.detail;
  setBackgrounColor(newBackgroundColor);
});


const closeButton = document.getElementById('closeButtonCollapsible'+@@AUTOID@@)
closeButton.addEventListener("click", function(){ 
  details.removeAttribute("open");
});