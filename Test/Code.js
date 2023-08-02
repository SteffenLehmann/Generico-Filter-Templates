function getUniqueTag() {
  let isCodeExecuted = false;

  if (!isCodeExecuted) {
        const uniqueTag = crypto.randomUUID();
        isCodeExecuted = true;
        return uniqueTag;
  }
}

function addUniqueIdToElement(elementId) {
  // Generate a unique ID
  const uniqueId = getUniqueTag();
  console.log("uniqueTag " +uniqueId);

  // Get the HTML element by its ID
  const element = document.getElementById(elementId);
  console.log("element ID" +element.id);
  // Set the ID attribute of the element
  element.setAttribute('id', uniqueId+elementId);
  console.log("new element ID" +element.id);
}

function iterateThroughElements() {
  // Select all elements in the document
  const elements = document.querySelectorAll('*');

  // Iterate through each element
  elements.forEach((element) => {
    // Perform actions on each element
    addUniqueIdToElement(element.id);
  });
}
