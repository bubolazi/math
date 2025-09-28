// Extension: Subtraction Levels - Example of how to easily add new operations
class SubtractionLevels {
    static getLevels() {
        return {
            1: { min: 1, max: 9, descriptionKey: 'SINGLE_DIGITS' },
            2: { min: 10, max: 19, descriptionKey: 'DOUBLE_DIGITS' },
            3: { min: 1, max: 20, descriptionKey: 'UP_TO_20' },
            4: { min: 1, max: 50, descriptionKey: 'UP_TO_50' },
            5: { min: 1, max: 100, descriptionKey: 'UP_TO_100' }
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
            'SUBTRACTION_REWARD_MESSAGES' // Will be localized by the localization system
        ];
    }
    
    static getOperationKey() {
        return 'SUBTRACTION';
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}