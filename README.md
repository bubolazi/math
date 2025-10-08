# Learning Practice for Kids

A beautiful, kid-friendly web application for preschool children to practice basic math operations. Features a green monochrome theme and progressive difficulty levels.

## Features

### 🎨 Green Monochrome Theme
- Beautiful gradient backgrounds
- Consistent green color palette
- Kid-friendly fonts and large buttons
- Responsive design for all devices

### 📚 Progressive Learning Levels
**Addition Practice:**
- **Level 1**: Single digits (1-9)
- **Level 2**: Double digits (10-19)  
- **Level 3**: Up to 20
- **Level 4**: Up to 50
- **Level 5**: Up to 100

### 🎉 Reward System
- Animated reward messages for correct answers
- Automatic progression to next problems
- Score tracking and problem counter
- Encouraging feedback messages

### 🚀 Easy to Extend
The application is built with a modular architecture that makes it easy to add:
- New math operations (subtraction, multiplication, division)
- Additional difficulty levels
- Different UI themes
- More reward types

## Getting Started

### Option 1: Direct File Access
Simply open `index.html` in any modern web browser.

### Option 2: Local Server
For the best experience, serve the files using a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
math/
├── index.html      # Main HTML structure
├── styles.css      # Green monochrome theme and responsive design
├── script.js       # Application logic and game mechanics
└── README.md       # This documentation
```

## Technical Details

- **Pure JavaScript**: No external dependencies
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessible**: Clean semantic HTML structure
- **Modular Code**: Easy to maintain and extend

## Future Enhancements

The application is designed to easily support:
- Subtraction operations
- Multiplication tables
- Division problems
- Different UI themes
- Sound effects
- Progress tracking
- Parent dashboard

## Browser Support

Compatible with all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
