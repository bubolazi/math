// Extension: Words Activity - Bulgarian word reading with syllable separation
class WordsActivity {
    static getLevels() {
        return {
            1: { descriptionKey: 'TWO_SYLLABLE_WORDS' },
            2: { descriptionKey: 'THREE_SYLLABLE_WORDS' },
            3: { descriptionKey: 'ALL_WORDS' }
        };
    }
    
    static generateProblem(level) {
        // Bulgarian words with syllables separated by dash
        const twoSyllableWords = [
            'МА-МА', 'ТА-ТА', 'БА-БА', 'ДЕ-ДО',
            'ВО-ДА', 'РА-НО', 'МО-РЕ', 'ГО-РА',
            'ДЪ-ГА', 'РЪ-КА', 'НО-СА', 'КО-СА',
            'МА-СА', 'ЛУ-НА', 'ЗИ-МА', 'ЛЯ-ТО',
            'КО-ТЕ', 'КУ-ЧЕ', 'РИ-БА', 'ПИ-ЛЕ',
            'СИ-НЯ', 'БЯ-ЛА', 'МА-ЛА', 'ГО-ЛЯ-МА'
        ];
        
        const threeSyllableWords = [
            'ДЕ-ТЕ-ТО', 'МО-МИ-ЧЕ', 'МО-МЧЕ-ТО',
            'ЗА-ЕК-ЧЕ', 'МЕ-ЧЕ-ТО', 'КО-ТЕ-ТО',
            'РА-БО-ТА', 'ЖИ-ВО-Т', 'ПРА-ЗНИ-К',
            'У-ТРО-ТО', 'ВЕ-ЧЕ-РЯ', 'ДЪ-Р-ВО',
            'ЦВЕ-ТЕ-ТО', 'СЛЪ-Н-ЦЕ', 'ЗВЕ-ЗДА-ТА',
            'КНИ-ГА-ТА', 'ДЕ-ВО-Й-КА', 'МО-МЧЕ-ТО'
        ];
        
        let word;
        if (level === 1) {
            // Two syllable words
            word = twoSyllableWords[Math.floor(Math.random() * twoSyllableWords.length)];
        } else if (level === 2) {
            // Three syllable words
            word = threeSyllableWords[Math.floor(Math.random() * threeSyllableWords.length)];
        } else {
            // All words
            const allWords = [...twoSyllableWords, ...threeSyllableWords];
            word = allWords[Math.floor(Math.random() * allWords.length)];
        }
        
        return {
            display: word,
            answer: 'correct',
            operation: 'read'
        };
    }
    
    static getRewardMessages() {
        return ['BULGARIAN_REWARD_MESSAGES'];
    }
    
    static getOperationKey() {
        return 'WORDS';
    }
}
