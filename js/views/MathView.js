// View: UI rendering and DOM manipulation
class MathView {
    constructor() {
        this.elements = {
            levelSelect: document.getElementById('level-select'),
            gameScreen: document.getElementById('game-screen'),
            currentLevel: document.getElementById('current-level'),
            currentOperation: document.getElementById('current-operation'),
            problemDisplay: document.getElementById('problem-display'),
            terminalInput: document.getElementById('terminal-input'),
            scoreDisplay: document.getElementById('score-display'),
            problemsDisplay: document.getElementById('problems-display'),
            terminalMessage: document.getElementById('terminal-message'),
            levelList: document.querySelector('.level-list')
        };
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
        this.elements.currentLevel.textContent = `LEVEL ${gameState.level}`;
        this.elements.currentOperation.textContent = gameState.operation.toUpperCase();
        this.elements.scoreDisplay.textContent = `SCORE: ${gameState.score}`;
        this.elements.problemsDisplay.textContent = `PROBLEMS: ${gameState.problemsSolved}`;
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
    
    // Render level list (for theme-independent structure)
    renderLevelList(levels) {
        if (!this.elements.levelList) return;
        
        this.elements.levelList.innerHTML = '';
        Object.keys(levels).forEach(levelNum => {
            const level = levels[levelNum];
            const listItem = document.createElement('li');
            listItem.className = 'level-item';
            listItem.dataset.level = levelNum;
            listItem.dataset.operation = 'addition';
            listItem.textContent = `${levelNum}. ${level.description}`;
            this.elements.levelList.appendChild(listItem);
        });
    }
}