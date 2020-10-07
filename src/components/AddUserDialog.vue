<template>
  <v-dialog
      v-model="dialog"
      max-width="500px"
  >
    <template v-slot:activator="{ attrs }">
      <v-btn
          color="primary"
          dark class="mb-2"
          v-bind="attrs"
          @click="toggleDialog"
      >
        Dodaj użytkownika
      </v-btn>
    </template>
    <v-card class="d-flex flex-column align-center">
      <v-card-title>
        Dodaj nowego użytkownika
      </v-card-title>

      <v-text-field
          v-model="name"
          :label="labels.name"
          style="width: 50%"
      />
      <v-text-field
          v-model="surname"
          :label="labels.surname"
          style="width: 50%"
      />
      <v-select
          style="width:50%"
          v-model="department"
          :items="availableDepartments"
          chips
          label="Dział"
          outlined
      />

      <v-text-field
          v-model="salary"
          :label="labels.salary"
          type="number"
          step="100"
          style="width: 50%"
      />
      <v-text-field
          v-model="concurrency"
          :label="labels.concurrency"
          style="width: 50%"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="toggleDialog"
        >
          Cofnij
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
          Dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddUserDialog",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    availableDepartments: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    name: '',
    surname: '',
    department: '',
    salary: 2000,
    concurrency: 'PLN',
    labels: {
      name: 'Imię',
      surname: 'Nazwisko',
      department: 'Dział',
      salary: 'Wynagrodzenie',
      concurrency: 'Waluta'
    }
  }),
  methods: {
    clearUserForm() {
      this.name = ''
      this.surname = ''
      this.department = ''
      this.salary = 2000
      this.concurrency = 'PLN'
    },
    toggleDialog() {
      this.$emit('toggle_dialog')
    },
    save() {
      const newUser = {
          name: this.name,
          surname: this.surname,
          department: this.department,
          salary: this.salary,
          concurrency: this.concurrency
        }
      this.$emit('add_user', newUser)
      this.clearUserForm()
    }
  }
}
</script>

<style scoped>

</style>
