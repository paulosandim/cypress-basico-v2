Cypress.Commands.add('fillMandatoryFieldsAndSubmit', usuario => {
    cy.get('#firstName').type(usuario.nome)
    cy.get('#lastName').type(usuario.sobrenome)
    cy.get('#email').type(usuario.email)
    cy.get('#open-text-area').type(usuario.mensagem)
    cy.contains('button', 'Enviar').click()
})
