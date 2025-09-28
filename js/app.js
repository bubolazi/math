// Application Entry Point - MVC Initialization with Operation Selection
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
        
        // Initialize operation manager
        const operationManager = new OperationManager();
        
        // Initialize controller with operation selection
        const controller = new MathController(localization, operationManager);
        
        // Store references for potential future use
        this.localization = localization;
        this.operationManager = operationManager;
        this.controller = controller;
        
        // Make app instance available globally for debugging
        window.mathApp = this;
        
        console.log('Math Practice App initialized with MVC architecture, Bulgarian localization, and operation selection');
    }
}

// Initialize the application
new MathApp();