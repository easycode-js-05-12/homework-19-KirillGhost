import { AuthService } from './../services/auth.service';

export class SignupComponent {
    constructor() {
        this._autService = new AuthService();
    }
    
    async beforeRender() {

    }

    /**
     * @desc Renders markup for user signup form
     * @returns {string} Markup
     */
    render() {
        return `
        <div class="auth-wrap d-flex">
            <div class="auth-form col col-6 mx-auto my-auto">
                <h3>Sign Up to Social.</h3>
                <p class="text-secondary">It's awesome here... Enter.</p>
                <form name="signUpForm" novalidate>
                    <div class="form-group">
                        <div class="row">
                            <div class="col col-6">
                                <input type="text" class="form-control form-control-sm" id="first_name" placeholder="First Name">
                            </div>
                            <div class="col col-6">
                                <input type="text" class="form-control form-control-sm" id="last_name" placeholder="Last Name">
                            </div>
                        </div>

                        <input type="text" class="form-control form-control-sm mt-3" id="nick_name" placeholder="Nick Name">

                        <div class="row mt-3">
                            <div class="col col-4">
                                <input type="text" class="form-control form-control-sm" id="day_of_birth" placeholder="Day">
                            </div>
                            <div class="col col-4">
                                <input type="text" class="form-control form-control-sm" id="month_of_birth" placeholder="Month">
                            </div>
                            <div class="col col-4">
                                <input type="text" class="form-control form-control-sm" id="year_of_birth" placeholder="Year">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col col-6">
                                <input type="text" class="form-control form-control-sm" id="country" placeholder="Country">
                            </div>
                            <div class="col col-6">
                                <input type="text" class="form-control form-control-sm" id="city" placeholder="City">
                            </div>
                        </div>

                        <select name="gender" id="gender" class="form-control form-control-sm mt-3">
                            <option value="male">Male</option>
                            <option value="male">Female</option>
                        </select>

                        <input type="email" class="form-control form-control-sm mt-3" id="email" placeholder="name@example.com" required data-pattern="^\S+@[a-z]+\.[a-z]+$">
                        <input type="text" class="form-control form-control-sm mt-3" id="phone" placeholder="Phone number">
                        <input type="password" class="form-control form-control-sm mt-3" id="password" placeholder="password" required data-pattern="\S+">
                        <div class="d-flex mt-5">
                            <button type="submit" class="btn btn-primary btn-sm">Sign Up</button>
                            <a href="login.html" class="btn btn-link btn-sm ml-auto">Already have an account? Sign in</a>
                        </div>
                    </div>
                </form>
            </div>
            <!-- /.auth-form -->
            <div class="auth-bg col col-6">

            </div>
            <!-- /.auth-bg -->
        </div>
        <!-- /.auth-wrap -->
        `;
    }

    /**
     * @desc Calls signup authorization on submit
     */    
    afterRender() {
        document.forms['signUpForm'].addEventListener('submit', (e) => {
            e.preventDefault();

            const userData = {};

            userData['first_name'] = e.target.elements['first_name'].value;
            userData['last_name'] = e.target.elements['last_name'].value;
            userData['nickname'] = e.target.elements['nick_name'].value;
            userData['date_of_birth_day'] = e.target.elements['day_of_birth'].value;
            userData['date_of_birth_month'] = e.target.elements['month_of_birth'].value;
            userData['date_of_birth_year'] = e.target.elements['year_of_birth'].value;
            userData['country'] = e.target.elements['country'].value;
            userData['city'] = e.target.elements['city'].value;
            userData['gender_orientation'] = e.target.elements['gender'].value;
            userData['email'] = e.target.elements['email'].value;
            userData['phone'] = e.target.elements['phone'].value;
            userData['password'] = e.target.elements['password'].value;
            
            this._userData = userData;

            if (!userData['email'] || !userData['password'] || !userData['nickname'] || !userData['first_name'] || !userData['last_name'] || !userData['gender_orientation']) return;
            
            this._autService.signup(userData)
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }
}