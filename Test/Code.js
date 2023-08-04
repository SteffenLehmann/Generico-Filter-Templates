googleShare = 'https://drive.google.com/file/d/1guzU9Oi94Eulk5FU3ICbO0py0mFc5Kkt/view?usp=sharing'

GoogleEmbed = 'https://drive.google.com/file/d/1guzU9Oi94Eulk5FU3ICbO0py0mFc5Kkt/preview' 


function constructURLs(URL){
  if(typeof(URL) != 'undefined') {
        const ID = URL.split("/")[URL.split("/").length-2];

        const embedURL = 'https://drive.google.com/forms/d/e/' + ID + '/preview';
        return embedURL;
  }
} 

console.log(constructURLs(googleShare))

<video width="320" height="240" controls>
  <source src="https://drive.google.com/uc?export=preview&id=1guzU9Oi94Eulk5FU3ICbO0py0mFc5Kkt" type="video/mp4">
</video>
