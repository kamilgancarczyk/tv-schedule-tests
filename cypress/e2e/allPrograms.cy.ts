/* Home page tests*/
import moment = require('moment')
import { homePage } from '../support/pageObjects/homePage';

describe('Home Page tests', () => {

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstActiveDate = new Date(currentYear, currentMonth, currentDay)
    const formattedDate = moment(firstActiveDate).format("YYYY-MM-DD");

    beforeEach(() => {

        cy.intercept('GET', 'https://api.tvmaze.com/schedule', {fixture: 'schedule'})

        cy.fixture('schedule').then(fixture => {
            fixture.forEach(program => {
                program.airdate = formattedDate
                program.airstamp = `${formattedDate}${program.airstamp.substring(formattedDate.length)}`
            })
            cy.intercept('GET', 'https://api.tvmaze.com/schedule', fixture)
            cy.intercept('GET', '**schedule').as('scheduleLoad')
            cy.visit('/')
            cy.wait('@scheduleLoad').its('response.statusCode').should('eq', 200)
        })
        
    })

    it('#1 | Verify if page header and column names in tables are correct', () => {
        homePage.verifyPageHeader()
        homePage.verifyIfFavoriteNameColumnHasCorrectHeader()
        homePage.verifyIfFavoriteSummaryColumnHasCorrectHeader()
        homePage.verifyIfFavoriteTimeColumnHasCorrectHeader()
        homePage.verifyIfAllProgramsNameColumnHasCorrectHeader()
        homePage.verifyIfAllProgramsSummaryColumnHasCorrectHeader()
        homePage.verifyIfAllProgramsTimeColumnHasCorrectHeader()
    })

    it('#2 | Verify if search bar and clear button are working properly', () => {
        homePage.search('the vi')
        homePage.selectDisplayedRows(12)
        homePage.verifyIfDisplayedRowsIncludeText('the vi')
        homePage.clickOnClearButton()
        homePage.verifyQuantityOfDisplayedRows(12)
        homePage.verifyIfSearchBarIsEmpty()
    })

    it('#3 | Verify if sorting is working correctly', () => {
        homePage.selectDisplayedRows(12)
        homePage.clickTwiceOnNameHeader()
        homePage.verifyIfSortAscArrowIsDisplayed()
        homePage.verifyIfColumnIsSortedAscCorrectly('name')
        homePage.clickOnceOnNameHeader()
        homePage.verifyIfSortDescArrowIsDisplayed()
        homePage.verifyIfColumnIsSortedDescCorrectly('name')

        homePage.clickOnceOnSummaryHeader()
        homePage.verifyIfSortAscArrowIsDisplayed()
        homePage.verifyIfColumnIsSortedAscCorrectly('summary')
        homePage.clickOnceOnSummaryHeader()
        homePage.verifyIfSortDescArrowIsDisplayed()
        homePage.verifyIfColumnIsSortedDescCorrectly('summary')

        homePage.clickOnceOnTimeHeader()
        homePage.verifyIfSortAscArrowIsDisplayed()
        homePage.verifyIfColumnIsSortedAscCorrectly('time')
        homePage.clickOnceOnTimeHeader()
        homePage.verifyIfSortDescArrowIsDisplayed()
        homePage.verifyIfColumnIsSortedDescCorrectly('time')
    })

    it('#4 | Verify if quantity of displaying rows is correct', () => {
        homePage.selectDisplayedRows(12)
        homePage.verifyQuantityOfDisplayedRows(12)
        homePage.selectDisplayedRows(25)
        homePage.verifyQuantityOfDisplayedRows(25)
        homePage.selectDisplayedRows(50)
        homePage.verifyQuantityOfDisplayedRows(50)
        homePage.selectDisplayedRows(100)
        homePage.verifyQuantityOfDisplayedRows(70)
    })

    it('#5 | Verify if displaying data is correct', () => {
        const quantityOfDisplayedRows = 25

        cy.fixture('schedule').then(fixture => {

            homePage.selectDisplayedRows(quantityOfDisplayedRows)

            fixture.forEach((program, index) => {

                if(index < quantityOfDisplayedRows) {
                    const expectedDisplayedTime = `${formattedDate} at ${program.airtime}`
                    homePage.verifyDisplayedNameInRowForAllProgramsTableIn(program.show.name, index)
                    homePage.verifyDisplayedSummaryInRowForAllProgramsTable(program.show.summary, index)
                    homePage.verifyDisplayedTimeInRowForAllProgramsTable(expectedDisplayedTime, index)
                }            
            })
        })
    })

})