// Controller: Coordinates between Model and View
class MathController {
    constructor(localization, subjectManager) {
        this.localization = localization;
        this.subjectManager = subjectManager;
        this.activityManager = null; // Will be set after subject selection
        this.view = new MathView(localization);
        this.model = null; // Will be initialized after operation/activity selection
        this.currentSubject = null; // Track current subject
        
        this.initializeSubjectSelection();
    }
    
    initializeSubjectSelection() {
        // Show subject selection screen
        this.view.showScreen('subject-select');
        
        // Render available subjects
        this.view.renderSubjectList(this.subjectManager.getAvailableSubjects(), this.localization);
        
        // Bind subject selection event
        this.view.bindSubjectSelection((subject) => {
            this.selectSubject(subject);
        });
    }
    
    selectSubject(subjectName) {
        this.currentSubject = subjectName;
        
        // Get the activity manager for this subject
        this.activityManager = this.subjectManager.getActivityManager(subjectName);
        if (!this.activityManager) {
            console.error(`Subject ${subjectName} not found`);
            return;
        }
        
        // Show operation/activity selection
        this.initializeOperationSelection();
    }
    
    initializeOperationSelection() {
        // Show operation selection screen
        this.view.showScreen('operation-select');
        
        // Render available operations/activities
        this.view.renderOperationList(this.activityManager.getAvailableOperations(), this.localization);
        
        // Bind operation selection event
        this.view.bindOperationSelection((operation) => {
            this.selectOperation(operation);
        });
    }
    
    selectOperation(operationName) {
        // Get the operation extension
        const operationExtension = this.activityManager.getOperationExtension(operationName);
        if (!operationExtension) {
            console.error(`Operation ${operationName} not found`);
            return;
        }
        
        // Initialize the model with the selected operation
        // Choose the correct model class based on subject
        if (this.currentSubject === 'math') {
            this.model = new MathModel(this.localization, operationExtension);
        } else if (this.currentSubject === 'bulgarian') {
            this.model = new BulgarianLanguageModel(this.localization, operationExtension);
        }
        
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
        
        // Update game instructions based on subject
        if (this.currentSubject === 'bulgarian') {
            this.view.updateGameInstructions('GAME_INSTRUCTIONS');
        } else {
            this.view.updateGameInstructions('GAME_INSTRUCTIONS_MATH');
        }
        
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
        
        // Bind click on game screen to keep input focused
        this.view.bindGameScreenClick();
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
        
        // For Bulgarian Language, allow empty input (parent just presses Enter)
        // For Math, require a number
        if (this.currentSubject === 'bulgarian') {
            // Bulgarian: empty (Enter) or '0' are valid inputs
            if (userInput !== '' && userInput !== '0') {
                this.view.showMessage(this.model.localization.t('ERROR_INVALID_INPUT'), false);
                return;
            }
        } else {
            // Math: require a number
            if (!userInput || isNaN(parseInt(userInput))) {
                this.view.showMessage(this.model.localization.t('ERROR_INVALID_INPUT'), false);
                return;
            }
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
            if (this.currentSubject === 'bulgarian') {
                // For Bulgarian, there's no "correct answer" to show
                this.view.showMessage(this.model.localization.t('INCORRECT_ANSWER_BULGARIAN'), false);
            } else {
                const correctAnswer = this.model.currentProblem.answer;
                this.view.showMessage(`${this.model.localization.t('INCORRECT_ANSWER')} ${correctAnswer}`, false);
            }
        }
    }
}