import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './store'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('user-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

store.dispatch('initializeStore').then(() => {
    createApp(App).use(store).use(router).mount('#app');
});