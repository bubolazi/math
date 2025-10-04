// View: UI rendering and DOM manipulation
class MathView {
    constructor(localization) {
        this.localization = localization;
        this.elements = {
            operationSelect: document.getElementById('operation-select'),
            levelSelect: document.getElementById('level-select'),
            gameScreen: document.getElementById('game-screen'),
            currentLevel: document.getElementById('current-level'),
            currentOperation: document.getElementById('current-operation'),
            problemDisplay: document.getElementById('problem-display'),
            terminalInput: document.getElementById('terminal-input'),
            scoreDisplay: document.getElementById('score-display'),
            problemsDisplay: document.getElementById('problems-display'),
            terminalMessage: document.getElementById('terminal-message'),
            operationList: document.querySelector('.operation-list'),
            levelList: document.querySelector('.level-list')
        };
        
        // Initialize static UI text
        this.initializeStaticText();
    }
    
    // Initialize static text elements with Bulgarian translations
    initializeStaticText() {
        // Update page title
        document.title = this.localization.t('MATH_TERMINAL');
        
        // Update header
        const header = document.querySelector('header h1');
        if (header) header.textContent = this.localization.t('MATH_TERMINAL');
        
        // Update operation selection screen
        const operationSelectTitle = document.querySelector('#operation-select h2');
        if (operationSelectTitle) operationSelectTitle.textContent = this.localization.t('SELECT_OPERATION');
        
        // Update level selection screen
        const levelSelectTitle = document.querySelector('#level-select h2');
        if (levelSelectTitle) levelSelectTitle.textContent = this.localization.t('SELECT_DIFFICULTY_LEVEL');
        
        // Update instructions
        const operationInstructions = document.querySelector('#operation-select .instructions');
        if (operationInstructions) operationInstructions.textContent = this.localization.t('OPERATION_INSTRUCTIONS');
        
        const levelInstructions = document.querySelector('#level-select .instructions');
        if (levelInstructions) levelInstructions.textContent = this.localization.t('LEVEL_INSTRUCTIONS');
        
        const gameInstructions = document.querySelector('#game-screen .instructions');
        if (gameInstructions) gameInstructions.textContent = this.localization.t('GAME_INSTRUCTIONS');
        
        // Update HTML lang attribute
        document.documentElement.lang = this.localization.getCurrentLanguage();
    }
    
    // Show a specific screen
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        document.getElementById(screenId).classList.add('active');
        
        // Focus input if showing game screen
        if (screenId === 'game-screen') {
            this.focusInput();
        }
    }
    
    // Display a math problem
    displayProblem(problem) {
        this.elements.problemDisplay.textContent = 
            `${problem.num1} ${problem.operation} ${problem.num2} = ?`;
    }
    
    // Update the game status display
    updateGameStatus(gameState) {
        this.elements.currentLevel.textContent = `${this.localization.t('LEVEL')} ${gameState.level}`;
        this.elements.currentOperation.textContent = this.localization.t(gameState.operationKey);
        this.elements.scoreDisplay.textContent = `${this.localization.t('SCORE')}: ${gameState.score}`;
        this.elements.problemsDisplay.textContent = `${this.localization.t('PROBLEMS')}: ${gameState.problemsSolved}`;
    }
    
    // Show feedback message
    showMessage(message, duration = 1500) {
        this.elements.terminalMessage.textContent = message;
        this.elements.terminalMessage.classList.add('show');
        
        setTimeout(() => {
            this.elements.terminalMessage.classList.remove('show');
        }, duration);
    }
    
    // Clear and focus the input field
    clearAndFocusInput() {
        this.elements.terminalInput.value = '';
        this.focusInput();
    }
    
    // Focus the input field
    focusInput() {
        setTimeout(() => {
            this.elements.terminalInput.focus();
        }, 100);
    }
    
    // Get user input value
    getUserInput() {
        return this.elements.terminalInput.value;
    }
    
    // Bind event listeners (delegated to controller)
    bindOperationSelection(handler) {
        this.elements.operationList.addEventListener('click', (e) => {
            if (e.target.classList.contains('operation-item')) {
                const operation = e.target.dataset.operation;
                handler(operation);
            }
        });
    }
    
    bindLevelSelection(handler) {
        this.elements.levelList.addEventListener('click', (e) => {
            if (e.target.classList.contains('level-item')) {
                const level = parseInt(e.target.dataset.level);
                const operation = e.target.dataset.operation;
                handler(level, operation);
            }
        });
    }
    
    // Bind input events
    bindInputEvents(submitHandler, focusHandler, blurHandler) {
        this.elements.terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitHandler();
            }
        });
        
        this.elements.terminalInput.addEventListener('focus', focusHandler);
        this.elements.terminalInput.addEventListener('blur', blurHandler);
    }
    
    // Hide/show cursor for input field
    hideCursor() {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.style.display = 'none';
    }
    
    showCursor() {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.style.display = 'inline-block';
    }
    
    // Render operation list
    renderOperationList(operations, localization) {
        if (!this.elements.operationList) return;
        
        this.elements.operationList.innerHTML = '';
        Object.keys(operations).forEach(operationName => {
            const operation = operations[operationName];
            const listItem = document.createElement('li');
            listItem.className = 'operation-item';
            listItem.dataset.operation = operationName;
            const displayName = localization.t(operation.key);
            listItem.textContent = `${operation.icon} ${displayName}`;
            this.elements.operationList.appendChild(listItem);
        });
    }
    
    // Render level list (for theme-independent structure)
    renderLevelList(levels) {
        if (!this.elements.levelList) return;
        
        this.elements.levelList.innerHTML = '';
        Object.keys(levels).forEach(levelNum => {
            const level = levels[levelNum];
            const listItem = document.createElement('li');
            listItem.className = 'level-item';
            listItem.dataset.level = levelNum;
            listItem.dataset.operation = 'current';
            listItem.textContent = `${levelNum}. ${level.description}`;
            this.elements.levelList.appendChild(listItem);
        });
    }
}