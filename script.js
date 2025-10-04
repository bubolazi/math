// Terminal Math Practice App for Preschool Children
class TerminalMathApp {
    constructor() {
        this.currentLevel = 1;
        this.currentOperation = 'addition';
        this.score = 0;
        this.problemsSolved = 0;
        this.currentProblem = null;
        
        // Level configurations
        this.levels = {
            1: { min: 1, max: 9, description: 'SINGLE DIGITS (1-9)' },
            2: { min: 10, max: 19, description: 'DOUBLE DIGITS (10-19)' },
            3: { min: 1, max: 20, description: 'UP TO 20' },
            4: { min: 1, max: 50, description: 'UP TO 50' },
            5: { min: 1, max: 100, description: 'UP TO 100' }
        };
        
        // Terminal-style reward messages
        this.rewardMessages = [
            "CORRECT! WELL DONE!",
            "EXCELLENT CALCULATION!",
            "PERFECT ANSWER!",
            "OUTSTANDING WORK!",
            "BRILLIANT RESULT!",
            "SUPERB COMPUTATION!",
            "EXCEPTIONAL SKILL!",
            "MAGNIFICENT WORK!",
            "FLAWLESS EXECUTION!",
            "IMPRESSIVE ACCURACY!"
        ];
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.bindEvents();
        this.showScreen('level-select');
        this.updateDisplay();
    }
    
    bindEvents() {
        // Level selection clicks
        document.querySelectorAll('.level-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const level = parseInt(e.currentTarget.dataset.level);
                const operation = e.currentTarget.dataset.operation;
                this.startLevel(level, operation);
            });
        });
        
        // Enter key to submit answer in game screen
        document.getElementById('terminal-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Auto-focus on input when game screen is shown
        document.getElementById('terminal-input').addEventListener('focus', () => {
            this.hideCursor();
        });
        
        document.getElementById('terminal-input').addEventListener('blur', () => {
            this.showCursor();
        });
    }
    
    startLevel(level, operation) {
        this.currentLevel = level;
        this.currentOperation = operation;
        this.resetGameStats();
        this.showScreen('game-screen');
        this.generateNewProblem();
        this.updateDisplay();
        this.focusInput();
    }
    
    resetGameStats() {
        this.score = 0;
        this.problemsSolved = 0;
        this.updateDisplay();
    }
    
    generateNewProblem() {
        const levelConfig = this.levels[this.currentLevel];
        let num1, num2;
        
        if (this.currentOperation === 'addition') {
            // Generate numbers based on level
            if (this.currentLevel === 1) {
                // Single digits only
                num1 = this.randomInt(1, 9);
                num2 = this.randomInt(1, 9);
            } else if (this.currentLevel === 2) {
                // One number is double digit (10-19), other is single digit
                num1 = this.randomInt(10, 19);
                num2 = this.randomInt(1, 9);
            } else {
                // General case: ensure result doesn't exceed level max
                num1 = this.randomInt(levelConfig.min, Math.min(levelConfig.max, 50));
                num2 = this.randomInt(levelConfig.min, Math.min(levelConfig.max - num1, 50));
                
                // Ensure result doesn't exceed level maximum
                if (num1 + num2 > levelConfig.max) {
                    num2 = levelConfig.max - num1;
                    if (num2 < 1) {
                        num1 = this.randomInt(1, levelConfig.max - 1);
                        num2 = this.randomInt(1, levelConfig.max - num1);
                    }
                }
            }
        }
        
        this.currentProblem = {
            num1: num1,
            num2: num2,
            operation: '+',
            answer: num1 + num2
        };
        
        this.displayProblem();
        this.clearInput();
    }
    
    displayProblem() {
        const problemDisplay = document.getElementById('problem-display');
        problemDisplay.textContent = `${this.currentProblem.num1} ${this.currentProblem.operation} ${this.currentProblem.num2} = ?`;
    }
    
    clearInput() {
        const input = document.getElementById('terminal-input');
        input.value = '';
        this.focusInput();
    }
    
    focusInput() {
        setTimeout(() => {
            document.getElementById('terminal-input').focus();
        }, 100);
    }
    
    hideCursor() {
        document.querySelector('.cursor').style.display = 'none';
    }
    
    showCursor() {
        document.querySelector('.cursor').style.display = 'inline-block';
    }
    
    checkAnswer() {
        const userAnswer = parseInt(document.getElementById('terminal-input').value);
        
        if (isNaN(userAnswer)) {
            this.showMessage('ERROR: INVALID INPUT', false);
            return;
        }
        
        if (userAnswer === this.currentProblem.answer) {
            this.score += 10;
            this.problemsSolved++;
            this.showMessage(this.getRandomRewardMessage(), true);
            this.updateDisplay();
            
            // Auto-generate next problem after a short delay
            setTimeout(() => {
                this.generateNewProblem();
            }, 2000);
        } else {
            this.showMessage(`INCORRECT. ANSWER: ${this.currentProblem.answer}`, false);
            
            // Generate new problem after showing correct answer
            setTimeout(() => {
                this.generateNewProblem();
            }, 3000);
        }
    }
    
    showMessage(message, isSuccess) {
        const messageElement = document.getElementById('terminal-message');
        messageElement.textContent = message;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, isSuccess ? 1500 : 2500);
    }
    
    getRandomRewardMessage() {
        return this.rewardMessages[Math.floor(Math.random() * this.rewardMessages.length)];
    }
    
    updateDisplay() {
        document.getElementById('current-level').textContent = `LEVEL ${this.currentLevel}`;
        document.getElementById('current-operation').textContent = this.currentOperation.toUpperCase();
        document.getElementById('score-display').textContent = `SCORE: ${this.score}`;
        document.getElementById('problems-display').textContent = `PROBLEMS: ${this.problemsSolved}`;
    }
    
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
    
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TerminalMathApp();
});