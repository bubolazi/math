class UserStorageModel {
    constructor() {
        this.currentUser = null;

        this.USERS_KEY = 'lumi_users';
        this.CURRENT_USER_KEY = 'lumi_current_user';

        this.loadUserFromSession();
    }

    loadUserFromSession() {
        const localUser = sessionStorage.getItem(this.CURRENT_USER_KEY);
        if (localUser) {
            this.currentUser = { displayName: localUser };
        }
    }

    getCurrentUser() {
        if (!this.currentUser) return null;
        return this.currentUser.displayName || 'User';
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getAllUsers() {
        const usersData = localStorage.getItem(this.USERS_KEY);
        if (!usersData) return {};
        try {
            return JSON.parse(usersData);
        } catch (e) {
            return {};
        }
    }

    saveAllUsers(users) {
        try {
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            return true;
        } catch (e) {
            return false;
        }
    }

    setLocalUser(username) {
        if (!username || username.trim() === '') return false;
        const trimmedUsername = username.trim();

        sessionStorage.setItem(this.CURRENT_USER_KEY, trimmedUsername);
        this.currentUser = { displayName: trimmedUsername };

        const users = this.getAllUsers();
        if (!users[trimmedUsername]) {
            users[trimmedUsername] = {
                badges: [],
                createdAt: new Date().toISOString()
            };
            this.saveAllUsers(users);
        }

        return true;
    }

    logout() {
        sessionStorage.removeItem(this.CURRENT_USER_KEY);
        this.currentUser = null;
    }

    async addBadge(badgeName, badgeEmoji = '') {
        if (!this.currentUser) return false;

        const username = this.currentUser.displayName;
        const users = this.getAllUsers();

        if (!users[username]) {
            this.setLocalUser(username);
            return this.addBadge(badgeName, badgeEmoji);
        }

        if (!users[username].badges) {
            users[username].badges = [];
        }

        users[username].badges.push({
            name: badgeName,
            emoji: badgeEmoji,
            earnedAt: new Date().toISOString()
        });

        return this.saveAllUsers(users);
    }

    async getBadges() {
        if (!this.currentUser) return [];

        const username = this.currentUser.displayName;
        const users = this.getAllUsers();
        const userData = users[username];

        if (!userData || !userData.badges) {
            return [];
        }

        return userData.badges.map(badge => {
            if (typeof badge === 'string') {
                return { name: badge, emoji: '', earnedAt: '' };
            }
            return badge;
        });
    }

    async getBadgeCount() {
        const badges = await this.getBadges();
        return badges.length;
    }
}
