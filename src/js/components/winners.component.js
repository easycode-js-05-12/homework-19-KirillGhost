import { AuthService } from './../services/auth.service';
import { WinnersService } from './../services/winners.service';
import { container } from './../view/uiElements.config';

export class WinnersComponent {
    constructor() {
        this._authService = new AuthService();
        this._winsService = new WinnersService();

        this._winsContainer = container;
        this._winners;
    }

    /**
     * @desc Gets winners
     */    
    async beforeRender() {
        this._winners = await this._winsService.getWinners();
        this.clearContainer();
    }

    /**
     * @desc Clears winners container
     */
    clearContainer() {
        let firstChild = this._winsContainer.firstElementChild;
        while (firstChild) {
            this._winsContainer.removeChild(firstChild);
            firstChild = this._winsContainer.firstElementChild;
        }
    }

    /**
     * @desc Handles received winners
     */
    handle() {
        document.body.insertAdjacentHTML("afterBegin", this.stylesAdd());
        this._winners['winners'].forEach((wins) => this.addWinners(wins));
    }

    /**
     * @desc Adds winners to page
     * @param {Object} wins - Winners object
     */
    addWinners(wins) {
        const template = this.render(wins);
        this._winsContainer.insertAdjacentHTML("beforeend", template);
    } 

    /**
     * @desc Renders markup for winners page
     * @param {Object} wins - Winners object
     * @returns {string} Markup
     */    
    render(wins) {
        return `
            <div class="winners-item">
                <div class="image-item">
                    <img src="${wins.member_id.images[0].image_basic.url}">
                    <div class="image-item-hover image-top-hover">
                        <span>
                            <i class="fa-icon fa-heart far"></i>
                        </span> 
                    </div>
                    <div class="image-item-hover image-bottom-hover">
                        <span>
                            <i class="fas fa-eye"></i>
                            ${wins.member_id.images[0].image_basic.views.length}
                        </span>
                        <span>
                            <i class="fas fa-thumbs-up"></i>
                            ${wins.member_id.images[0].image_basic.likes.length}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * @desc Adds markup for styles use
     * @returns {string} Markup
     */
    stylesAdd() {
        return `
            <!-- Component styles -->
            <style>
                ${this.style()}
            </style>
            <!-- Component html -->
        `;
    }

    /**
     * @desc Renders styles for winners page
     * @returns {string} Styles
     */    
    style() {
        return `
            app-container {
                max-width: 1200px;
                margin-right: auto;
                margin-left: auto;
                margin-top: 35px;
                text-align: center;
                display: block;                
            }
            .winners-item {
                display: inline-block;
                text-align: center;
                width: 295px;
                height: 400px;
            }
            .image-item {
                display: inline-block;
                width: 100%;
                height: 100%;
                padding: 2px 0;
                position: relative;
            }
            .image-item img {
                text-align: center;
                width: 100%;
                height: inherit;
            }  
            .image-item-hover {
                opacity: 0;
                position: absolute;
                color: white;
                transition: all .2s ease-in;
            }  
            .image-top-hover {
                top: 20px;
                right: 20px;
            }              
            .image-bottom-hover {
                bottom: 15px;
            }  
            .image-item:hover .image-item-hover {
                opacity: 1;
                cursor: pointer;
            } 
            .far {
                font-size: 30px;
            }
            .fas {
                padding-left: 20px;
            }
        `;
    }

    afterRender() {

    }
}