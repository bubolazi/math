// Jest setup file - load browser JS classes into global scope
const fs = require('fs');
const path = require('path');

// List of files to load (relative to project root)
const files = [
    'js/models/LocalizationModel.js',
    'js/models/extensions/AdditionLevels.js',
    'js/models/extensions/SubtractionLevels.js',
    'js/models/extensions/PlaceValueActivity.js',
    'js/models/OperationManager.js',
    'js/models/MathModel.js',
    'js/models/extensions/LettersActivity.js',
    'js/models/extensions/SyllablesActivity.js',
    'js/models/extensions/WordsActivity.js',
    'js/models/BulgarianActivityManager.js',
    'js/models/BulgarianLanguageModel.js',
    'js/models/SubjectManager.js'
];

// Load each file and make classes available globally
// We need to capture class declarations and assign them to global
files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    const code = fs.readFileSync(filePath, 'utf8');
    
    // Extract class names from the code
    const classMatches = code.match(/class\s+(\w+)/g);
    if (classMatches) {
        classMatches.forEach(match => {
            const className = match.replace('class ', '');
            // Wrap the code to assign the class to global
            const wrappedCode = `
                ${code}
                globalThis.${className} = ${className};
            `;
            eval(wrappedCode);
        });
    } else {
        // No class declarations, just eval the code
        eval(code);
    }
});
