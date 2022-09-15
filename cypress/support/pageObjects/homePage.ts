/* Page objects on Home Page */

const { _ } = Cypress

export class HomePage {

    getPageHeader() {
        return cy.get('h1')
    }

    getTableHeader() {
        return cy.get('.rowHeader')
    }

    getList() {
        return cy.get('.showList')
    }

    getNameColumnTitleInFavoriteTable() {
        return this.getTableHeader().eq(0).find('div').eq(0)
    }

    getSummaryColumnTitleInFavoriteTable() {
        return this.getTableHeader().eq(0).find('div').eq(1)
    }

    getTimeColumnTitleInFavoriteTable() {
        return this.getTableHeader().eq(0).find('div').eq(2)
    }

    getNameColumnTitleInAllProgramsTable() {
        return this.getTableHeader().eq(1).find('div').eq(0)
    }

    getSummaryColumnTitleInAllProgramsTable() {
        return this.getTableHeader().eq(1).find('div').eq(1)
    }

    getTimeColumnTitleInAllProgramsTable() {
        return this.getTableHeader().eq(1).find('div').eq(2)
    }

    getSearchBar() {
        return cy.get('input[placeholder="search.."]')
    }

    getDisplayedRows() {
        return cy.get('.row:visible')   
    }

    getDisplayedRowsDropdown() {
        return cy.get('.showList').find('select:visible')
    }

    getClearSearchButton() {
        return cy.get('.clearSearch')
    }

    getSortAscArrow() {
        return cy.get('.glyphicon-chevron-down')
    }

    getSortDescArrow() {
        return cy.get('.glyphicon-chevron-up')
    }

    getFirstRowFromAllProgramsTable() {
        return this.getTableHeader().eq(1).next()
    }

    getFavoriteProgramNameFromTable() {
        return cy.get('img[alt="add to fav"]').parent(':visible')
    }

    verifyPageHeader() {
        const header = 'TV Schedule'
        this.getPageHeader().should('have.text', header)
    }

    verifyIfFavoriteNameColumnHasCorrectHeader() {
        const columnTitle = 'Name'
        this.getNameColumnTitleInFavoriteTable().then(header => expect(header.text().trim()).to.equal(columnTitle))
    }

    verifyIfFavoriteSummaryColumnHasCorrectHeader() {
        const columnTitle = 'Summary'
        this.getSummaryColumnTitleInFavoriteTable().then(header => expect(header.text().trim()).to.equal(columnTitle))
    }

    verifyIfFavoriteTimeColumnHasCorrectHeader() {
        const columnTitle = 'Time'
        this.getTimeColumnTitleInFavoriteTable().then(header => expect(header.text().trim()).to.equal(columnTitle))
    }

    verifyIfAllProgramsNameColumnHasCorrectHeader() {
        const columnTitle = 'Name'
        this.getNameColumnTitleInAllProgramsTable().then(header => expect(header.text().trim()).to.equal(columnTitle))
    }

    verifyIfAllProgramsSummaryColumnHasCorrectHeader() {
        const columnTitle = 'Summary'
        this.getSummaryColumnTitleInAllProgramsTable().then(header => expect(header.text().trim()).to.equal(columnTitle))
    }

    verifyIfAllProgramsTimeColumnHasCorrectHeader() {
        const columnTitle = 'Time'
        this.getTimeColumnTitleInAllProgramsTable().then(header => expect(header.text().trim()).to.equal(columnTitle))
    }

    search(searchingText: string) {
        this.getSearchBar().type(searchingText)
    }

    verifyIfDisplayedRowsIncludeText(searchingText: string) {
        this.getDisplayedRows().each(row => {
            expect(row.text().toLocaleLowerCase()).to.contain(searchingText)
        })
    }

    verifyQuantityOfDisplayedRows(expectedQuantity: number) {
        this.getDisplayedRows().its('length').should('eq', expectedQuantity)
    }

    selectDisplayedRows(rows: number) {
        this.getDisplayedRowsDropdown().select(rows.toString())
    }

    clickOnClearButton() {
        this.getClearSearchButton().click()
    }

    verifyIfSearchBarIsEmpty() {
        this.getSearchBar().invoke('val').should('be.empty')
    }

    clickTwiceOnNameHeader() {
        this.getNameColumnTitleInAllProgramsTable().dblclick()
    }

    clickOnceOnNameHeader() {
        this.getNameColumnTitleInAllProgramsTable().click()
    }

