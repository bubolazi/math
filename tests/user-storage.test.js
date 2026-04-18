const { describe, test, expect, beforeEach } = require('@jest/globals');

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

// Mock sessionStorage
const sessionStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();
Object.defineProperty(global, 'sessionStorage', { value: sessionStorageMock });

describe('User Storage - UserStorageModel', () => {
    let userStorage;

    beforeEach(() => {
        sessionStorage.clear();
        localStorage.clear();
        userStorage = new UserStorageModel();
    });

    describe('Local User Management', () => {
        test('should set local user', () => {
            const result = userStorage.setLocalUser('LocalUser');
            expect(result).toBe(true);
            expect(userStorage.getCurrentUser()).toBe('LocalUser');
        });

        test('should persist local user in localStorage', () => {
            userStorage.setLocalUser('LocalUser');
            const users = userStorage.getAllUsers();
            expect(users['LocalUser']).toBeDefined();
        });

        test('should add badge to local user', async () => {
            userStorage.setLocalUser('LocalUser');
            await userStorage.addBadge('LocalBadge', '⭐');
            const badges = await userStorage.getBadges();
            expect(badges.length).toBe(1);
            expect(badges[0].name).toBe('LocalBadge');
        });

        test('should return empty badges for local user with no badges', async () => {
            userStorage.setLocalUser('NewUser');
            const badges = await userStorage.getBadges();
            expect(badges).toEqual([]);
        });

        test('should persist user across sessions via sessionStorage', () => {
            userStorage.setLocalUser('PersistUser');
            const freshStorage = new UserStorageModel();
            expect(freshStorage.getCurrentUser()).toBe('PersistUser');
        });
    });

    describe('Logout', () => {
        test('should clear session on logout', () => {
            userStorage.setLocalUser('LocalUser');
            expect(userStorage.isAuthenticated()).toBe(true);

            userStorage.logout();
            expect(userStorage.getCurrentUser()).toBeNull();
            expect(userStorage.isAuthenticated()).toBe(false);
        });
    });

    describe('isAuthenticated', () => {
        test('should return false when no user', () => {
            expect(userStorage.isAuthenticated()).toBe(false);
        });

        test('should return true for local user', () => {
            userStorage.setLocalUser('LocalUser');
            expect(userStorage.isAuthenticated()).toBe(true);
        });
    });
});

