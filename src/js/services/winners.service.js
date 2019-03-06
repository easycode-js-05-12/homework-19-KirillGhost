import { Http } from './../core/http.service';
import { ENV } from './../config/env';

export class WinnersService {
    /**
     * @desc Gets winners 
     * @returns {Promise} Winners object
     */    
    getWinners() {    
        const http = new Http();

        return new Promise((resolve, reject) => {
            http.get(`${ENV.apiUrl}/public/winners?part=1&limit=15`)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => reject(err));
        });
    }
}