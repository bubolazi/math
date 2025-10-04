// Localization Model - Manages language translations
class LocalizationModel {
    constructor(language = 'bg') {
        this.currentLanguage = language;
        this.translations = this.getTranslations();
    }
    
    // Get all translations for different languages
    getTranslations() {
        return {
            'bg': {
                // Page title and header
                'MATH_TERMINAL': 'МАТЕМАТИЧЕСКИ ТЕРМИНАЛ v1.0',
                'LEVEL': 'НИВО',
                
                // Operations
                'ADDITION': 'СЪБИРАНЕ',
                'SUBTRACTION': 'ИЗВАЖДАНЕ',
                'MULTIPLICATION': 'УМНОЖЕНИЕ',
                'DIVISION': 'ДЕЛЕНИЕ',
                
                // Operation selection
                'SELECT_OPERATION': 'ИЗБЕРЕТЕ ОПЕРАЦИЯ:',
                'OPERATION_INSTRUCTIONS': 'КЛИКНЕТЕ НА ОПЕРАЦИЯ ЗА ЗАПОЧВАНЕ • ОБНОВЕТЕ СТРАНИЦАТА ЗА ВРЪЩАНЕ ТУК',
                
                // Level selection screen
                'SELECT_DIFFICULTY_LEVEL': 'ИЗБЕРЕТЕ НИВО НА ТРУДНОСТ:',
                // Level descriptions
                'SINGLE_DIGITS': 'ЕДНОЦИФРЕНИ ЧИСЛА (1-9)',
                'DOUBLE_DIGITS': 'ДВУЦИФРЕНИ ЧИСЛА (10-19)',
                'UP_TO_20': 'ДО 20',
                'UP_TO_50': 'ДО 50',
                'UP_TO_100': 'ДО 100',
                'LEVEL_INSTRUCTIONS': 'КЛИКНЕТЕ НА НИВО ЗА ЗАПОЧВАНЕ • ОБНОВЕТЕ СТРАНИЦАТА ЗА ВРЪЩАНЕ ТУК',
                
                // Game screen
                'INPUT_PROMPT': '>',
                'SCORE': 'ТОЧКИ',
                'PROBLEMS': 'ЗАДАЧИ',
                'GAME_INSTRUCTIONS': 'НАТИСНЕТЕ ENTER ЗА ИЗПРАЩАНЕ НА ОТГОВОР • ОБНОВЕТЕ СТРАНИЦАТА ЗА ВРЪЩАНЕ КЪМ НИВАТА',
                
                // Reward messages
                'REWARD_MESSAGES': [
                    'ПРАВИЛНО! БРАВО!',
                    'ОТЛИЧНО ПРЕСМЯТАНЕ!',
                    'ПЕРФЕКТЕН ОТГОВОР!',
                    'НЕВЕРОЯТНА РАБОТА!',
                    'БЛЕСТЯЩ РЕЗУЛТАТ!',
                    'ПРЕВЪЗХОДНО ИЗЧИСЛЕНИЕ!',
                    'ИЗКЛЮЧИТЕЛНО УМЕНИЕ!',
                    'ВЕЛИКОЛЕПНА РАБОТА!',
                    'БЕЗУПРЕЧНО ИЗПЪЛНЕНИЕ!',
                    'ВПЕЧАТЛЯВАЩА ТОЧНОСТ!'
                ],
                
                // Subtraction-specific reward messages
                'SUBTRACTION_REWARD_MESSAGES': [
                    'ОТЛИЧНО ИЗВАЖДАНЕ!',
                    'ПЕРФЕКТНО ПРЕСМЯТАНЕ!',
                    'НЕВЕРОЯТНА РАБОТА С ИЗВАЖДАНЕ!',
                    'БЛЕСТЯЩИ УМЕНИЯ ЗА МИНУС!',
                    'ПРЕВЪЗХОДНО ИЗВАЖДАНЕ!',
                    'БЕЗУПРЕЧНО ИЗВАЖДАНЕ!',
                    'ВЕЛИКОЛЕПНО ИЗВАЖДАНЕ!',
                    'ВПЕЧАТЛЯВАЩА РАБОТА С МИНУС!',
                    'ИЗКЛЮЧИТЕЛНО ИЗВАЖДАНЕ!',
                    'НЕВЕРОЯТНИ УМЕНИЯ ЗА ИЗВАЖДАНЕ!'
                ],
                
                // Badge system - Animals organized by gender
                // Среден род (neuter) - ends in -о, -е
                'BADGE_ANIMALS_NEUTER': [
                    'Мече',
                    'Зайче',
                    'Котенце',
                    'Кученце',
                    'Лисиче',
                    'Тигърче',
                    'Слонче',
                    'Жирафче',
                    'Пиленце',
                    'Патенце',
                    'Морско Конче',
                    'Бухалче',
                    'Папагалче'
                ],
                
                // Женски род (feminine) - ends in -а, -я
                'BADGE_ANIMALS_FEMININE': [
                    'Катеричка',
                    'Коала',
                    'Панда',
                    'Овчица',
                    'Пеперудка',
                    'Калинка',
                    'Рибка',
                    'Костенурка',
                    'Мравка',
                    'Пчеличка'
                ],
                
                // Мъжки род (masculine) - ends in consonant
                'BADGE_ANIMALS_MASCULINE': [
                    'Пеликан',
                    'Делфин',
                    'Пингвин',
                    'Хамстер',
                    'Октопод'
                ],
                
                // Badge system - Adjectives organized by gender
                // Среден род (neuter) - ends in -о, -е
                'BADGE_ADJECTIVES_NEUTER': [
                    'Слънчево',
                    'Усмихнато',
                    'Щастливо',
                    'Весело',
                    'Умно',
                    'Златно',
                    'Сребърно',
                    'Танцуващо',
                    'Радостно',
                    'Блестящо',
                    'Смело',
                    'Любопитно',
                    'Игриво',
                    'Храбро',
                    'Енергично',
                    'Мило',
                    'Вълшебно',
                    'Искрящо',
                    'Светло',
                    'Топло',
                    'Нежно',
                    'Приятелско',
                    'Усърдно',
                    'Шарено',
                    'Звездно',
                    'Мечтано',
                    'Прекрасно',
                    'Чудесно'
                ],
                
                // Женски род (feminine) - ends in -а, -я
                'BADGE_ADJECTIVES_FEMININE': [
                    'Слънчева',
                    'Усмихната',
                    'Щастлива',
                    'Весела',
                    'Умна',
                    'Златна',
                    'Сребърна',
                    'Танцуваща',
                    'Радостна',
                    'Блестяща',
                    'Смела',
                    'Любопитна',
                    'Игрива',
                    'Храбра',
                    'Енергична',
                    'Мила',
                    'Вълшебна',
                    'Искряща',
                    'Светла',
                    'Топла',
                    'Нежна',
                    'Приятелска',
                    'Усърдна',
                    'Шарена',
                    'Звездна',
                    'Мечтана',
                    'Прекрасна',
                    'Чудесна'
                ],
                
                // Мъжки род (masculine) - ends in consonant
                'BADGE_ADJECTIVES_MASCULINE': [
                    'Слънчев',
                    'Усмихнат',
                    'Щастлив',
                    'Весел',
                    'Умен',
                    'Златен',
                    'Сребърен',
                    'Танцуващ',
                    'Радостен',
                    'Блестящ',
                    'Смел',
                    'Любопитен',
                    'Игрив',
                    'Храбър',
                    'Енергичен',
                    'Мил',
                    'Вълшебен',
                    'Искрящ',
                    'Светъл',
                    'Топъл',
                    'Нежен',
                    'Приятелски',
                    'Усърден',
                    'Шарен',
                    'Звезден',
                    'Мечтан',
                    'Прекрасен',
                    'Чудесен'
                ],
                
                // Badge message template
                'BADGE_MESSAGE': 'Страхотна работа! Печелиш значка:',
                
                // Error messages
                'ERROR_INVALID_INPUT': 'ГРЕШКА: НЕВАЛИДЕН ВХОД',
                'INCORRECT_ANSWER': 'НЕПРАВИЛНО. ОТГОВОР:'
            },
            
            // Keep English as fallback
            'en': {
                'MATH_TERMINAL': 'MATH TERMINAL v1.0',
                'LEVEL': 'LEVEL',
                'ADDITION': 'ADDITION',
                'SELECT_DIFFICULTY_LEVEL': 'SELECT DIFFICULTY LEVEL:',
                'SINGLE_DIGITS': 'SINGLE DIGITS (1-9)',
                'DOUBLE_DIGITS': 'DOUBLE DIGITS (10-19)',
                'UP_TO_20': 'UP TO 20',
                'UP_TO_50': 'UP TO 50',
                'UP_TO_100': 'UP TO 100',
                'LEVEL_INSTRUCTIONS': 'CLICK ON A LEVEL TO START • REFRESH PAGE TO RETURN HERE',
                'INPUT_PROMPT': '>',
                'SCORE': 'SCORE',
                'PROBLEMS': 'PROBLEMS',
                'GAME_INSTRUCTIONS': 'PRESS ENTER TO SUBMIT ANSWER • REFRESH PAGE TO RETURN TO LEVELS',
                'REWARD_MESSAGES': [
                    'CORRECT! WELL DONE!',
                    'EXCELLENT CALCULATION!',
                    'PERFECT ANSWER!',
                    'OUTSTANDING WORK!',
                    'BRILLIANT RESULT!',
                    'SUPERB COMPUTATION!',
                    'EXCEPTIONAL SKILL!',
                    'MAGNIFICENT WORK!',
                    'FLAWLESS EXECUTION!',
                    'IMPRESSIVE ACCURACY!'
                ],
                // English doesn't have grammatical gender, so we use single lists
                'BADGE_ANIMALS_NEUTER': [
                    'Bear Cub',
                    'Bunny',
                    'Kitten',
                    'Puppy',
                    'Fox Cub',
                    'Tiger Cub',
                    'Elephant',
                    'Giraffe',
                    'Chick',
                    'Duckling',
                    'Seahorse',
                    'Owlet',
                    'Parrot'
                ],
                'BADGE_ANIMALS_FEMININE': [
                    'Squirrel',
                    'Koala',
                    'Panda',
                    'Sheep',
                    'Butterfly',
                    'Ladybug',
                    'Fish',
                    'Turtle',
                    'Ant',
                    'Bee'
                ],
                'BADGE_ANIMALS_MASCULINE': [
                    'Pelican',
                    'Dolphin',
                    'Penguin',
                    'Hamster',
                    'Octopus'
                ],
                'BADGE_ADJECTIVES_NEUTER': [
                    'Sunny',
                    'Smiling',
                    'Happy',
                    'Cheerful',
                    'Smart',
                    'Golden',
                    'Silver',
                    'Dancing',
                    'Joyful',
                    'Brilliant',
                    'Brave',
                    'Curious',
                    'Playful',
                    'Courageous',
                    'Energetic',
                    'Sweet',
                    'Magical',
                    'Sparkling',
                    'Bright',
                    'Warm',
                    'Gentle',
                    'Friendly',
                    'Diligent',
                    'Colorful',
                    'Starry',
                    'Dreamy',
                    'Wonderful',
                    'Amazing'
                ],
                'BADGE_ADJECTIVES_FEMININE': [
                    'Sunny',
                    'Smiling',
                    'Happy',
                    'Cheerful',
                    'Smart',
                    'Golden',
                    'Silver',
                    'Dancing',
                    'Joyful',
                    'Brilliant',
                    'Brave',
                    'Curious',
                    'Playful',
                    'Courageous',
                    'Energetic',
                    'Sweet',
                    'Magical',
                    'Sparkling',
                    'Bright',
                    'Warm',
                    'Gentle',
                    'Friendly',
                    'Diligent',
                    'Colorful',
                    'Starry',
                    'Dreamy',
                    'Wonderful',
                    'Amazing'
                ],
                'BADGE_ADJECTIVES_MASCULINE': [
                    'Sunny',
                    'Smiling',
                    'Happy',
                    'Cheerful',
                    'Smart',
                    'Golden',
                    'Silver',
                    'Dancing',
                    'Joyful',
                    'Brilliant',
                    'Brave',
                    'Curious',
                    'Playful',
                    'Courageous',
                    'Energetic',
                    'Sweet',
                    'Magical',
                    'Sparkling',
                    'Bright',
                    'Warm',
                    'Gentle',
                    'Friendly',
                    'Diligent',
                    'Colorful',
                    'Starry',
                    'Dreamy',
                    'Wonderful',
                    'Amazing'
                ],
                'BADGE_MESSAGE': 'Great work! You earned a badge:',
                'ERROR_INVALID_INPUT': 'ERROR: INVALID INPUT',
                'INCORRECT_ANSWER': 'INCORRECT. ANSWER:'
            }
        };
    }
    
    // Get translation for a key
    t(key) {
        const translations = this.translations[this.currentLanguage];
        if (translations && translations[key]) {
            return translations[key];
        }
        
        // Fallback to English if key not found in current language
        const englishTranslations = this.translations['en'];
        if (englishTranslations && englishTranslations[key]) {
            return englishTranslations[key];
        }
        
        // Return key itself if no translation found
        console.warn(`Translation not found for key: ${key}`);
        return key;
    }
    
    // Get array translation (like reward messages)
    tArray(key) {
        const translation = this.t(key);
        return Array.isArray(translation) ? translation : [translation];
    }
    
    // Change language
    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            return true;
        }
        return false;
    }
    
    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }
}