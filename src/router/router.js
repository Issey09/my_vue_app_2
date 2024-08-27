import { createRouter, createWebHistory } from 'vue-router';
// Предполагаем, что у вас есть компонент Home.vue в папке views
import About from "@/views/About.vue";
import Index from "@/views/Index.vue"
import Registration from "@/views/Registration.vue";
import Logining from "@/views/Logining.vue";
import Catalog from "@/views/Catalog.vue";
import Sneaker from "@/views/Sneaker.vue";


const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/reg',
        component: Registration
    },
    {
        path: '/log',
        component: Logining
    },
    {
        path: '/sneakers/all',
        component: Catalog
    },
    {
        path: '/sneaker/:id',
        component: Sneaker,
        name: 'SneakerDetails',
    }
    // Добавьте другие маршруты здесь
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
