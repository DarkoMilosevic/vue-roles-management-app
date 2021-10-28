<template>
    <v-container>
        <h1 class="container__heading">User Roles Management</h1>

        <v-row dense>
			<v-col cols="9">
				<UserRolesFilter />
			</v-col>
			<v-col cols="3" class="d-flex align-end justify-end">
				<v-btn color="primary" to="/role-form/create">Create new role</v-btn>
			</v-col>
        </v-row>
        <UserRoleCard />
    </v-container>
</template>

<script>
import UserRolesFilter from '@/components/UserRolesFilter';
import UserRoleCard from '@/components/UserRoleCard';

export default {
    name: 'user-roles-dashboard',
    components: {
        UserRolesFilter,
        UserRoleCard
    }
};
</script>
