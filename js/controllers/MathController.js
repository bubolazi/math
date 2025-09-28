// Controller: Coordinates between Model and View
class MathController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        
        this.initializeApp();
    }
    
    initializeApp() {
        // Initialize the view with model data
        this.view.renderLevelList(this.model.getLocalizedLevels());
        
        // Bind event handlers
        this.bindEvents();
        
        // Show initial screen
        this.view.showScreen('level-select');
        this.view.updateGameStatus(this.model.getGameState());
    }
    
    bindEvents() {
        // Bind level selection
        this.view.bindLevelSelection((level, operation) => {
            this.startLevel(level, operation);
        });
        
        // Bind input events
        this.view.bindInputEvents(
            () => this.checkAnswer(),           // Submit handler
            () => this.view.hideCursor(),       // Focus handler
            () => this.view.showCursor()        // Blur handler
        );
    }
    
    // Start a new level
    startLevel(level, operation) {
        this.model.setLevel(level, operation);
        this.model.resetStats();
        this.view.showScreen('game-screen');
        this.generateNewProblem();
        this.view.updateGameStatus(this.model.getGameState());
    }
    
    // Generate and display a new problem
    generateNewProblem() {
        const problem = this.model.generateProblem();
        this.view.displayProblem(problem);
        this.view.clearAndFocusInput();
    }
    
    // Check the user's answer
    checkAnswer() {
        const userInput = this.view.getUserInput();
        
        if (!userInput || isNaN(parseInt(userInput))) {
            this.view.showMessage(this.model.localization.t('ERROR_INVALID_INPUT'), 2000);
            return;
        }
        
        if (this.model.checkAnswer(userInput)) {
            // Correct answer
            this.model.updateScore();
            this.view.showMessage(this.model.getRandomRewardMessage(), 1500);
            this.view.updateGameStatus(this.model.getGameState());
            
            // Auto-generate next problem after a short delay
            setTimeout(() => {
                this.generateNewProblem();
            }, 2000);
        } else {
            // Incorrect answer
            const correctAnswer = this.model.currentProblem.answer;
            this.view.showMessage(`${this.model.localization.t('INCORRECT_ANSWER')} ${correctAnswer}`, 2500);
            
            // Generate new problem after showing correct answer
            setTimeout(() => {
                this.generateNewProblem();
            }, 3000);
        }
    }
}