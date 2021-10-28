<template>
    <v-row class="row-cards" align="stretch">
        <v-col
            cols="4"
            v-for="(userRole, key) in filteredUserRoles"
            :key="key"
            class="d-flex"
        >
            <v-card class="user-role-card">
                <div class="user-role-card__inactive">
                    <v-btn
                        small
                        v-if="!userRole.editable && !userRole.active"
                        color="error"
                    >
                        INACTIVE
                    </v-btn>
                </div>
                <v-card-title>{{ userRole.name }}</v-card-title>
                <v-card-subtitle>{{ userRole.type }}</v-card-subtitle>
                <v-card-text>
                    <p>{{ userRole.description }}</p>
                    <span class="d-flex">
                        <v-img
                            class="rounded-circle"
                            v-for="(img, key) in userRole.users"
                            :key="key"
                            :src="img.photo_url"
                            alt="img"
                            max-width="50px"
                        />
                    </span>
                </v-card-text>
                <v-card-actions class="actions-footer pt-4 pb-4">
                    <v-row dense>
                        <v-col cols="6" class="d-flex align-center">
                            <span class="actions-footer__text"
                                >Last update:
                                {{ userRole.created_on | dateFilter }}</span
                            >
                        </v-col>
                        <v-col cols="6" class="d-flex justify-end">
                            <v-btn
                                text
                                v-if="userRole.editable"
                                :to="`/role-form/edit/${userRole.id}`"
                            >
                                Edit
                            </v-btn>
                            <v-btn text @click.prevent="deleteRole(key)" v-if="userRole.editable" color="error">
                                Delete
                            </v-btn>
                            <v-col
                                cols="6"
                                v-if="!userRole.active"
                                class="d-flex justify-end"
                            >
                                <v-icon>mdi-lock</v-icon>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'user-role-card',
    computed: {
        ...mapGetters(['filteredUserRoles'])
    },
    methods: {
        deleteRole(index) {
            this.filteredUserRoles.splice(index, 1)
        }
    },
    filters: {
        dateFilter(v) {
            let date = new Date(v);
            return (
                date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.user-role-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__inactive {
        display: flex;
        justify-content: flex-end;
        margin: 1rem 1rem;
    }
}
.actions-footer {
    background-color: #fcfcfc;
    &__text {
        color: #b1b1b1;
        font-size: 0.75rem;
    }
}
</style>
