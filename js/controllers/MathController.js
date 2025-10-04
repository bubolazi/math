// Controller: Coordinates between Model and View
class MathController {
    constructor(localization, operationManager) {
        this.localization = localization;
        this.operationManager = operationManager;
        this.view = new MathView(localization);
        this.model = null; // Will be initialized after operation selection
        
        this.initializeOperationSelection();
    }
    
    initializeOperationSelection() {
        // Show operation selection screen
        this.view.showScreen('operation-select');
        
        // Render available operations
        this.view.renderOperationList(this.operationManager.getAvailableOperations(), this.localization);
        
        // Bind operation selection event
        this.view.bindOperationSelection((operation) => {
            this.selectOperation(operation);
        });
    }
    
    selectOperation(operationName) {
        // Get the operation extension
        const operationExtension = this.operationManager.getOperationExtension(operationName);
        if (!operationExtension) {
            console.error(`Operation ${operationName} not found`);
            return;
        }
        
        // Initialize the model with the selected operation
        this.model = new MathModel(this.localization, operationExtension);
        
        // Initialize level selection for this operation
        this.initializeLevelSelection();
    }
    
    initializeLevelSelection() {
        // Render level list for the selected operation
        this.view.renderLevelList(this.model.getLocalizedLevels());
        
        // Bind level selection event
        this.view.bindLevelSelection((level, operation) => {
            this.startLevel(level, operation);
        });
        
        // Show level selection screen
        this.view.showScreen('level-select');
        this.view.updateGameStatus(this.model.getGameState());
    }
    
    // Start a new level
    startLevel(level, operation) {
        if (!this.model) {
            console.error('Model not initialized. Select an operation first.');
            return;
        }
        
        this.model.setLevel(level, operation);
        this.model.resetStats();
        this.view.showScreen('game-screen');
        this.generateNewProblem();
        this.view.updateGameStatus(this.model.getGameState());
        
        // Bind input events when starting the game
        this.bindGameEvents();
    }
    
    bindGameEvents() {
        // Bind input events
        this.view.bindInputEvents(
            () => this.handleEnterKey(),        // Submit/dismiss handler
            () => this.view.hideCursor(),       // Focus handler
            () => this.view.showCursor()        // Blur handler
        );
    }
    
    // Handle Enter key press - dismiss message or check answer
    handleEnterKey() {
        // If a message is visible, dismiss it first
        if (this.view.isMessageVisible()) {
            this.view.hideMessage();
            this.view.clearAndFocusInput();
            // Generate next problem after dismissing
            this.generateNewProblem();
            return;
        }
        
        // Otherwise, check the answer
        this.checkAnswer();
    }
    
    // Generate and display a new problem
    generateNewProblem() {
        // Hide any visible message first
        this.view.hideMessage();
        
        const problem = this.model.generateProblem();
        this.view.displayProblem(problem);
        this.view.clearAndFocusInput();
    }
    
    // Check the user's answer
    checkAnswer() {
        const userInput = this.view.getUserInput();
        
        if (!userInput || isNaN(parseInt(userInput))) {
            this.view.showMessage(this.model.localization.t('ERROR_INVALID_INPUT'), false);
            return;
        }
        
        if (this.model.checkAnswer(userInput)) {
            // Correct answer
            this.model.updateScore();
            
            // Check if user earned a badge
            const badgeMessage = this.model.checkBadge();
            if (badgeMessage) {
                this.view.showMessage(badgeMessage, false);
            } else {
                this.view.showMessage(this.model.getRandomRewardMessage(), false);
            }
            
            this.view.updateGameStatus(this.model.getGameState());
        } else {
            // Incorrect answer
            const correctAnswer = this.model.currentProblem.answer;
            this.view.showMessage(`${this.model.localization.t('INCORRECT_ANSWER')} ${correctAnswer}`, false);
        }
    }
}