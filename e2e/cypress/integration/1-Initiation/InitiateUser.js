import '../../support/commands'
import userData from '../../fixtures/userData.json'


describe('Initiate User', ()=>{

    beforeEach( function(){
        cy.fixture('userData').then( (userData) => {
            this.userData = userData
        })
    })
    
    it("Register", function(){
        //cy.visitBaseURL()
        cy.register(this.userData)        
    })

    it('Login', function(){
        const {username, password} = this.userData
        cy.login(username, password)
    })

})