

const URL = 'https://test02.moodle.aau.dk/mod/hvp/view.php?id=3176';

//goal - https://test02.moodle.aau.dk/mod/hvp/embed.php?id=3176 

function URLtoEmbedURL(URL) {
      const embedURL = URL.replace('view.php', 'embed.php');
      return embedURL;
}

console.log(URLtoEmbedURL(URL));