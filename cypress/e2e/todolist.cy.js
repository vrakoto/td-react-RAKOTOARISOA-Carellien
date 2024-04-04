describe('App Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000') // Visite l'application avant chaque test
    })
    it('Devrait afficher toutes les tâches lorsque le filtre "Toutes" est sélectionné', () => {
        // Ajouter quelques tâches, dont certaines complétées
        cy.get('[data-cy=task-input]').type('Tâche 1');
        cy.get('[data-cy=add-task-btn]').click();
      
        cy.get('[data-cy=task-input]').type('Tâche 2');
        cy.get('[data-cy=add-task-btn]').click();
      
        cy.get('[data-cy=task-input]').type('Tâche 3');
        cy.get('[data-cy=add-task-btn]').click();
      
        cy.get('[data-cy=task-item]').eq(0).click();
        cy.get('[data-cy=task-item]').eq(2).click();
      
        const totalTasks = 3;
      
        // Filtrer pour afficher toutes les tâches
        cy.get('[data-cy=filter-btn-all]').click();
        cy.get('[data-cy=task-item]').should('have.length', totalTasks);
      });
  
    it('Devrait afficher le composant TaskForm', () => {
      cy.get('[data-cy=task-form]').should('exist')
    })
  
    it('Devrait afficher le composant TaskList', () => {
      cy.get('[data-cy=task-list]').should('exist')
    })
  
    it('Devrait pouvoir ajouter une nouvelle tâche', () => {
      cy.get('[data-cy=task-input]').type('Nouvelle tâche')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-item]').should('have.length', 1)
    })
  
    it('Devrait pouvoir marquer une tâche comme complétée', () => {
      cy.get('[data-cy=task-input]').type('Tâche à compléter')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-item]').first().click()
      cy.get('[data-cy=task-item]').first().should('have.class', 'completed')
    })
  
    it('Devrait pouvoir filtrer les tâches', () => {
      // Ajoutez quelques tâches
      cy.get('[data-cy=task-input]').type('Tâche 1')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-input]').type('Tâche 2')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-item]').first().click()
  
      // Filtrer les tâches complétées
      cy.get('[data-cy=filter-btn-done]').contains('Complétées').click()
      cy.get('[data-cy=task-item]').should('have.length', 1)
  
      // Filtrer les tâches non complétées
      cy.get('[data-cy=filter-btn-undone]').contains('Non complétées').click()
      cy.get('[data-cy=task-item]').should('have.length', 1)
    })
  })
  describe('TaskForm Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('Devrait permettre à l\'utilisateur de saisir une nouvelle tâche', () => {
      cy.get('[data-cy=task-input]').type('Nouvelle tâche')
      cy.get('[data-cy=task-input]').should('have.value', 'Nouvelle tâche')
    })
  
    it('Devrait réinitialiser le champ de saisie après l\'ajout d\'une nouvelle tâche', () => {
      cy.get('[data-cy=task-input]').type('Nouvelle tâche')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-input]').should('have.value', '')
    })
    it('Devrait stocker les tâches dans le localStorage après l\'ajout', () => {
        cy.get('[data-cy=task-input]').type('Tâche à stocker');
        cy.get('[data-cy=add-task-btn]').click();
      
        cy.window().its('localStorage.tasks')
          .should('contain', 'Tâche à stocker');
      });
      it('Devrait récupérer les tâches depuis le localStorage au chargement', () => {
        cy.window().then((win) => {
            win.localStorage.setItem('tasks', JSON.stringify([{ text: 'Tâche existante', completed: false }]));
        });
      
        cy.visit('http://localhost:3000');
        cy.get('[data-cy=task-item]').contains('Tâche existante');
      });
  })
  describe('TaskList Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('Devrait afficher une liste de tâches', () => {
      cy.get('[data-cy=task-input]').type('Tâche 1')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-input]').type('Tâche 2')
      cy.get('[data-cy=add-task-btn]').click()
      cy.get('[data-cy=task-item]').should('have.length', 2)
    })
  
  
  })