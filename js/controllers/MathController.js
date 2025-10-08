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
        const backspaceHandler = (this.currentSubject === 'bulgarian') 
            ? () => this.handleBackspaceKey() 
            : null;
        
        // Create input filter based on subject
        let inputFilter = null;
        if (this.currentSubject === 'bulgarian') {
            // Bulgarian: block all character input, allow only navigation/control keys
            inputFilter = (e) => {
                // Allow: Backspace, Tab, Enter, Escape, Arrow keys, Delete
                const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];
                if (allowedKeys.includes(e.key)) {
                    return; // Allow these keys
                }
                // Block all other input
                e.preventDefault();
            };
        } else if (this.currentSubject === 'math') {
            // Math: allow only numeric input (0-9)
            inputFilter = (e) => {
                // Allow: Backspace, Tab, Enter, Escape, Arrow keys, Delete
                const allowedKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete'];
                if (allowedKeys.includes(e.key)) {
                    return; // Allow control keys
                }
                // Allow only digits 0-9
                if (e.key >= '0' && e.key <= '9') {
                    return; // Allow numeric input
                }
                // Block all other input (letters, symbols, etc.)
                e.preventDefault();
            };
        }
        
        this.view.bindInputEvents(
            () => this.handleEnterKey(),        // Submit/dismiss handler
            () => this.view.hideCursor(),       // Focus handler
            () => this.view.showCursor(),       // Blur handler
            backspaceHandler,                   // Backspace handler (Bulgarian only)
            inputFilter                         // Input filter
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
    
    // Handle Backspace key press - submit wrong answer for Bulgarian subject
    handleBackspaceKey() {
        // If a message is visible, dismiss it first
        if (this.view.isMessageVisible()) {
            this.view.hideMessage();
            this.view.clearAndFocusInput();
            // Generate next problem after dismissing
            this.generateNewProblem();
            return;
        }
        
        // For Bulgarian subject, Backspace means wrong answer
        // Set a special marker to indicate this was a Backspace submission
        this.checkAnswerAsWrong();
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
            // Bulgarian: only empty (Enter for correct) is valid
            // Wrong answers are submitted via Backspace, not by typing
            if (userInput !== '') {
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
    
    // Check answer as wrong (for Backspace submissions in Bulgarian)
    checkAnswerAsWrong() {
        // For Bulgarian subject, show incorrect answer message
        this.view.showMessage(this.model.localization.t('INCORRECT_ANSWER_BULGARIAN'), false);
    }
}