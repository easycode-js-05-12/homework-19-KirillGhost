export class ActiveRoute {
    /**
     * @desc Parses current URL
     * @returns {Object} Parsed URL
     */    
    parseRequestURL() {
        const url = location.hash.slice(1).toLowerCase() || '/';
        const routes = url.split('/');
        return {
            resourse: routes[1],
            id: routes[2],
            url
        }
    }
}