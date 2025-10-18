# Lumi Test Suite

This directory contains comprehensive automated tests for the Lumi learning application.

## Test Framework

We use **Jest** as our testing framework with jsdom for browser environment simulation.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### 1. Math Operations Tests (`math-operations.test.js`)
Tests for mathematical operations and problem generation:
- **Addition Tests**: Validates single-digit and double-digit addition problems
- **Subtraction Tests**: Validates subtraction problems with non-negative results
- **Place Value Tests**: Validates place value recognition and calculation problems
- **State Management**: Tests score tracking, stats reset, and badge awards

**Coverage**: 13 tests covering all Math operations

### 2. Bulgarian Language Tests (`bulgarian-language.test.js`)
Tests for Bulgarian language learning activities:
- **Letters Activity**: Tests vowels, consonants, and all letters generation
- **Syllables Activity**: Tests simple, complex, and all syllables generation
- **Words Activity**: Tests 2-syllable, 3-syllable, and 4+ syllable words
- **Answer Validation**: Tests parent-controlled input (Enter = correct, Backspace = wrong)

**Coverage**: 13 tests covering all Bulgarian language activities

### 3. Navigation Tests (`navigation.test.js`)
Tests for navigation flow and state management:
- **Math Subject Navigation**: Tests navigation through Math subject activities
- **Bulgarian Subject Navigation**: Tests navigation through Bulgarian activities
- **Multi-Level Activities**: Tests level selection for activities with multiple levels
- **Back Navigation**: Tests backspace navigation works correctly from any screen
- **State Preservation**: Tests that state is maintained correctly after back navigation

**Coverage**: 12 tests covering all navigation scenarios

## Test Results

✅ **38/38 tests passing** (100% pass rate)

### What We Test

#### Navigation
- ✓ Backspace navigation works from game screen (both keyboard and mouse)
- ✓ Navigation stack is correctly maintained
- ✓ State preservation after navigating back and forth
- ✓ Switching between different subjects/operations

#### Math Operations
- ✓ Addition problems generate correct answers for all levels
- ✓ Subtraction problems generate correct answers (non-negative results)
- ✓ Place Value problems generate correct answers
- ✓ Score and problem counter increment correctly
- ✓ Badge award system works (every 5 correct answers)

#### Bulgarian Language Activities
- ✓ Letters activity generates valid vowels, consonants, and all letters
- ✓ Syllables activity generates valid syllables
- ✓ Words activity generates valid words
- ✓ Answer validation works (Enter = correct, Backspace handled separately)

## Test Setup

The test suite uses a custom setup file (`setup.js`) that:
1. Loads all JavaScript class files from the `js/` directory
2. Makes them available in the global scope for testing
3. Simulates a browser environment using jsdom

## Continuous Integration

Tests run automatically on:
- Every push to `main` or `develop` branches
- Every pull request to `main` or `develop` branches

See `.github/workflows/test.yml` for the CI configuration.

## Writing New Tests

When adding new features, follow these guidelines:

1. **Structure**: Group related tests in `describe` blocks
2. **Naming**: Use descriptive test names that explain what is being tested
3. **Assertions**: Use Jest's expect() with descriptive matchers
4. **Coverage**: Test both happy paths and edge cases

Example:
```javascript
describe('New Feature - SubFeature', () => {
    let model;

    beforeEach(() => {
        // Setup code
        model = new FeatureModel();
    });

    test('should do something correctly', () => {
        const result = model.doSomething();
        expect(result).toBe(expectedValue);
    });
});
```

## Debugging Tests

To debug a failing test:

1. Run the specific test file:
   ```bash
   npm test -- math-operations.test.js
   ```

2. Add console.log statements in your test or the code being tested

3. Use `test.only()` to run just one test:
   ```javascript
   test.only('specific test to debug', () => {
       // test code
   });
   ```

## Coverage Reports

Coverage reports are generated in the `coverage/` directory when running:
```bash
npm run test:coverage
```

Open `coverage/lcov-report/index.html` in a browser to view detailed coverage information.

## Troubleshooting

### Tests failing locally but passing in CI (or vice versa)
- Ensure you have the same Node.js version as CI (check package.json engines)
- Run `npm ci` instead of `npm install` to get exact dependency versions

### "Cannot find module" errors
- Make sure all test files are in the `tests/` directory
- Check that setup.js is loading all required files

### ReferenceError: Class is not defined
- Check that the class is being loaded in `tests/setup.js`
- Ensure the file path in setup.js is correct

## Future Enhancements

Planned improvements:
- [ ] Integration tests with Playwright for full UI testing
- [ ] Performance tests for problem generation
- [ ] Accessibility tests
- [ ] Visual regression tests
