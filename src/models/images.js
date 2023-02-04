var api_url = process.env.REACT_APP_API_URL;

export const processImages = async (images, fake=false) => {
    try {
        const imageData = new FormData();
        if (!fake) {
            images.forEach((img, index) => {
                imageData.append(`images[${index}]`, img);
            });
        }
        const url = !fake ? '/api/images' : '/api/images/fake';
        var imagesData = await fetch(api_url + url, {
            method: 'POST',
            body: !fake ? imageData : images,
            headers: !fake ? {} : {
                'Content-Type': 'application/json'
            }
        });
        if (imagesData.statusCode < 200 || imagesData.statusCode > 299) {
            throw Error("Response for /api/images is wrong.");
        }
        imagesData = await imagesData.json();
        if (!Array.isArray(imagesData)){
            imagesData = [imagesData];
        }
        return imagesData.map(x => x._id);
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

export const updateImage = async img => {
    try {
        var imagesData = await fetch(api_url + '/api/images/' + img.id, {
            method: 'PUT',
            body: JSON.stringify(img),
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

export const deleteImage = async img => {
    try {
        var imagesData = await fetch(api_url + '/api/images/' + img.id, {
            method: 'DELETE',
            body: JSON.stringify(img),
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