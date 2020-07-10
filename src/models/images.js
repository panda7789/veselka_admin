var api_url = process.env.REACT_APP_API_URL;

export const processImages = async images => {
    try {
        const imageData = new FormData();
        images.forEach((img, index) => {
            imageData.append(`images[${index}]`, img);
        });
        var imagesData = await fetch(api_url + '/api/images', {
            method: 'POST',
            body: imageData,
        });
        if (imagesData.statusCode < 200 || imagesData.statusCode > 299) {
            throw Error("Response for /api/images is wrong.");
        }
        return imagesData.json();
    } catch (error) {
        console.log(error);
        throw Error("Image processing went wrong!");
    }
}

export const getImages = (offset=null, limit=null, callback) => {
    var params = "";
    params += offset > 0 ? "?offset=" + offset + "&": "?";
    params += limit > 0 ? "limit=" + limit : "";
    fetch(api_url + '/api/images' + params)
        .then(res => res.json())
        .then((data) => {
            callback(data);
        })
        .catch(console.log)
}