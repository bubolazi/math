class LumiApp {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeMVC());
        } else {
            this.initializeMVC();
        }
    }

    initializeMVC() {
        const locale = localStorage.getItem('lumi_locale') || 'bg';
        this.startApp(locale);
    }

    startApp(locale) {
        const localization = new LocalizationModel(locale);
        const userStorage = new UserStorageModel();
        const subjectManager = new SubjectManager();
        const controller = new AppController(localization, subjectManager, userStorage);

        this.localization = localization;
        this.userStorage = userStorage;
        this.subjectManager = subjectManager;
        this.controller = controller;

        window.lumiApp = this;

        console.log('Learning App initialized');
    }
}

new LumiApp();
