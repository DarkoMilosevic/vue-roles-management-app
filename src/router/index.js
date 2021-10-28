import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () =>
            import(
                /* webpackChunkName: "role-form" */ "../views/UserRolesDashboard.vue"
            )
    },
    {
        path: '/role-form/create',
        name: 'role-form-create',
        component: () =>
            import(
                /* webpackChunkName: "role-form" */ "../views/UserRoleForm.vue"
            )
    },
    {
        path: '/role-form/edit/:id',
        name: 'role-form-edit',
        component: () =>
            import(
                /* webpackChunkName: "role-form" */ "../views/UserRoleForm.vue"
            )
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
