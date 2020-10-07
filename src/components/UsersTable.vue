<template>
  <div>
    <v-card>
      <v-text-field
          v-model="search" label="Szukaj..."
          single-line clearable
          class="px-4"
          style="width: 200px"
      />
      <v-data-table
          :items="filteredUsers"
          :headers="headers"
          :search="search"
      >

        <template v-slot:top>
          <div class="d-flex justify-end mr-4">
            <add-user-dialog
                :available-departments="getAllDepartments"
                :dialog="dialog"
                @toggle_dialog="dialog = !dialog"
                @add_user="addUser"
            />
          </div>
        </template>

        <template v-slot:no-data>
          <p>Brak użytkowników spełniających podane kryteria</p>
        </template>
      </v-data-table>
    </v-card>

    <departments-salary-details
        :users="filteredUsers"/>

    <users-table-filters
        :users="getUsers"
        :available-departments="getAllDepartments"
        @users_filtered="getFilteredUsers"
    />
  </div>
</template>

<script>
import {tableHeaders} from "@/data/users";
import DepartmentsSalaryDetails from "@/components/DepartmentsSalaryDetails";
import UsersTableFilters from "@/components/UsersTableFilters";
import AddUserDialog from "@/components/AddUserDialog";
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "usersTable",
  components: {AddUserDialog, UsersTableFilters, DepartmentsSalaryDetails},
  data: () => ({
    filteredUsers: [],
    headers: tableHeaders,
    dialog: false,
    search: '',
  }),
  computed: {
    ...mapGetters(["getUsers", "getAllDepartments"])
  },
  methods: {
    ...mapMutations(["ADD_USER"]),
    getFilteredUsers(filteredUsers) {
      this.filteredUsers = filteredUsers
    },
    addUser(user) {
      this.ADD_USER(user)
      this.dialog = false
    },
  }
}

</script>

<style scoped>

</style>
