<template>
  <v-dialog
      persistent
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
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
      >
        <v-text-field
            v-model="name"
            :label="labels.name"
            :rules="nameRules"
            required
        />
        <v-text-field
            v-model="surname"
            :label="labels.surname"
            :rules="surnameRules"
            required

        />
        <v-select
            v-model="department"
            :items="availableDepartments"
            :rules="[v => !!v || 'Wybór działu jest wymagany']"
            required
            label="Dział"
            class="mt-2"
            chips
            outlined
        />

        <v-text-field
            v-model="salary"
            :label="labels.salary"
            :rules="salaryRules"
            required
            type="number" step="100" min="0"
        />
        <v-select
            v-model="currency"
            :items="availableCurrency"
            :rules="[v => !!v || 'Wybór waluty jest wymagany']"
            required
            label="Dział"
            class="mt-2"
            chips
            outlined
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="warning"
              text
              @click="toggleDialog"
          >
            Cofnij
          </v-btn>
          <v-btn
              class="success"
              text
              @click="validate()"
          >
            Dodaj
          </v-btn>
        </v-card-actions>
      </v-form>
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
    },
    availableCurrency: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    name: '',
    surname: '',
    department: '',
    salary: 2000,
    currency: 'PLN',
    labels: {
      name: 'Imię',
      surname: 'Nazwisko',
      department: 'Dział',
      salary: 'Wynagrodzenie',
      currency: 'Waluta'
    },
    valid: false,
    nameRules: [
      v => !!v || 'Imię jest wymagane',
      v => (v && v.length > 2) || 'Imię musi być dłuższe niż 2 znaki',
    ],
    surnameRules: [
      v => !!v || 'Nazwisko jest wymagane',
      v => (v && v.length > 2) || 'Nazwisko musi być dłuższe niż 2 znaki',
    ],
    salaryRules: [
      v => !!v || 'Wybór pensji jest wymagany',
      v => (v && v > 0) || 'Pensja nie może być niższa niż 0',
    ]
  }),
  methods: {
    clearUserForm() {
      this.name = ''
      this.surname = ''
      this.department = ''
      this.salary = 2000
      this.currency = 'PLN'
    },
    toggleDialog() {
      this.clearUserForm()
      this.$emit('toggle_dialog')
    },
    validate() {
      if (this.$refs.form.validate()) this.save()
    },
    save() {
      const newUser = {
        name: this.name,
        surname: this.surname,
        department: this.department,
        salary: this.salary,
        currency: this.currency
      }
      this.$emit('add_user', newUser)
      this.toggleDialog()
    }
  }
}
</script>
