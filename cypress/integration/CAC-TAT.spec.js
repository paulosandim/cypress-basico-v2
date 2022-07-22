/// <reference types="Cypress" />

const faker = require('faker')

describe('Central de Atendimento ao Cliente TAT', () => {
    const usuario = {}

    beforeEach(() => {
        cy.visit('./src/index.html')

        usuario.nome = faker.name.firstName()
        usuario.sobrenome = faker.name.lastName()
        usuario.email = faker.internet.email()
        usuario.mensagem = faker.lorem.lines()
    })

    it('verifica o título da aplicação', () => {      
        cy.title()
        .should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'experimente digitar um texto longo na área de texto, passando como segundo argumento do comando'
        
        cy.get('#firstName').type('Paulo')
        cy.get('#lastName').type('Sandim')
        cy.get('#email').type('pauloedusandim@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success > strong').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#email').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error> strong').should('be.visible')
    })

    it('verifica se um valor não-numérico for digitado no campo telefone', () => {
        cy.get('#phone').type('abc').should('have.value', '')
    })
      
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error> strong').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Paulo')
            .should('have.value', 'Paulo')
            .clear().should('have.value', '')
        
        cy.get('#lastName').type('Sandim')
            .should('have.value', 'Sandim')
            .clear().should('have.value', '')
        
        cy.get('#email').type('pauloedusandim@gmail.com')
            .should('have.value', 'pauloedusandim@gmail.com')
            .clear().should('have.value', '')
        
        cy.get('#phone').type('67999012020')
            .should('have.value', '67999012020')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        
        cy.get('.error> strong').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit(usuario)

        cy.get('.success > strong').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]').check('feedback')
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        }) 
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check()
        .last().uncheck().should('not.be.checked')
    })

    it.only('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[id="file-upload"]').selectFile('cypress/fixtures/example.json')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[id="file-upload"]')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json', { encoding: null }).as('exampleFile')
        cy.get('input[id="file-upload"]').selectFile('@exampleFile')
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

})