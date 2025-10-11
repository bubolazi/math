// Extension: Place Value Activity - Understanding ones and tens
class PlaceValueActivity {
    static getLevels() {
        return {
            1: { descriptionKey: 'PLACE_VALUE_RECOGNITION' },
            2: { descriptionKey: 'PLACE_VALUE_CALCULATION' }
        };
    }
    
    static generateProblem(level) {
        if (level === 1) {
            // Level 1: Recognize ones and tens
            const num = this.randomInt(10, 99); // Two-digit number
            const questionType = Math.random() < 0.5 ? 'ones' : 'tens';
            
            return {
                num1: num,
                questionType: questionType,
                operation: 'place_value_recognition',
                answer: questionType === 'ones' ? num % 10 : Math.floor(num / 10),
                display: num
            };
        } else {
            // Level 2: Step-by-step calculation
            // Generate two 2-digit numbers for addition
            const num1 = this.randomInt(10, 49);
            const num2 = this.randomInt(10, 49);
            
            const ones1 = num1 % 10;
            const tens1 = Math.floor(num1 / 10);
            const ones2 = num2 % 10;
            const tens2 = Math.floor(num2 / 10);
            
            const onesSum = ones1 + ones2;
            const tensSum = tens1 + tens2;
            
            return {
                num1: num1,
                num2: num2,
                ones1: ones1,
                tens1: tens1,
                ones2: ones2,
                tens2: tens2,
                onesSum: onesSum,
                tensSum: tensSum,
                operation: 'place_value_calculation',
                answer: num1 + num2,
                step: 1 // Track which step we're on
            };
        }
    }
    
    static getRewardMessages() {
        return [
            'PLACE_VALUE_REWARD_MESSAGES'
        ];
    }
    
    static getOperationKey() {
        return 'PLACE_VALUE';
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
