export class Http {
    /**
     * @desc Loads data from the server
     * @param {string} url - API URL
     * @param {object} data - Data object
     * @param {object} options - Additional options
     * @returns {Promise} Promise object
     */
    post(url, data, options) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }

    /**
     * @desc Loads data from the server
     * @param {string} url - API URL
     * @param {string} token - Current user token
     * @param {object} options - Additional options
     * @returns {Promise} Promise object
     */ 
    get(url, token, options) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    'x-access-token': token
                }                
            })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));
        });
    }
}