    clickTwiceOnSummaryHeader() {
        this.getSummaryColumnTitleInAllProgramsTable().dblclick()
    }

    clickOnceOnSummaryHeader() {
        this.getSummaryColumnTitleInAllProgramsTable().click()
    }

    clickTwiceOnTimeHeader() {
        this.getTimeColumnTitleInAllProgramsTable().dblclick()
    }

    clickOnceOnTimeHeader() {
        this.getTimeColumnTitleInAllProgramsTable().click()
    }

    verifyIfSortAscArrowIsDisplayed() {
        this.getSortAscArrow().should('be.visible')
    }

    verifyIfSortDescArrowIsDisplayed() {
        this.getSortDescArrow().should('be.visible')
    }

    verifyIfColumnIsSortedAscCorrectly(columnName: string) {
        const displayedRows = new Array()
        let columnIndex = 0

        switch(columnName.toLocaleLowerCase()) {
            case 'name':
                columnIndex = 0
                break
            case 'summary':
                columnIndex = 1
                break
            case 'time':
                columnIndex = 2
                break
            default: 
                break
        }

        this.getDisplayedRows().each(row => {
            cy.wrap(row).find('div').eq(columnIndex).then(displayedName => displayedRows.push(displayedName.text().trim()))
        }).then(() =>{
            const sortedRows = _.sortBy(displayedRows)
            expect(displayedRows).to.eql(sortedRows)
        })
    }

    verifyIfColumnIsSortedDescCorrectly(columnName: string) {
        const displayedRows = new Array()
        let columnIndex = 0

        switch(columnName.toLocaleLowerCase()) {
            case 'name':
                columnIndex = 0
                break
            case 'summary':
                columnIndex = 1
                break
            case 'time':
                columnIndex = 2
                break
            default: 
                break
        }

        this.getDisplayedRows().each(row => {
            cy.wrap(row).find('div').eq(columnIndex).then(displayedName => displayedRows.push(displayedName.text().trim()))
        }).then(() =>{
            const sortedRows = _.sortBy(displayedRows)
            expect(displayedRows).to.eql([...sortedRows].reverse())
        })
    }

    verifyDisplayedNameInAllProgramsTable(expectedName: string) {
        this.getDisplayedRows().find('div').eq(0).then(name => expect(name.text().trim()).to.equal(expectedName))
    }

    verifyDisplayedSummaryInAllProgramsTable(expectedSummary: string) {
        this.getDisplayedRows().find('div').eq(1).then(summary => expect(summary.text().trim()).to.equal(expectedSummary))
    }

    verifyDisplayedTimeInAllProgramsTable(expectedTime: string) {
        this.getDisplayedRows().find('div').eq(2).then(time => expect(time.text().trim()).to.equal(expectedTime))
    }

    verifyDisplayedNameInRowForAllProgramsTableIn(expectedName: string, rowIndex: number) {
        this.getDisplayedRows().eq(rowIndex).find('div').eq(0).then(name => expect(name.text().trim()).to.equal(expectedName.trim()))
    }

    verifyDisplayedSummaryInRowForAllProgramsTable(expectedSummary: string, rowIndex: number) {
        this.getDisplayedRows().eq(rowIndex).find('div').eq(1).then(summary => expect(summary.text().trim()).to.equal(expectedSummary.trim()))
    }

    verifyDisplayedTimeInRowForAllProgramsTable(expectedTime: string, rowIndex: number) {
        this.getDisplayedRows().eq(rowIndex).find('div').eq(2).then(time => expect(time.text().trim()).to.equal(expectedTime.trim()))
    }

    openFirstProgramDetails() {
        this.getFirstRowFromAllProgramsTable().click()
    }

    verifyIfListIsDisplaying() {
        this.getList().should('be.visible')
    }

    clickOnProgramInFavoriteTable(name:string) {
        this.getFavoriteProgramNameFromTable().contains(name).click()
    }

    verifyIfFavoriteTableContainProgram(name: string) {
        const allPrograms = new Array()
        this.getFavoriteProgramNameFromTable().each(program => {
            allPrograms.push(program.text().trim())
        }).then(() => { expect(allPrograms).to.include(name) })
    }

    verifyIfFavoriteTableNotContainProgram(name: string) {
        const allPrograms = new Array()
        this.getFavoriteProgramNameFromTable().each(program => {
            allPrograms.push(program.text().trim())
        }).then(() => { expect(allPrograms).not.to.include(name) })
    }

}

export const homePage = new HomePage;