function idFromURL(url) {
      const parts = url.split("/");
      return parts[parts.length - 1];
  }

console.log(idFromURL("https://www.menti.com/aldy2bhofb12"));