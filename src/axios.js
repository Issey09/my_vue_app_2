import axios from 'axios';

// Настраиваем базовый URL для всех запросов
axios.defaults.baseURL = 'http://188.68.223.224:8081'; // Установите базовый URL для API

// Добавляем интерсептор на запросы
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Или получить токен из другого источника

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// Экспортируем настроенный экземпляр axios
export default axios;


