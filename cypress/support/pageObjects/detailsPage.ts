/* Page objects on Details Page */

export class DetailsPage {

    getDetailsPageContent() {
        return cy.get('.details')
    }

    getUncheckedFavoriteIcon() {
        return cy.get('img[alt="delete fav"]')
    }

    getCheckedFavoriteIcon() {
        return cy.get('img[alt="add to fav"]')
    }

    getProgramImage() {
        return cy.get('img[alt="show cover image"]')
    }

    getProgramName() {
        return cy.get('.ng-binding').eq(0)
    }

    getProgramAirDate() {
        return cy.get('.ng-binding').eq(1)
    }

    getProgramSummary() {
        return cy.get('.ng-binding').eq(2)
    }

    getBackButton() {
        return cy.get('.navBtn')
    }

    getStarOperationName() {
        return cy.get('i:visible')
    }

    verifyIfPageWasOpen() {
        this.getDetailsPageContent().should('be.visible')
    }

    verifyIfFavoriteIconIsDisplayed() {
        this.getUncheckedFavoriteIcon().should('be.visible')
    }

    verifyIfProgramImageIsDisplayed() {
        this.getProgramImage().should('be.visible')
    }

    verifyIfProgramNameIsCorrect(expectedName: string) {
        this.getProgramName().then(name => {
            const spaceIndex = name.text().trim().indexOf(' ') + 1
            expect(name.text().trim().substring(spaceIndex)).to.equal(expectedName)
        })
    }

    verifyIfProgramDateIsCorrect(airdate: string, airtime: string) {
        const expectedDisplayedTime = `${airtime} on ${airdate}`

        this.getProgramAirDate().then(date => {
            const spaceIndex = date.text().trim().indexOf(' ') + 1
            expect(date.text().trim().substring(spaceIndex)).to.equal(expectedDisplayedTime)
        })
    }

    verifyIfProgramSummaryIsCorrect(expectedSummary: string) {
        this.getProgramSummary().then(summary => {
            const spaceIndex = summary.text().trim().indexOf(' ') + 1
            expect(summary.text().trim().substring(spaceIndex)).to.equal(expectedSummary)
        })
    }

    clickOnBackButton() {
        this.getBackButton().click()
    }

    clickOnUncheckedFavoriteIcon() {
        this.getUncheckedFavoriteIcon().click({force: true})
    }

    clickOnCheckedFavoriteIcon() {
        this.getCheckedFavoriteIcon().dblclick({force: true})
    }

    verifyIfStarIsNotChecked() {
        const starOperation = 'Add to favorites'
        this.getUncheckedFavoriteIcon().parent().find('img[ng-click="addFav(x.id)"]').should('be.visible')
        this.getStarOperationName().should('have.text', starOperation)
    }

    verifyIfStarIsChecked() {
        const starOperation = 'Delete from favorites'
        this.getCheckedFavoriteIcon().parent().find('img[ng-click="deleteFav(x.id)"]').should('be.visible')
        this.getStarOperationName().should('have.text', starOperation)
    }
}

export const detailsPage = new DetailsPage;