import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing.service';

export class PaymentGuard {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing(); 
    }

    /**
     * @desc Verifies if user subscribed or not
     * @returns {boolean} Result
     */
    canActivate() {
        if (!this._authService.isSubscribed) {
            this._routing.navigate('/');
            return false;
        }
        return true;
    }
}