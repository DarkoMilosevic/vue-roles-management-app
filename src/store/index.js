import Vue from 'vue';
import Vuex from 'vuex';
import user_roles from '@/assets/user_roles.json';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user_roles,
        filtered: user_roles,
    },
    mutations: {
        userRolesFiltered(state, nv) {
            state.filtered = nv;
        },
        addNewRole(state, nv) {
            state.user_roles.push(nv);
        },
        editRole: (state, editedItem) => {
            state.filtered.splice(editedItem.index, editedItem.item);
        }
    },
    getters: {
        userRoles: (state) => {
            return state.user_roles;
        },
        filteredUserRoles: (state) => {
            return state.filtered;
        }
    },
    actions: {
        editRoleAction(state, val) {
            state.commit('editRole', val)
        }
    }
});
