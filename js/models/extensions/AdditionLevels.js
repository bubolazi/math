// Extension: Addition Levels - Moved from core MathModel for better separation
class AdditionLevels {
    static getLevels() {
        return {
            1: { min: 1, max: 9, descriptionKey: 'SINGLE_DIGITS' },
            2: { min: 10, max: 19, descriptionKey: 'DOUBLE_DIGITS' }
        };
    }
    
    static generateProblem(level) {
        const levelConfig = this.getLevels()[level];
        let num1, num2;
        
        // Generate addition problems based on level
        if (level === 1) {
            // Single digits only
            num1 = this.randomInt(1, 9);
            num2 = this.randomInt(1, 9);
        } else if (level === 2) {
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
        
        return {
            num1: num1,
            num2: num2,
            operation: '+',
            answer: num1 + num2
        };
    }
    
    static getRewardMessages() {
        return [
            'REWARD_MESSAGES' // Will be localized by the localization system
        ];
    }
    
    static getOperationKey() {
        return 'ADDITION';
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}