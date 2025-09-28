// Math Practice App for Preschool Children
class MathPracticeApp {
    constructor() {
        this.currentLevel = 1;
        this.currentOperation = 'addition';
        this.score = 0;
        this.problemsSolved = 0;
        this.currentProblem = null;
        
        // Level configurations
        this.levels = {
            1: { min: 1, max: 9, description: 'Single digits (1-9)' },
            2: { min: 10, max: 19, description: 'Double digits (10-19)' },
            3: { min: 1, max: 20, description: 'Up to 20' },
            4: { min: 1, max: 50, description: 'Up to 50' },
            5: { min: 1, max: 100, description: 'Up to 100' }
        };
        
        // Reward messages
        this.rewardMessages = [
            "Great job! 🌟",
            "Excellent! 🎉",
            "Well done! 👏",
            "Fantastic! ⭐",
            "Amazing! 🌈",
            "Perfect! 🎯",
            "Outstanding! 🏆",
            "Wonderful! 💚",
            "Brilliant! ✨",
            "Super! 🚀"
        ];
        
        this.initializeApp();
    }
    
    initializeApp() {
        this.bindEvents();
        this.showScreen('level-select');
        this.updateDisplay();
    }
    
    bindEvents() {
        // Level selection buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = parseInt(e.currentTarget.dataset.level);
                const operation = e.currentTarget.dataset.operation;
                this.startLevel(level, operation);
            });
        });
        
        // Submit answer
        document.getElementById('submit-answer').addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // Enter key to submit answer
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
        
        // Next problem button
        document.getElementById('next-problem').addEventListener('click', () => {
            this.generateNewProblem();
        });
        
        // Back to levels button
        document.getElementById('back-to-levels').addEventListener('click', () => {
            this.showScreen('level-select');
            this.resetGameStats();
        });
        
        // Back to menu button (for future use)
        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.showScreen('level-select');
            this.resetGameStats();
        });
    }
    
    startLevel(level, operation) {
        this.currentLevel = level;
        this.currentOperation = operation;
        this.resetGameStats();
        this.showScreen('game-screen');
        this.generateNewProblem();
        this.updateDisplay();
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
        this.clearAnswerInput();
    }
    
    displayProblem() {
        document.getElementById('num1').textContent = this.currentProblem.num1;
        document.getElementById('operator').textContent = this.currentProblem.operation;
        document.getElementById('num2').textContent = this.currentProblem.num2;
        document.getElementById('answer-display').textContent = '?';
    }
    
    clearAnswerInput() {
        const input = document.getElementById('answer-input');
        input.value = '';
        input.focus();
    }
    
    checkAnswer() {
        const userAnswer = parseInt(document.getElementById('answer-input').value);
        
        if (isNaN(userAnswer)) {
            this.showFeedback('Please enter a number!', false);
            return;
        }
        
        if (userAnswer === this.currentProblem.answer) {
            this.score += 10;
            this.problemsSolved++;
            this.showReward();
            document.getElementById('answer-display').textContent = this.currentProblem.answer;
            this.updateDisplay();
            
            // Auto-generate next problem after a short delay
            setTimeout(() => {
                this.generateNewProblem();
            }, 2000);
        } else {
            this.showFeedback(`Not quite! The answer is ${this.currentProblem.answer}`, false);
            document.getElementById('answer-display').textContent = this.currentProblem.answer;
            
            // Generate new problem after showing correct answer
            setTimeout(() => {
                this.generateNewProblem();
            }, 3000);
        }
    }
    
    showReward() {
        const message = this.getRandomRewardMessage();
        const rewardElement = document.getElementById('reward-message');
        
        rewardElement.textContent = message;
        rewardElement.classList.add('show');
        
        setTimeout(() => {
            rewardElement.classList.remove('show');
        }, 1500);
    }
    
    showFeedback(message, isSuccess) {
        const rewardElement = document.getElementById('reward-message');
        rewardElement.textContent = message;
        rewardElement.style.background = isSuccess ? 'var(--success-green)' : 'var(--medium-green)';
        rewardElement.classList.add('show');
        
        setTimeout(() => {
            rewardElement.classList.remove('show');
            rewardElement.style.background = 'var(--success-green)';
        }, 2000);
    }
    
    getRandomRewardMessage() {
        return this.rewardMessages[Math.floor(Math.random() * this.rewardMessages.length)];
    }
    
    updateDisplay() {
        document.getElementById('current-level').textContent = `Level ${this.currentLevel}`;
        document.getElementById('current-operation').textContent = this.currentOperation.charAt(0).toUpperCase() + this.currentOperation.slice(1);
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('problems-solved').textContent = `Problems: ${this.problemsSolved}`;
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show selected screen
        document.getElementById(screenId).classList.add('active');
    }
    
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MathPracticeApp();
});