// Extension: Subtraction Levels - Example of how to easily add new operations
class SubtractionLevels {
    static getLevels() {
        return {
            1: { min: 1, max: 9, description: 'SUBTRACTION: SINGLE DIGITS (1-9)' },
            2: { min: 10, max: 19, description: 'SUBTRACTION: DOUBLE DIGITS (10-19)' },
            3: { min: 1, max: 20, description: 'SUBTRACTION: UP TO 20' },
            4: { min: 1, max: 50, description: 'SUBTRACTION: UP TO 50' },
            5: { min: 1, max: 100, description: 'SUBTRACTION: UP TO 100' }
        };
    }
    
    static generateProblem(level) {
        const levelConfig = this.getLevels()[level];
        let num1, num2;
        
        // Generate subtraction problems ensuring positive results
        if (level === 1) {
            // Single digits - ensure num1 >= num2
            num1 = this.randomInt(2, 9);
            num2 = this.randomInt(1, num1);
        } else if (level === 2) {
            // Double digits
            num1 = this.randomInt(10, 19);
            num2 = this.randomInt(1, Math.min(9, num1));
        } else {
            // General case
            num1 = this.randomInt(levelConfig.min + 5, levelConfig.max);
            num2 = this.randomInt(levelConfig.min, Math.min(num1, levelConfig.max / 2));
        }
        
        return {
            num1: num1,
            num2: num2,
            operation: '-',
            answer: num1 - num2
        };
    }
    
    static getRewardMessages() {
        return [
            "EXCELLENT SUBTRACTION!",
            "PERFECT CALCULATION!",
            "OUTSTANDING SUBTRACTION WORK!",
            "BRILLIANT MINUS SKILLS!",
            "SUPERB SUBTRACTION!",
            "FLAWLESS SUBTRACTION!",
            "MAGNIFICENT SUBTRACTION!",
            "IMPRESSIVE MINUS WORK!",
            "EXCEPTIONAL SUBTRACTION!",
            "AMAZING SUBTRACTION SKILLS!"
        ];
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Example of how to extend the main model
// MathModel.prototype.addOperation = function(operation, levels, problemGenerator, messages) {
//     this.operations = this.operations || {};
//     this.operations[operation] = {
//         levels: levels,
//         generateProblem: problemGenerator,
//         rewardMessages: messages
//     };
// };