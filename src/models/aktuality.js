import { processImages } from './images';
var api_url = process.env.REACT_APP_API_URL;


export const getAktuality = (callback) => {
    fetch(api_url + '/api/aktuality')
        .then(res => res.json())
        .then((data) => {
            callback(data);
        })
        .catch(console.log)
}

export const getOneAktuality = (id, callback) => {
    fetch(api_url + '/api/aktuality/' + id)
        .then(res => res.json())
        .then((data) => {
            callback(data);
        })
        .catch(console.log)
}

export const createAktuality = async (data, images, imagesFake, callback) => {
    try {
        if (images.length > 0){
            data.images = await processImages(images);
        }
        else if (imagesFake != '') {
            data.images = await processImages({ urls: imagesFake }, true);
        }
        var aktualityResult = await fetch(api_url + '/api/aktuality', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (aktualityResult.status !== 200){
            callback(false);
            throw Error("Response for /api/aktuality is wrong.");
        }
        callback(true);
    }
    catch (error) {
        console.log(error);
        callback(false);
    }
}

export const updateAktuality = async (id, data, images, callback) => {
    try {
        if (images.length > 0){
            // tady ještě oddělit ty nove a ty stare(ty neni nutno nahravat)
            var onlyNewImages = new Array();
            var oldImages = new Array();
            images.forEach((image, index) => {
                if (!image.id){
                    onlyNewImages.push(image);
                }
                else {
                    oldImages.push(image);
                }
            });
            console.log(images[0]);
            var onlyNewImagesIDs = await processImages(onlyNewImages);
            data.images = oldImages.map(x => x.id).concat(onlyNewImagesIDs);
        }
        var aktualityResult = await fetch(api_url + '/api/aktuality/' + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (aktualityResult.statusCode < 200 || aktualityResult.statusCode > 299){
            callback(false);
            throw Error("Response for /api/aktuality is wrong.");
        }
        callback(true);
    } catch (error) {
        console.log(error);
        callback(false);
    }
}

export const deleteAktuality = (id, callback) => {
    fetch(api_url + '/api/aktuality/' + id, {
        method: 'DELETE'
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            callback(true);
        }
        else {
            console.log('Somthing happened wrong');
            callback(false);
        }
    });
}
