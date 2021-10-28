<template>
	<v-container>
		<h1 class="container__heading mb-5"><span v-if="!isUpdateMode">Create role</span> <span v-if="isUpdateMode">Edit role</span></h1>

		<v-form ref="form" @submit.prevent="submit">
			<v-card>
				<v-card-text>
					<v-row dense>
						<v-col cols="auto">
							<v-checkbox
								label="Active"
								v-model="item.active"
							></v-checkbox>
						</v-col>
						<v-col cols="auto">
							<v-checkbox
								label="Editable"
								v-model="item.editable"
							></v-checkbox>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="4">
							<v-text-field
								required
								outlined
								label="Name"
								v-model="item.name"
								:rules="[v => !!v || 'Item is required']"
							></v-text-field>
						</v-col>
						<v-col cols="4">
							<v-text-field
								required
								outlined
								label="Type"
								v-model="item.type"
								:rules="[v => !!v || 'Item is required']"
							></v-text-field>
						</v-col>
						<v-col cols="4">
							<v-menu
								v-model="fromDateMenu"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								max-width="290px"
								min-width="290px"
							>
								<template v-slot:activator="{ on }">
									<v-text-field
										outlined
										:disabled="isUpdateMode"
										label="From Date"
										readonly
										:value="item.created_on"
										v-on="on"
										required
										:rules="[v => !!v || 'Item is required']"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="item.created_on"
									no-title
									@input="fromDateMenu = false"
								></v-date-picker>
							</v-menu>
						</v-col>
					</v-row>
					<v-row dense>
						<v-col cols="12">
							<v-textarea
								required
								outlined
								label="Description"
								v-model="item.description"
								:rules="[v => !!v || 'Item is required']"
							></v-textarea>
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn type="submit" color="primary"><span v-if="!isUpdateMode">Create</span> <span v-if="isUpdateMode">Edit</span></v-btn>
					<v-btn @click.prevent="$router.go(-1)">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'user-role-form',
	data() {
		return {
			fromDateMenu: false,
			item: {
				name: null,
				type: null,
				description: null,
				created_on: null,
				editable: false,
				active: false
			}
		}
	},
	mounted() {
		if(this.isUpdateMode) {
			const item = this.userRoles.find(role => role.id === Number(this.itemId));

			this.item = item;
		}
	},
	computed: {
		...mapGetters(['userRoles']),
		itemId() {
			return this.$route.params.id;
		},
		isUpdateMode() {
			return this.itemId ? true : false;
		}
	},
	methods: {
		submit() {
			if (!this.$refs.form.validate()) {
				return;
			}

			if(this.isUpdateMode) {
				let item = this.item;
				let editedRole = this.userRoles.findIndex(item => item.id === Number(this.itemId));
				this.$store.dispatch('editRoleAction', { item, editedRole });
			} else {
				this.$store.commit('addNewRole', this.item);
			}
			this.$router.push({ name: 'dashboard' });
		}
	}
}
</script>