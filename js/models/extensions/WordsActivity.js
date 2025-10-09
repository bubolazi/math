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
        // Following Bulgarian syllable division rules:
        // - One consonant between vowels goes to next syllable (ба-ща, во-да)
        // - Two consonants between vowels split (кар-та, дър-во)
        // - Three+ consonants: first to previous, rest to next (вра-та, стру-на)
        // - Groups at beginning/end attach to nearest vowel (цве-те, град)
        const twoSyllableWords = [
            'МА-МА', 'ТА-ТА', 'БА-БА', 'ДЯ-ДО',
            'ВО-ДА', 'РА-НО', 'МО-РЕ', 'ГО-РА',
            'ДЪ-ГА', 'РЪ-КА', 'НО-СА', 'КО-СА',
            'МА-СА', 'ЛУ-НА', 'ЗИ-МА', 'ЛЯ-ТО',
            'КО-ТЕ', 'КУ-ЧЕ', 'РИ-БА', 'ПИ-ЛЕ',
            'СИ-НЯ', 'БЯ-ЛА', 'МА-ЛЪК', 'ГО-ЛЯМ',
            'БА-ЩА', 'ВРА-ТА', 'ГЛА-ВА', 'НО-ГА',
            'СТЕ-НА', 'ТРЕ-ВА', 'ПЛО-ЧА', 'ДЪ-ЩА',
            'ВО-ЛЯ', 'ЗЕ-МЯ', 'СНЯ-Г', 'ДЪЖ-Д',
            'БРЯ-Г', 'ЦВЕ-ТЕ', 'ДЪР-ВО', 'КАР-ТА',
            'ПЪТ-Я', 'ПЕ-СЕН', 'ЖИ-ВОТ', 'ЮН-АК'
        ];
        
        const threeSyllableWords = [
            'ДЕ-ТЕ-ТО', 'МО-МИ-ЧЕ', 'МО-МЧЕ-ТО',
            'ЗА-ЕК-ЧЕ', 'МЕ-ЧЕ-ТО', 'КО-ТЕ-ТО',
            'РА-БО-ТА', 'ПРАЗ-НИК', 'У-ТРО-ТО',
            'ВЕ-ЧЕ-РЯ', 'ЦВЕ-ТЕ-ТО', 'СЛЪН-ЦЕ',
            'ЗВЕЗ-ДА-ТА', 'КНИ-ГА-ТА', 'У-ЧИ-ТЕЛ',
            'ЯГО-ДА', 'У-ТРИ-Н', 'ВЕ-ЧЕР',
            'СТРУ-НА', 'ПЛА-НИ-НА', 'БАБ-КА',
            'МАЙ-КА', 'ТАТ-КО', 'СИ-НЬО',
            'БЯ-ЛО', 'ЧЕР-ВЕ-НО', 'КУК-ЛА',
            'ПРО-ЗО-РЕЦ', 'МА-СИЧ-КА', 'ПА-ТИЧ-КА'
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
