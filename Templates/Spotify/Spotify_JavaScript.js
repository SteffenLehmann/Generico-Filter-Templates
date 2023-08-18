
const summaryName = '@@Name: The name of the button containing the google document@@'; // user input

const inputArrayFull = ["@@Episode1@@", "@@Episode1Name@@", "@@Episode2Optional@@", "@@Episode2NameOptional@@", "@@Episode3Optional@@", "@@Episode3NameOptional@@", "@@Episode4Optional@@", "@@Episode4NameOptional@@", "@@Episode5Optional@@", "@@Episode5NameOptional@@", "@@Episode6Optional@@", "@@Episode6NameOptional@@", "@@Episode7Optional@@", "@@Episode7NameOptional@@"];


const episodeContainer = document.getElementsByClassName("episodes"+@@AUTOID@@);

const [urlArray, nameArray] = splitArrayByEvenIndices(inputArrayFull);
const [urlArrayFiltered, nameArrayFiltered] = dropUndefinedIndices(urlArray, nameArray);
const idArray = constructId(urlArrayFiltered);
generateButtons(idArray, nameArrayFiltered);

// construct id from array
function constructId(urlArray) {
  const idArray = [];
  for (let i = 0; i < urlArray.length; i++) {
    idArray.push(constructEmbedURL(urlArray[i]));
  }
  return idArray;
}
function constructEmbedURL(URL){
  if (typeof(URL) != 'undefined') {
        URL = URL.split("/")[URL.split("/").length-1];
        URL = URL.split("?")[0];
        return URL;
  }
}

function splitArrayByEvenIndices(inputArray) {
  const evenIndexArray = [];
  const oddIndexArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    if (i % 2 === 0) {
      evenIndexArray.push(inputArray[i]);
    } else {
      oddIndexArray.push(inputArray[i]);
    }
  }
  return [evenIndexArray, oddIndexArray];
}

function dropUndefinedIndices(array1, array2) {
  const indicesWithUndefinedValues = compareArrays(array1, array2);

  // Create new arrays without the elements at the indices with undefined values
  const newArray1 = array1.filter((_, index) => !indicesWithUndefinedValues.includes(index));
  const newArray2 = array2.filter((_, index) => !indicesWithUndefinedValues.includes(index));

  return [newArray1, newArray2];
}

function compareArrays(array1, array2) {
  const indicesWithUndefinedValues = [];
  for (let i = 0; i < array1.length; i++) {
    if (typeof array1[i] === 'undefined' || typeof array2[i] === 'undefined') {
      indicesWithUndefinedValues.push(i);
    }
  }
  return indicesWithUndefinedValues;
}

// Function to generate buttons based on the array of IDs
function generateButtons(idArray, textArray) {
  for (let i = 0; i < idArray.length; i++) {
    const button = document.createElement("button");
    button.textContent = textArray[i];
    button.setAttribute("data-spotify-id", idArray[i]);
    episodeContainer.appendChild(button);
  }
}
