// Application Entry Point - MVC Initialization with Localization
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
        // Initialize localization (Bulgarian by default)
        const localization = new LocalizationModel('bg');
        
        // Initialize MVC components with localization
        const model = new MathModel(localization);
        const view = new MathView(localization);
        const controller = new MathController(model, view);
        
        // Store references for potential future use
        this.localization = localization;
        this.model = model;
        this.view = view;
        this.controller = controller;
        
        // Make app instance available globally for debugging
        window.mathApp = this;
        
        console.log('Math Practice App initialized with MVC architecture and Bulgarian localization');
    }
}

// Initialize the application
new MathApp();