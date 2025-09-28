// Model: Data and business logic for math practice
class MathModel {
    constructor() {
        this.currentLevel = 1;
        this.currentOperation = 'addition';
        this.score = 0;
        this.problemsSolved = 0;
        this.currentProblem = null;
        
        // Level configurations - easily extendable
        this.levels = {
            1: { min: 1, max: 9, description: 'SINGLE DIGITS (1-9)' },
            2: { min: 10, max: 19, description: 'DOUBLE DIGITS (10-19)' },
            3: { min: 1, max: 20, description: 'UP TO 20' },
            4: { min: 1, max: 50, description: 'UP TO 50' },
            5: { min: 1, max: 100, description: 'UP TO 100' }
        };
        
        // Reward messages - theme-independent
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
    }
    
    // Generate a math problem based on current level and operation
    generateProblem() {
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
            
            this.currentProblem = {
                num1: num1,
                num2: num2,
                operation: '+',
                answer: num1 + num2
            };
        }
        
        // Future operations can be added here
        // if (this.currentOperation === 'subtraction') { ... }
        // if (this.currentOperation === 'multiplication') { ... }
        // if (this.currentOperation === 'division') { ... }
        
        return this.currentProblem;
    }
    
    // Check if the user's answer is correct
    checkAnswer(userAnswer) {
        return parseInt(userAnswer) === this.currentProblem.answer;
    }
    
    // Update score for correct answer
    updateScore() {
        this.score += 10;
        this.problemsSolved++;
    }
    
    // Reset game statistics
    resetStats() {
        this.score = 0;
        this.problemsSolved = 0;
    }
    
    // Set current level and operation
    setLevel(level, operation) {
        this.currentLevel = level;
        this.currentOperation = operation;
    }
    
    // Get a random reward message
    getRandomRewardMessage() {
        return this.rewardMessages[Math.floor(Math.random() * this.rewardMessages.length)];
    }
    
    // Get current game state
    getGameState() {
        return {
            level: this.currentLevel,
            operation: this.currentOperation,
            score: this.score,
            problemsSolved: this.problemsSolved,
            currentProblem: this.currentProblem,
            levels: this.levels
        };
    }
    
    // Utility function for random integer generation
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}