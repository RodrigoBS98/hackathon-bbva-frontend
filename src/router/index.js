import tokenMiddleware from '../middlewares/tokenMiddleware';
import VueRouter from 'vue-router'
import Vue from 'vue'
//Routes
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

Vue.use(VueRouter)

const routes = [
    authRoutes,
    userRoutes
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(tokenMiddleware);

export default router