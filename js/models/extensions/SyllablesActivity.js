// Extension: Syllables Activity - Bulgarian syllable reading
class SyllablesActivity {
    static getLevels() {
        return {
            1: { descriptionKey: 'SIMPLE_SYLLABLES' },
            2: { descriptionKey: 'COMPLEX_SYLLABLES' },
            3: { descriptionKey: 'ALL_SYLLABLES' }
        };
    }
    
    static generateProblem(level) {
        // Common Bulgarian syllables
        const simpleSyllables = [
            'БА', 'ВА', 'ДА', 'МА', 'ПА', 'ТА', 
            'БО', 'ВО', 'ДО', 'МО', 'ПО', 'ТО',
            'БУ', 'ВУ', 'ДУ', 'МУ', 'ПУ', 'ТУ',
            'БЕ', 'ВЕ', 'ДЕ', 'МЕ', 'ПЕ', 'ТЕ',
            'БИ', 'ВИ', 'ДИ', 'МИ', 'ПИ', 'ТИ'
        ];
        
        const complexSyllables = [
            'ЖА', 'ЗА', 'КА', 'ЛА', 'НА', 'РА', 'СА', 'ФА', 'ХА', 'ЦА', 'ЧА', 'ША', 'ЩА',
            'ЖО', 'ЗО', 'КО', 'ЛО', 'НО', 'РО', 'СО', 'ФО', 'ХО', 'ЦО', 'ЧО', 'ШО', 'ЩО',
            'ЖУ', 'ЗУ', 'КУ', 'ЛУ', 'НУ', 'РУ', 'СУ', 'ФУ', 'ХУ', 'ЦУ', 'ЧУ', 'ШУ', 'ЩУ',
            'ЖЕ', 'ЗЕ', 'КЕ', 'ЛЕ', 'НЕ', 'РЕ', 'СЕ', 'ФЕ', 'ХЕ', 'ЦЕ', 'ЧЕ', 'ШЕ', 'ЩЕ',
            'ЖИ', 'ЗИ', 'КИ', 'ЛИ', 'НИ', 'РИ', 'СИ', 'ФИ', 'ХИ', 'ЦИ', 'ЧИ', 'ШИ', 'ЩИ',
            'БЪ', 'ВЪ', 'ДЪ', 'МЪ', 'ПЪ', 'ТЪ', 'ЖЪ', 'ЗЪ', 'КЪ', 'ЛЪ', 'НЪ', 'РЪ', 'СЪ'
        ];
        
        let syllable;
        if (level === 1) {
            // Simple syllables
            syllable = simpleSyllables[Math.floor(Math.random() * simpleSyllables.length)];
        } else if (level === 2) {
            // Complex syllables
            syllable = complexSyllables[Math.floor(Math.random() * complexSyllables.length)];
        } else {
            // All syllables
            const allSyllables = [...simpleSyllables, ...complexSyllables];
            syllable = allSyllables[Math.floor(Math.random() * allSyllables.length)];
        }
        
        return {
            display: syllable,
            answer: 'correct',
            operation: 'read'
        };
    }
    
    static getRewardMessages() {
        return ['BULGARIAN_REWARD_MESSAGES'];
    }
    
    static getOperationKey() {
        return 'SYLLABLES';
    }
}
