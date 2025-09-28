// Application Entry Point - MVC Initialization
class MathApp {
    constructor() {
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeMVC());
        } else {
            this.initializeMVC();
        }
    }
    
    initializeMVC() {
        // Initialize MVC components
        const model = new MathModel();
        const view = new MathView();
        const controller = new MathController(model, view);
        
        // Store references for potential future use
        this.model = model;
        this.view = view;
        this.controller = controller;
        
        console.log('Math Practice App initialized with MVC architecture');
    }
}

// Initialize the application
new MathApp();