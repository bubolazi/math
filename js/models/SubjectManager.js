// Subject Manager - Manages available subjects (Math, Bulgarian Language, etc.)
class SubjectManager {
    constructor() {
        this.subjects = {
            'math': {
                key: 'MATH_SUBJECT',
                modelClass: 'MathModel',
                activityManagerClass: OperationManager,
                icon: '∑'
            },
            'bulgarian': {
                key: 'BULGARIAN_SUBJECT',
                modelClass: 'BulgarianLanguageModel',
                activityManagerClass: BulgarianActivityManager,
                icon: 'Аз'
            }
        };
    }
    
    // Get all available subjects
    getAvailableSubjects() {
        return this.subjects;
    }
    
    // Get subject by name
    getSubject(subjectName) {
        return this.subjects[subjectName];
    }
    
    // Get subject key for localization
    getSubjectKey(subjectName) {
        const subject = this.subjects[subjectName];
        return subject ? subject.key : null;
    }
    
    // Get subject icon
    getSubjectIcon(subjectName) {
        const subject = this.subjects[subjectName];
        return subject ? subject.icon : '?';
    }
    
    // Check if subject exists
    hasSubject(subjectName) {
        return this.subjects.hasOwnProperty(subjectName);
    }
    
    // Get activity manager for a subject
    getActivityManager(subjectName) {
        const subject = this.subjects[subjectName];
        return subject ? new subject.activityManagerClass() : null;
    }
}
