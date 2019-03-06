import { AuthService } from './../services/auth.service';
import { NewsService } from './../services/news.service';
import { container } from './../view/uiElements.config';

export class NewsComponent {
    constructor() {
        this._authService = new AuthService();
        this._newsService = new NewsService();

        this._newsContainer = container;
        this._news;
    }

    /**
     * @desc Gets last news
     */    
    async beforeRender() {
        if (this._authService.token) {
            this._news = await this._newsService.getNews(this._authService.token);
        }
        this.clearContainer();
    }

    /**
     * @desc Clears news container
     */
    clearContainer() {
        let firstChild = this._newsContainer.firstElementChild;
        while (firstChild) {
            this._newsContainer.removeChild(firstChild);
            firstChild = this._newsContainer.firstElementChild;
        }
    }

    /**
     * @desc Handles received news
     */
    handle() {
        document.body.insertAdjacentHTML("afterBegin", this.stylesAdd());
        this._news['news'].forEach((news) => this.addNews(news));
    }

    /**
     * @desc Adds news to feed
     * @param {Object} news - News object
     */
    addNews(news) {
        const template = this.render(news);
        this._newsContainer.insertAdjacentHTML("beforeend", template);
    } 

    /**
     * @desc Renders markup for news page
     * @param {Object} news - News object
     * @returns {string} Markup
     */    
    render(news) {
        return `
            <div class="news-item">
                <div class="item-info">
                    <div class="user-avatar">
                        <img src="${news.owner.avatar}">
                    </div>
                    <div class="user-info">
                        <div class="user-name">
                            <span>${news.owner.full_name}</span> 
                        </div>
                        <div class="user-country">
                            <span>${news.owner.country}</span>
                        </div>
                    </div>
                </div>
                <div class="item-content">
                    <div class="item-photo">
                        <img src="${news.pictures[0].url}">
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
     * @desc Renders styles for news page
     * @returns {string} Styles
     */    
    style() {
        return `
            .news-item {
                text-align: center;
                max-width: 1200px;
                margin: 50px;
                padding: 50px 0;
                padding-right: 25px;
                background-color: #F5F5F5;
            }
            .item-info {
                display: inline-block;
                width: 20%;
                vertical-align: top;
            }
            .user-avatar img {
                text-align: center;
                width: 138px;
                height: 138px;
                border-radius: 50%;
                overflow: hidden;
            }
            .user-info {
                padding: 10px 0;
                font-weight: 500;
            }
            .user-name {
                font-size: 18px;
            }
            .item-content {
                display: inline-block;
                width: 75%;
                max-height: 400px;
            }
            .item-photo {
                max-height: 400px;
                border: 1px solid;
            }
            .item-photo img {
                max-height: inherit;
                width: 100%;
            }
        `;
    }

    afterRender() {

    }
}