// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

const baseURL = "100.103.0.120:3000"

Cypress.Commands.add('visitBaseURL', (extend) => {
    if(!extend){
        cy.visit(baseURL)
    }
    else{
        cy.visit(`${baseURL}${extend}`)
    }

  })

Cypress.Commands.add('login', (username, password) => {
    
    cy.visitBaseURL('/login')    
    cy.intercept('POST', '/api/login').as('login')

    cy.get('#username').type(username)
    cy.get('#password').type(password)
    
    cy.get('#loginBtn').click()
  })

Cypress.Commands.add('register', (userData) => {
    cy.visitBaseURL('/register')

    cy.intercept('POST', '/api/register').as('register')
    
    const {firstname,lastname, username, email, password} = userData
    
    cy.get('#firstname').type(firstname)
    cy.get('#lastname').type(lastname)
    cy.get('#username').type(username)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#confirmPassword').type(password)
    
    cy.get('#registerBtn').click()
    cy.wait('@register').then(interception=>{
        const body = interception.response.body
        const somenext = JSON.stringify(body)
        if(body.status === "Username taken."){
            cy.log('Go to login')
        }
        cy.log('Response Body Object:')
        cy.log(somenext)
    })    
})






//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
