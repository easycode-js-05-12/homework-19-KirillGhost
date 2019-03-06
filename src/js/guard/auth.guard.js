import { AuthService } from './../services/auth.service';
import { Routing } from './../core/routing.service';

export class AuthGuard {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing(); 
    }

    /**
     * @desc Verifies if user logged in or not
     * @returns {boolean} Result
     */
    canActivate() {
        if (!this._authService.token) {
            this._routing.navigate('/login');
            return false;
        }
        return true;
    }
}