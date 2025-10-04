// Model: Data and business logic for math practice - Generic operation support
class MathModel {
    constructor(localization, operationExtension) {
        this.localization = localization;
        this.operationExtension = operationExtension;
        this.currentLevel = 1;
        this.currentOperation = operationExtension.getOperationKey().toLowerCase();
        this.score = 0;
        this.problemsSolved = 0;
        this.currentProblem = null;
        
        // Get levels from the operation extension
        this.levels = operationExtension.getLevels();
    }
    
    // Generate a math problem based on current level and operation
    generateProblem() {
        // Delegate problem generation to the operation extension
        this.currentProblem = this.operationExtension.generateProblem(this.currentLevel);
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
        const rewardMessageKeys = this.operationExtension.getRewardMessages();
        const messages = this.localization.tArray(rewardMessageKeys[0]);
        return messages[Math.floor(Math.random() * messages.length)];
    }
    
    // Get localized level descriptions
    getLocalizedLevels() {
        const localizedLevels = {};
        Object.keys(this.levels).forEach(levelNum => {
            const level = this.levels[levelNum];
            localizedLevels[levelNum] = {
                ...level,
                description: this.localization.t(level.descriptionKey)
            };
        });
        return localizedLevels;
    }
    
    // Get current game state
    getGameState() {
        return {
            level: this.currentLevel,
            operation: this.currentOperation,
            operationKey: this.operationExtension.getOperationKey(),
            score: this.score,
            problemsSolved: this.problemsSolved,
            currentProblem: this.currentProblem,
            levels: this.getLocalizedLevels()
        };
    }
    
    // Remove the randomInt method as it's now handled by extensions
}