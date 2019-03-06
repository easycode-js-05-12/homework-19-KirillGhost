export class NotFoundComponent {
    async beforeRender() {
        
    }

    /**
     * @desc Renders markup for error page (not found)
     * @returns {string} Markup
     */      
    render() {
        return `
            <div>404</div>
        `;
    }

    afterRender() {
        
    }
}