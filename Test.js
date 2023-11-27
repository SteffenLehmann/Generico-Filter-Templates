
const mp4 = 'https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=799b9d19-daf7-4706-bf86-762b79083d93&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'

const pdf="https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=fb26432c-b495-4f3d-b301-16523cc5d488"


<iframe src="https://aaudk.sharepoint.com/sites/Moodleintegrationtest/Shared%20Documents/Forms/AllItems.aspx?id=%2Fsites%2FMoodleintegrationtest%2FShared%20Documents%2FMoodle%20Test%20data&viewid=ef1e7c66%2D7e5b%2D48da%2D9439%2D8e371b4732da" width="640" height="360" frameborder="0" allowfullscreen></iframe>


function searchForStream(url){
    if (url.includes('Stream')){
        return true
    } else {
        return false
    }
}

console.log(searchForStream(pdf))