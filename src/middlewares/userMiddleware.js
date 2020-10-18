import store from '../store/index';

export default (to, from, next) => {
    const user = store.state.user;
    if (!user) {
        next('/auth/login');
    } else {
        next();
    }
}