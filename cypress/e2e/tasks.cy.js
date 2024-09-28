require('cypress-plugin-api')

describe(' Tasks ', () => {
    
    let TestData;

    before(() => {
        cy.fixture('tasks'). then(t => {
            TestData = t
        }) 
    })

    context('Cadastros', () =>{

        it('Deve cadastrar nova tarefa', () => {
       
            var taskName = TestData.nTask;

            cy.delete_task(taskName)
    
            cy.create_task(taskName)
            cy.contains('main div p', taskName)
                .should('be.visible')
        });
        
        it('Não deve permitir tarefa duplicada', () => {
            const task = TestData.dup
            
            cy.delete_task(task.name)
            cy.post_task(task)
            cy.create_task(task.name)
            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        });
    
        it('Campo obrigatório', () => {
            cy.create_task()
    
            cy.isRequired('This is a required field')
        });

    })

    context('Atualização', () => {

        it('Deve concluir uma tarefa', () => {
            
            const task = TestData.atu
            

            cy.delete_task(task.name)
            cy.post_task(task)

            cy.toogleMark(task.name)

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
            });
    })

    context('Exclusão', () => {

        it('Deve concluir uma tarefa', () => {
            
            const task = TestData.del

            cy.delete_task(task.name)
            cy.post_task(task)

            cy.deleteMark(task.name)

            cy.contains('p', task.name)
                .should('not.exist')
            });
    })
});