var api_url = process.env.REACT_APP_API_URL;

export const getAkce = (callback) => {
    fetch(api_url + '/api/akce')
        .then(res => res.json())
        .then((data) => {
            callback(data);
        })
        .catch(console.log)
}

export const getOneAkce = (id, callback) => {
    fetch(api_url + '/api/akce/' + id)
        .then(res => res.json())
        .then((data) => {
            callback(data);
        })
        .catch(console.log)
}

export const createAkce = (data, callback) => {
    fetch(api_url + '/api/akce', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => {
            if (response.status >= 200 && response.status < 300) {
                callback(true);
            }
            else {
                console.log('Somthing happened wrong');
                callback(false);
            }
        });
}

export const updateAkce = (id, data, callback) => {
    fetch(api_url + '/api/akce/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => {
            if (response.status >= 200 && response.status < 300) {
                callback(true);
            }
            else {
                console.log('Somthing happened wrong');
                callback(false);
            }
        });
}

export const deleteAkce = (id, callback) => {
    fetch(api_url + '/api/akce/' + id, {
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
