// Bulgarian Activity Manager - Manages available Bulgarian language activities
class BulgarianActivityManager {
    constructor() {
        this.activities = {
            'letters': {
                key: 'LETTERS',
                extensionClass: LettersActivity,
                icon: 'А'
            },
            'syllables': {
                key: 'SYLLABLES',
                extensionClass: SyllablesActivity,
                icon: 'БА'
            },
            'words': {
                key: 'WORDS',
                extensionClass: WordsActivity,
                icon: 'МА-МА'
            }
        };
    }
    
    // Get all available activities
    getAvailableOperations() {
        return this.activities;
    }
    
    // Get activity extension by name
    getOperationExtension(activityName) {
        const activity = this.activities[activityName];
        return activity ? activity.extensionClass : null;
    }
    
    // Get activity key for localization
    getOperationKey(activityName) {
        const activity = this.activities[activityName];
        return activity ? activity.key : null;
    }
    
    // Get activity icon
    getOperationIcon(activityName) {
        const activity = this.activities[activityName];
        return activity ? activity.icon : '?';
    }
    
    // Check if activity exists
    hasOperation(activityName) {
        return this.activities.hasOwnProperty(activityName);
    }
}
