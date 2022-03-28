import '../../support/commands'
import userData from '../../fixtures/userData.json'


describe('Write a Post', ()=>{

    before(function(){
        cy.fixture('userData').then( (userData) => {
            this.userData = userData
        })
    })

    it('Writes a Post', function(){
        
    })




})