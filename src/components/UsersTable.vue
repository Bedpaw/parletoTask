<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-text-field
              v-model="search" label="Szukaj..."
              single-line clearable
              class="px-4 search-field"
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

            <template v-slot:item.salary="{ item }">
              {{ parseFloat(item.salary).toFixed(2) }}
            </template>

            <template v-slot:no-data>
              <p>Brak użytkowników spełniających podane kryteria</p>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <users-table-filters
            :users="getUsers"
            :available-departments="getAllDepartments"
            @users_filtered="getFilteredUsers"
        />
      </v-col>
      <v-col cols="12" md="6">
        <departments-salary-details
            :users="filteredUsers"/>
      </v-col>
    </v-row>
  </v-container>
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
.search-field {
  width: 200px;
}

</style>
