<template>
  <v-card class="mt-6">
    <v-card-title class="d-flex justify-center">
      Filtruj użytkowników
    </v-card-title>

    <v-card-actions class="flex-column">
      <div class="d-flex ">
        <v-select
            @change="emitFilteredUsers()"
            v-model="chosenDepartments"
            :items="availableDepartments"
            :disabled="!isDepartmentsFilterOn"
            label="Dział"
            style="width:60%"
            chips multiple outlined
        />
        <v-btn @click="toggleDepartmentsFilter"
               class="my-4 info"
               >
          {{isDepartmentsFilterOn ? "Wyłącz" : "Włącz"}}
        </v-btn>
      </div>

      <div class="d-flex justify-space-between" style="width:60%">
        <v-text-field
            @keyup="emitFilteredUsers()"
            v-model="minSalary"
            :disabled="!isSalaryFilterOn"
            label="Minimalne wynagrodzenie"
            type="number" step="50" minSalary="0"
        />
        <v-text-field
            @keyup="emitFilteredUsers()"
            v-model="maxSalary"
            :disabled="!isSalaryFilterOn"
            label="Maksymalne wynagrodzenie"
            type="number" step="50" minSalary="0"
        />
        <v-btn
            @click="toggleSalaryFilter"
            class="my-4 info"
        >
          {{ isSalaryFilterOn ? "Wyłącz" : "Włącz" }}
        </v-btn>
      </div>

      <v-btn
          @click="cleanFilters()"
          class="my-4 warning"
      >
        Wyczyść wszystkie filtry
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {arrayUtils} from "@/utils/array-utils";

export default {
  name: "UsersTableFilters",
  props: {
    users: {
      type: Array,
      required: true,
    },
    availableDepartments: {
      type: Array,
      required: true,
    }
  },
  data: function() {
    return {
      filters: [],
      isDepartmentsFilterOn: false,
      isSalaryFilterOn: false,
      chosenDepartments: [...this.availableDepartments],
      minSalary: 1000,
      maxSalary: 5000,
    }},
  created() {
    this.emitFilteredUsers()
  },
  computed: {
    salaryFilter() {
      return (user) => this.minSalary <= parseFloat(user.wynagrodzenieKwota) &&
          this.maxSalary >= parseFloat(user.wynagrodzenieKwota)
    },
    getFilteredUsers() {
      return this.users
          .filter(user => this.filters
              .every(filter => filter(user)))
    }
  },
  watch: {
    users: function () {
      this.emitFilteredUsers()
    },
  },
  methods: {
    toggleDepartmentsFilter() {
      if(this.isDepartmentsFilterOn) {
        this.isDepartmentsFilterOn = false
        arrayUtils.remove(this.filters, this.departmentsFilter)
      } else {
        this.isDepartmentsFilterOn = true
        this.filters.push(this.departmentsFilter)
      }

      this.emitFilteredUsers()
    },
    toggleSalaryFilter() {
      if(this.isSalaryFilterOn) {
        this.isSalaryFilterOn = false
        arrayUtils.remove(this.filters, this.salaryFilter)
      } else {
        this.isSalaryFilterOn = true
        this.filters.push(this.salaryFilter)
      }

      this.emitFilteredUsers()
    },

    emitFilteredUsers() {
      this.$emit('users_filtered', this.getFilteredUsers)
      },
    departmentsFilter(user) {
      return this.chosenDepartments.includes(user.dzial)
    },
    cleanFilters() {
      this.isDepartmentsFilterOn = false
      this.isSalaryFilterOn = false
      this.filters = []
      this.emitFilteredUsers()
    },
  }
}
</script>

<style scoped>

</style>
