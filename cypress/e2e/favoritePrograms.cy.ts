/* Home page tests*/
import moment = require('moment')
import { detailsPage } from '../support/pageObjects/detailsPage';
import { homePage } from '../support/pageObjects/homePage';

describe('Home Page tests', () => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstActiveDate = new Date(currentYear, currentMonth, currentDay)
    const formattedDate = moment(firstActiveDate).format("YYYY-MM-DD");
    
    beforeEach('TEST', () => {        

        cy.intercept('GET', 'https://api.tvmaze.com/schedule', {fixture: 'schedule'})

        cy.fixture('schedule').then(fixture => {
            fixture.forEach(program => {
                program.airdate = formattedDate
                program.airstamp = `${formattedDate}${program.airstamp.substring(formattedDate.length)}`          
            })
            localStorage.setItem('showId', `[${fixture[0].id},${fixture[1].id},${fixture[2].id}]`)
            cy.intercept('GET', 'https://api.tvmaze.com/schedule', fixture)
            cy.intercept('GET', '**schedule').as('scheduleLoad')
            cy.visit('/')
            cy.wait('@scheduleLoad').its('response.statusCode').should('eq', 200)
            
        })
        
    })


    it('#1 | Verify if correct data is displaying on details page', () => {
        cy.fixture('schedule').then(fixture => {
            homePage.search(fixture[4].show.name)
            homePage.openFirstProgramDetails()
            detailsPage.verifyIfPageWasOpen()
            detailsPage.verifyIfFavoriteIconIsDisplayed()
            detailsPage.verifyIfProgramImageIsDisplayed()
            detailsPage.getProgramName()
            detailsPage.verifyIfProgramNameIsCorrect(fixture[4].show.name)
            detailsPage.verifyIfProgramDateIsCorrect(formattedDate, fixture[4].airtime)
            detailsPage.verifyIfProgramSummaryIsCorrect(fixture[4].show.summary)
            detailsPage.clickOnBackButton()
            homePage.verifyIfListIsDisplaying()
        })
    })

    it('#2 | Verify if Add to Favorites works correctly', () => {
        cy.fixture('schedule').then(fixture => {
            homePage.search(fixture[4].show.name)
            homePage.openFirstProgramDetails()
            detailsPage.verifyIfPageWasOpen()
            detailsPage.verifyIfStarIsNotChecked()
            detailsPage.clickOnUncheckedFavoriteIcon()
            detailsPage.verifyIfStarIsChecked()
            detailsPage.getStarOperationName()
            detailsPage.clickOnBackButton()
            homePage.verifyIfListIsDisplaying()
            homePage.verifyIfFavoriteTableContainProgram(fixture[4].show.name)
            homePage.clickOnProgramInFavoriteTable(fixture[4].show.name)
            detailsPage.verifyIfPageWasOpen()
            detailsPage.clickOnCheckedFavoriteIcon()
            detailsPage.clickOnBackButton()
            homePage.verifyIfListIsDisplaying()
            homePage.verifyIfFavoriteTableNotContainProgram(fixture[4].show.name)
        })
    })
    
    it.skip('#3 | Verify if sorting rows in Favorites table works correctly', () => {
        //TODO: Add tests for sorting asc/desc rows after fixing bug
    })

})