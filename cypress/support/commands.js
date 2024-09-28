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

Cypress.Commands.add('delete_task', (task) =>{
    cy.api({
        method : 'DELETE',
        url: Cypress.env('apiUrl') + '/helper/tasks',
        body: {name: task},

    }).then(response =>{
        expect(response.status).to.eq(204)
    })
});

Cypress.Commands.add('post_task', (task) =>{
    cy.api({
        method : 'POST',
        url: Cypress.env('apiUrl') + '/tasks',
        body: task
    }).then(response =>{
        expect(response.status).to.eq(201)
    });
})

Cypress.Commands.add('create_task', (task = '') => {
    cy.visit('/')

    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if(task !== ''){
        cy.get('@inputTask').type(task)
    }
       
        cy.contains("button", "Create").click();
        
    });

Cypress.Commands.add('isRequired', (targetMessage) =>{
    cy.get('@inputTask')
    .invoke('prop', 'validationMessage')
    .should((text) => {
        expect(
            targetMessage
        ).to.eq(text)
    })
})

Cypress.Commands.add('toogleMark', (task) =>{
    cy.visit('/')

            cy.contains('p', task)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()
})

Cypress.Commands.add('deleteMark', (task) =>{
    cy.visit('/')

            cy.contains('p', task)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()
})