import { defineStore } from 'pinia';
import { authService } from '@/services/api';

const getStoredToken = () => localStorage.getItem('access_token');

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: getStoredToken(),
        isLoggedIn: !!getStoredToken(),
        authErrors: {},
        isLoading: false,
    }),
    actions: {
        async register(userData) {
            this.isLoading = true;
            this.authErrors = {}; 

            try {
                const response = await authService.register(userData);
                const { access_token } = response.data;
                this.setToken(access_token);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    this.authErrors = error.response.data.errors;
                } else {
                    this.authErrors = { generic: 'Registration fail. please try again' };
                }
                console.error('regustration fail:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
        async login(credentials) {
            this.isLoading = true;
            this.authErrors = {};

            try {
                const response = await authService.login(credentials);
                const { access_token } = response.data;
                this.setToken(access_token);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.authErrors = { login: 'Email or password incorrect.' };
                } else {
                    this.authErrors = { login: 'Error connexion. try again.' };
                }
                console.error('Erreur de connexion:', error);
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
        setToken(token) {
            localStorage.setItem('access_token', token);
            this.token = token;
            this.isLoggedIn = true;
        },
        clearAuthData() {
            localStorage.removeItem('access_token');
            this.token = null;
            this.user = null;
            this.isLoggedIn = false;
            this.authErrors = {};
        }
    }
});
