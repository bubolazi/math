# MVC Architecture Documentation

## Overview

The Math Practice App is built using the Model-View-Controller (MVC) architectural pattern, providing clear separation of concerns and easy extensibility.

## Directory Structure

```
math/
├── css/
│   ├── base.css                 # Theme-independent base styles
│   └── themes/
│       ├── terminal-green.css   # Default terminal theme
│       └── retro-amber.css      # Alternative amber theme
├── js/
│   ├── models/
│   │   ├── MathModel.js         # Core data and business logic
│   │   └── extensions/
│   │       └── SubtractionLevels.js  # Example extension
│   ├── views/
│   │   └── AppView.js           # UI rendering and DOM manipulation
│   ├── controllers/
│   │   └── AppController.js     # Coordinates Model and View
│   └── app.js                   # Application entry point
├── docs/
│   └── MVC-ARCHITECTURE.md      # This documentation
└── index.html                   # Main HTML structure
```

## Components

### Model (`js/models/MathModel.js`)
**Responsibility**: Data management and business logic
- Stores game state (level, score, problems)
- Generates math problems
- Validates answers
- Manages level configurations
- Contains reward messages

**Key Methods**:
- `generateProblem()` - Creates new math problems
- `checkAnswer(userAnswer)` - Validates user input
- `updateScore()` - Updates game statistics
- `getGameState()` - Returns current state

### View (`js/views/AppView.js`)
**Responsibility**: UI rendering and DOM manipulation
- Manages screen transitions
- Displays problems and feedback
- Handles input focus and cursor
- Renders level lists dynamically
- Shows/hides messages

**Key Methods**:
- `showScreen(screenId)` - Switches between screens
- `displayProblem(problem)` - Shows math problems
- `updateGameStatus(gameState)` - Updates UI elements
- `showMessage(message)` - Displays feedback

### Controller (`js/controllers/AppController.js`)
**Responsibility**: Coordinates Model and View
- Handles user interactions
- Manages application flow
- Connects Model data to View rendering
- Processes user input

**Key Methods**:
- `startLevel(level, operation)` - Initiates new level
- `checkAnswer()` - Processes user answers
- `generateNewProblem()` - Creates and displays problems

## Easy Theme Switching

### Creating a New Theme

1. Create a new CSS file in `css/themes/`
2. Define theme-specific colors and fonts
3. Use the same CSS class structure as existing themes
4. Update the HTML to reference the new theme:

```html
<!-- Change this line in index.html -->
<link rel="stylesheet" href="css/themes/your-new-theme.css">
```

### Theme Structure
- **Base styles** (`css/base.css`): Layout, structure, positioning
- **Theme styles** (`css/themes/*.css`): Colors, fonts, visual effects

### Example Themes
- `terminal-green.css` - Classic green monochrome terminal
- `retro-amber.css` - Amber/orange retro computer style

## Adding New Levels and Operations

### Adding New Levels to Existing Operations

1. Edit `js/models/MathModel.js`
2. Add new level to the `levels` object:

```javascript
this.levels = {
    // existing levels...
    6: { min: 1, max: 500, description: 'UP TO 500' }
};
```

### Adding New Operations (e.g., Subtraction)

1. Create extension file: `js/models/extensions/SubtractionLevels.js`
2. Extend the MathModel in the constructor:

```javascript
// In MathModel constructor
this.operations = {
    addition: this.levels,
    subtraction: SubtractionLevels.getLevels()
};
```

3. Update `generateProblem()` method to handle new operation
4. Add operation selection to the UI

### Extension Example

See `js/models/extensions/SubtractionLevels.js` for a complete example of adding subtraction operations.

## Benefits of MVC Architecture

### 1. **Separation of Concerns**
- Model: Pure data and logic
- View: Pure presentation
- Controller: Coordination only

### 2. **Easy Theme Switching**
- Swap CSS files without touching JavaScript
- Multiple themes can coexist
- Theme-independent base structure

### 3. **Simple Level Addition**
- Add levels without changing UI code
- Extend operations through separate files
- Configuration-driven approach

### 4. **Maintainability**
- Clear responsibility boundaries
- Easy to debug and test
- Modular code organization

### 5. **Extensibility**
- New operations through extensions
- Theme plugins
- Feature additions don't affect core code

## Usage Examples

### Switching Themes
```html
<!-- Terminal Green Theme -->
<link rel="stylesheet" href="css/themes/terminal-green.css">

<!-- Retro Amber Theme -->
<link rel="stylesheet" href="css/themes/retro-amber.css">
```

### Adding a Level
```javascript
// In MathModel.js
this.levels = {
    // existing levels...
    6: { min: 1, max: 1000, description: 'UP TO 1000' }
};
```

### Creating a New Operation
```javascript
// Create new file: js/models/extensions/MultiplicationLevels.js
class MultiplicationLevels {
    static getLevels() {
        return {
            1: { min: 1, max: 5, description: 'MULTIPLICATION: TABLES 1-5' }
        };
    }
    
    static generateProblem(level) {
        // Implementation here
    }
}
```

This architecture ensures the application remains maintainable, extensible, and easy to customize while preserving the core functionality.