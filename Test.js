
const mp4 = 'https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=799b9d19-daf7-4706-bf86-762b79083d93&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'

const pdf="https://aaudk.sharepoint.com/sites/Moodleintegrationtest/_layouts/15/embed.aspx?UniqueId=fb26432c-b495-4f3d-b301-16523cc5d488"


function searchForStream(url){
    if (url.includes('Stream')){
        return true
    } else {
        return false
    }
}

console.log(searchForStream(pdf))