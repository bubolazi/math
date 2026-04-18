const { describe, test, expect, beforeEach } = require('@jest/globals');

describe('User Storage - UserStorageModel', () => {
    let userStorage;

    beforeEach(() => {
        sessionStorage.clear();
        localStorage.clear();
        userStorage = new UserStorageModel();
    });

    describe('Username session management', () => {
        test('should set local user with username only', () => {
            const result = userStorage.setLocalUser('LocalUser');

            expect(result).toBe(true);
            expect(userStorage.getCurrentUser()).toBe('LocalUser');
            expect(sessionStorage.getItem('lumi_current_user')).toBe('LocalUser');
        });

        test('should trim username before storing', () => {
            userStorage.setLocalUser('  LocalUser  ');

            expect(userStorage.getCurrentUser()).toBe('LocalUser');
            expect(sessionStorage.getItem('lumi_current_user')).toBe('LocalUser');
        });

        test('should reject empty username', () => {
            expect(userStorage.setLocalUser('')).toBe(false);
            expect(userStorage.setLocalUser('   ')).toBe(false);
            expect(userStorage.getCurrentUser()).toBeNull();
        });

        test('should load current user from session storage', () => {
            sessionStorage.setItem('lumi_current_user', 'SavedUser');

            const reloadedStorage = new UserStorageModel();

            expect(reloadedStorage.getCurrentUser()).toBe('SavedUser');
        });

        test('should clear user on logout', () => {
            userStorage.setLocalUser('LocalUser');
            userStorage.logout();

            expect(userStorage.getCurrentUser()).toBeNull();
            expect(sessionStorage.getItem('lumi_current_user')).toBeNull();
        });
    });

    describe('Local badges', () => {
        test('should create local user record in localStorage', () => {
            userStorage.setLocalUser('LocalUser');

            const users = userStorage.getAllUsers();
            expect(users.LocalUser).toBeDefined();
            expect(users.LocalUser.badges).toEqual([]);
        });

        test('should add and return badges for current user', async () => {
            userStorage.setLocalUser('LocalUser');

            const added = await userStorage.addBadge('Math Star', '⭐');
            const badges = await userStorage.getBadges();

            expect(added).toBe(true);
            expect(badges).toHaveLength(1);
            expect(badges[0].name).toBe('Math Star');
            expect(badges[0].emoji).toBe('⭐');
        });

        test('should return false when adding badge without user', async () => {
            const result = await userStorage.addBadge('Math Star', '⭐');
            expect(result).toBe(false);
        });

        test('should normalize legacy string badges', async () => {
            localStorage.setItem('lumi_users', JSON.stringify({
                LocalUser: {
                    badges: ['Legacy Badge']
                }
            }));
            userStorage.setLocalUser('LocalUser');

            const badges = await userStorage.getBadges();
            expect(badges).toEqual([{ name: 'Legacy Badge', emoji: '', earnedAt: '' }]);
        });

        test('should return badge count', async () => {
            userStorage.setLocalUser('LocalUser');
            await userStorage.addBadge('Badge 1', '');
            await userStorage.addBadge('Badge 2', '');

            expect(await userStorage.getBadgeCount()).toBe(2);
        });
    });
});
