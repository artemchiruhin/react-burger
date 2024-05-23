describe('create order', () => {
    const dragAndDropIngredient = (type: string) => {
        const dataTransfer = new DataTransfer();
        cy.get(`[data-test-id="ingredient-card-${type}"]`).first().trigger('dragstart', { dataTransfer });
        cy.get('[data-test-id="constructor"]').first().trigger('drop');
    }

    beforeEach(() => {
        cy.visit('/');

        window.localStorage.setItem('refreshToken', JSON.stringify('test-refresh-token'));
        window.localStorage.setItem('accessToken', JSON.stringify('test-access-token'));
    });

    afterEach(() => {
        cy.clearLocalStorage();
    });

    it('should open modal', () => {
        cy.get('[data-test-id="ingredient-card-bun"]').first().click();
        cy.get('[data-test-id="ingredient-modal-title"]').should('have.text', 'Детали ингредиента');
    });

    it('should drag and drop ingredient', () => {
        dragAndDropIngredient('bun');
        dragAndDropIngredient('sauce');
    });

    it('should create order', () => {
        dragAndDropIngredient('bun');
        dragAndDropIngredient('sauce');
        cy.get('[data-test-id="button-create-order"]').first().click();
        cy.get('#modals').first().children().should('have.length', 1);
    });
})