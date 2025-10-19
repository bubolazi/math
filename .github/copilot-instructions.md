# Copilot Instructions for Lumi

## Project Overview

Lumi is a beautiful, kid-friendly web application for preschool children to learn and practice various subjects including math and Bulgarian language. The application features:
- Green monochrome theme
- Progressive difficulty levels
- Multi-step calculation visualization
- Reward system for encouragement
- Pure JavaScript with no external runtime dependencies

## Architecture

### MVC Pattern
The application follows a **Model-View-Controller (MVC)** architecture:

- **Models** (`js/models/`): Handle data and business logic
  - `core/`: Core functionality (LocalizationModel, SubjectManager)
  - `subjects/`: Subject-specific models (MathModel, BulgarianLanguageModel)
  - Each subject has an activity manager and individual activity classes
  
- **Views** (`js/views/`): Handle UI rendering
  - AppView: Main view controller for rendering all UI components

- **Controllers** (`js/controllers/`): Coordinate application flow
  - AppController: Manages navigation and state

- **Entry Point** (`js/app.js`): Initialize the MVC stack with LumiApp class

### Key Components

1. **Subject System**: Extensible subject management via SubjectManager
2. **Activity System**: Each subject contains multiple activities with different levels
3. **Localization**: Bulgarian language support via LocalizationModel
4. **Navigation Stack**: Manages backward navigation with state preservation

## Coding Standards

### General Guidelines
- **Pure JavaScript**: No external dependencies for the app (devDependencies for testing only)
- **ES6+ Features**: Use modern JavaScript features (classes, arrow functions, etc.)
- **No Comments**: Code should be self-documenting; avoid comments unless absolutely necessary for complex logic
- **Semantic Naming**: Use clear, descriptive names for variables, functions, and classes

### Security Guidelines
- **No Secrets**: Never commit API keys, tokens, passwords, or other sensitive data
- **Input Validation**: Always validate user input before processing
- **XSS Prevention**: Sanitize user-generated content before rendering
- **Dependencies**: Only add dependencies when absolutely necessary; review security advisories
- **Code Review**: All changes should be reviewed for security vulnerabilities

### Dependencies Policy
- **Runtime Dependencies**: Avoid adding new runtime dependencies; keep the app pure JavaScript
- **Dev Dependencies**: Only add devDependencies for testing, linting, or build tools
- **Version Pinning**: Use exact versions in package.json for reproducible builds
- **Security Audits**: Run `npm audit` regularly to check for vulnerabilities
- **Updates**: Keep dependencies up to date, especially security patches

### File Organization
- One class per file
- File names match class names (e.g., `MathModel.js` for `MathModel` class)
- Group related files in appropriate subdirectories
- Keep HTML, CSS, and JS separate

### File Restrictions
- **DO NOT modify**: `package-lock.json` (only update via `npm install`)
- **DO NOT commit**: `node_modules/`, `coverage/`, `.DS_Store`, IDE config files
- **DO NOT access**: Files outside the project directory
- **Review `.gitignore`**: Before committing to ensure no unwanted files are included

### Class Structure
```javascript
class MyNewActivity {
    constructor(params) {
        // Initialize properties
    }
    
    generateProblem() {
        // Core logic
    }
    
    checkAnswer(userAnswer) {
        // Validation logic
    }
}
```

## Testing Requirements

