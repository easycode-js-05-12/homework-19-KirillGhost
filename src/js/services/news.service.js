import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class NewsService {
    /**
     * @desc Gets last news 
     * @param {string} token - Current user token
     * @returns {Promise} News object
     */    
    getNews(token) {    
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/news`, token)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}