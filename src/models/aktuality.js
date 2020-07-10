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

export const createAktuality = async (data, images, callback) => {
    try {
        if (images.length > 0){
            data.images = await processImages(images);
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
            data.images = await processImages(images);
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
