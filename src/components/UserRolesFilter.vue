<template>
    <v-row dense>
        <v-col cols="6">
            <v-text-field
                hide-details
                label="Search..."
                v-model="searchFilter"
            >
                <v-icon slot="append"> mdi-magnify </v-icon>
            </v-text-field>
        </v-col>
        <v-col cols="6">
            <v-select
                hide-details
                :items="status"
                v-model="selected"
            ></v-select>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'user-roles-filter',
    data() {
        return {
            searchFilter: null,
            status: [
                {
                    text: 'Active and Inactive',
                    value: null
                },
                {
                    text: 'Active',
                    value: true
                },
                {
                    text: 'Inactive',
                    value: false
                }
            ],
            selected: null
        };
    },
    watch: {
        searchFilter() {
            this.$store.commit('userRolesFiltered', this.filteredRoles);
        },
        selected() {
            this.$store.commit('userRolesFiltered', this.selectedRoles);
        }
    },
    computed: {
        ...mapGetters(['userRoles']),

        filteredRoles() {
            return this.userRoles.filter((role) =>
                role.name
                    .toLowerCase()
                    .includes(this.searchFilter.toLowerCase())
            );
        },
        selectedRoles() {
            return this.userRoles.filter((role) => {
                return this.selected === true
                    ? role.active
                    : this.selected === false
                    ? !role.active
                    : role;
            });
        }
    },
};
</script>