### Test Framework
- **Jest** with jsdom for browser environment simulation
- All tests in `tests/` directory with `.test.js` suffix
- Test setup in `tests/setup.js` loads all JS files

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage report
```

### Test Coverage Requirements
- **All new features must include tests**
- Test both happy paths and edge cases
- Maintain 100% test pass rate
- Group related tests in `describe` blocks

### Writing Tests
```javascript
describe('Feature Name - Component', () => {
    let model;

    beforeEach(() => {
        model = new FeatureModel();
    });

    test('should perform expected behavior', () => {
        const result = model.someMethod();
        expect(result).toBe(expectedValue);
    });
});
```

## Adding New Features

### Adding a New Subject
1. Create model in `js/models/subjects/[subject-name]/`
2. Create `[SubjectName]Model.js` (main model)
3. Create `[SubjectName]ActivityManager.js` (manages activities)
4. Create `activities/` subdirectory with activity classes
5. Register subject in `SubjectManager.js`
6. Add localization entries in `LocalizationModel.js`
7. Write comprehensive tests in `tests/`

### Adding a New Activity
1. Create activity class in appropriate `activities/` directory
2. Implement `generateProblem()` and `checkAnswer()` methods
3. Register activity in the subject's ActivityManager
4. Add localization strings if needed
5. Write tests covering all difficulty levels

### Adding a New Level
1. Add level configuration to activity class
2. Ensure problem generation adapts to level parameters
3. Test the new level thoroughly

## UI/UX Guidelines

### Theme
- **Green monochrome**: Use existing color palette from `styles.css` or `css/themes/`
- **Large buttons**: Kid-friendly touch targets
- **Clear typography**: Use existing font sizes and families
- **Responsive design**: Support desktop, tablet, and mobile

### Feedback
- Animated reward messages for correct answers
- Clear visual indication of progress
- Encouraging messages (defined in LocalizationModel)

### Multi-Step Calculations
- Display calculation history for complex problems
- Use emoji indicators for step progression (📝 1️⃣ 2️⃣ 3️⃣ 4️⃣)
- Keep information concise with tooltips for details

## Development Workflow

### Before Making Changes
1. Pull latest changes and install dependencies: `npm install`
2. Run tests to ensure starting point is clean: `npm test`
3. Review relevant existing code and tests

### Making Changes
1. Follow MVC pattern and maintain separation of concerns
2. Keep changes minimal and focused
3. Write/update tests alongside code changes
4. Test frequently during development

### Before Committing
1. Run full test suite: `npm test`
2. Ensure all tests pass
3. Verify no unintended files are staged (check `.gitignore`)
4. Review changes for code quality

### CI/CD
- GitHub Actions run tests on push and PR
- Tests run on Node.js 18.x and 20.x
- Coverage reports uploaded to Codecov

## Common Patterns

### Problem Generation
```javascript
generateProblem() {
    const problem = {
        question: "What is 2 + 2?",
        answer: 4,
        displayText: "2 + 2 = ?"
    };
    return problem;
}
```

### Answer Validation
```javascript
checkAnswer(userAnswer) {
    return userAnswer === this.currentProblem.answer;
}
```

### State Management
- Controller manages navigation stack
- Models maintain their own state
- View renders based on controller state

## Documentation

### README Updates
- Update main README.md for major feature additions
- Keep feature list current
- Document new subjects or activities

### Test Documentation
- Update `tests/README.md` when adding new test suites
- Document test coverage for new features

## Troubleshooting

### Test Issues
- Ensure tests are in `tests/` directory
- Check `tests/setup.js` loads required files
- Use `test.only()` for debugging specific tests

### Navigation Issues
- Check navigation stack in AppController
- Ensure state preservation in navigate() method
- Test backspace navigation thoroughly

### Localization Issues
- Add all new strings to LocalizationModel
- Maintain consistency in naming conventions
- Test with Bulgarian locale

## Quick Reference

### File Structure
```
lumi/
├── index.html           # Main entry point
├── css/                 # Stylesheets
│   ├── base.css
│   └── themes/
├── js/                  # Application code
│   ├── app.js          # Entry point
│   ├── controllers/
│   ├── models/
│   │   ├── core/
│   │   └── subjects/
│   └── views/
├── tests/              # Test suite
└── docs/               # Documentation
```

### Key Commands
```bash
npm install             # Install dependencies
npm test               # Run tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
python3 -m http.server # Run local server
```

### Key Classes
- `LumiApp`: Application entry point
- `AppController`: Navigation and flow
- `AppView`: UI rendering
- `SubjectManager`: Subject registration
- `LocalizationModel`: Translations
- `MathModel`, `BulgarianLanguageModel`: Subject implementations

## Best Practices Summary

1. ✅ Follow MVC architecture strictly
2. ✅ Write tests for all new features
3. ✅ Keep code self-documenting
4. ✅ Maintain pure JavaScript (no external runtime dependencies)
5. ✅ Use existing patterns for consistency
6. ✅ Test on multiple Node.js versions (18.x, 20.x)
7. ✅ Keep the green monochrome theme
8. ✅ Design for kids (large buttons, clear feedback)
9. ✅ Support progressive difficulty levels
10. ✅ Ensure responsive design

## What NOT to Do

1. ❌ Don't remove or modify working tests
2. ❌ Don't modify files outside the project scope
3. ❌ Don't break existing functionality without good reason
4. ❌ Don't bypass testing requirements
5. ❌ Don't use deprecated JavaScript features
6. ❌ Don't ignore linting or test failures
7. ❌ Don't hardcode configuration values that should be environment-specific

## Questions?

For additional guidance, refer to:
- Main README: `/README.md`
- Test documentation: `/tests/README.md`
- Example implementations in `js/models/subjects/`

## Working with Copilot

### How to Get the Best Results

1. **Be Specific**: Clearly describe what you want to achieve
2. **Provide Context**: Reference existing files and patterns when relevant
3. **Ask for Tests**: Request test coverage for new features
4. **Request Reviews**: Ask Copilot to review changes before finalizing
5. **Iterate**: Start small, test frequently, and build incrementally

### Example Requests

**Good Examples:**
- "Add a new multiplication activity to MathModel following the addition pattern"
- "Create tests for the new multiplication activity covering levels 1-3"
- "Fix the navigation bug where back button doesn't preserve state"

**Avoid:**
- "Make the app better" (too vague)
- "Add all missing features" (too broad)
- "Fix everything" (unclear scope)

### When to Ask for Help

- **Complex Architecture Changes**: Discuss major refactoring before implementing
- **New Dependencies**: Justify why a new dependency is necessary
- **Breaking Changes**: Explain impact on existing functionality
- **Performance Issues**: Provide specific scenarios and measurements
