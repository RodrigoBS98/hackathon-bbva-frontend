import userMiddleware from '../middlewares/userMiddleware';
import Home from '../views/Home';
export default {
    path: '/',
    component: Home,
    children: [{
            path: '/',
            name: 'stats-crud-page',
            component: () =>
                import ('../views/pages/Stats.vue'),
            beforeEnter: userMiddleware
        },
        {
            path: '/users',
            name: 'user-crud-page',
            component: () =>
                import ('../views/pages/Users.vue'),
            beforeEnter: userMiddleware
        },
        {
            path: '/roles',
            name: 'role-crud-page',
            component: () =>
                import ('../views/pages/Roles.vue'),
            beforeEnter: userMiddleware
        }
    ],
    meta: {
        autenticate: true
    },
}