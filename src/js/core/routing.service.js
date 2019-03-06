export class Routing {
    /**
     * @desc Changes route to current location
     * @param {string} route - Current route
     * @param {Object} data - Data object
     */    
    navigate(route, data = null) {
        location.appData = data;
        location.hash = route;
    }
}