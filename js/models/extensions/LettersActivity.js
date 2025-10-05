// Extension: Letters Activity - Bulgarian alphabet learning
class LettersActivity {
    static getLevels() {
        return {
            1: { descriptionKey: 'VOWELS' },
            2: { descriptionKey: 'CONSONANTS' },
            3: { descriptionKey: 'ALL_LETTERS' }
        };
    }
    
    static generateProblem(level) {
        const vowels = ['А', 'Е', 'И', 'О', 'У', 'Ъ', 'Ю', 'Я'];
        const consonants = ['Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ'];
        
        let letter;
        if (level === 1) {
            // Only vowels
            letter = vowels[Math.floor(Math.random() * vowels.length)];
        } else if (level === 2) {
            // Only consonants
            letter = consonants[Math.floor(Math.random() * consonants.length)];
        } else {
            // All letters
            const allLetters = [...vowels, ...consonants];
            letter = allLetters[Math.floor(Math.random() * allLetters.length)];
        }
        
        return {
            display: letter,
            answer: 'correct', // Parent confirms by pressing Enter
            operation: 'read'
        };
    }
    
    static getRewardMessages() {
        return ['BULGARIAN_REWARD_MESSAGES'];
    }
    
    static getOperationKey() {
        return 'LETTERS';
    }
}
