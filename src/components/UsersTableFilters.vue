<template>
  <v-card>
    <v-card-title class="d-flex justify-center">
      Filtruj użytkowników
    </v-card-title>

    <v-card-actions class="flex-column">
      <div class="d-flex flex-column flex-md-row box-width align-center">
        <v-select
            v-model="chosenDepartments"
            :items="availableDepartments"
            :disabled="isDepartmentsFilterOn === false"
            label="Dział"
            chips multiple outlined
        />
        <v-btn @click="toggleDepartmentsFilter"
               class="my-4 ml-4 info"
        >
          {{ isDepartmentsFilterOn ? "Wyłącz" : "Włącz" }}
        </v-btn>
      </div>

      <div class="salary-filters-container flex-md-row box-width">
        <div class="d-flex justify-space-between">
          <v-text-field
              v-model="minSalary"
              :disabled="isSalaryFilterOn === false"
              label="Minimalne wynagrodzenie"
              type="number" step="50" min="0"
              class="salary-input-width"
          />
          <v-text-field
              v-model="maxSalary"
              :disabled="isSalaryFilterOn === false"
              label="Maksymalne wynagrodzenie"
              type="number" step="50" min="0"
              class="salary-input-width ml-6"
          />
        </div>
        <v-btn
            @click="toggleSalaryFilter"
            class="my-4 ml-4 info"
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
  data() {
    return {
      filters: [],
      isDepartmentsFilterOn: false,
      isSalaryFilterOn: false,
      chosenDepartments: [...this.availableDepartments],
      minSalary: 1000,
      maxSalary: 5000,
    }
  },
  created() {
    this.$emit('users_filtered', this.getFilteredUsers)
  },
  computed: {
    salaryFilter() {
      return (user) => this.minSalary <= parseFloat(user.salary) &&
          this.maxSalary >= parseFloat(user.salary)
    },
    departmentsFilter() {
      return (user) => this.chosenDepartments.includes(user.department)
    },
    getFilteredUsers() {
      return this.users
          .filter(user => this.filters
              .every(filter => filter(user)))
    }
  },
  watch: {
    getFilteredUsers() {
      this.$emit('users_filtered', this.getFilteredUsers)
    }
  },
  methods: {
    removeFilter(filter) {
      arrayUtils.remove(this.filters, filter)
    },
    toggleDepartmentsFilter() {
      if (this.isDepartmentsFilterOn) {
        this.isDepartmentsFilterOn = false
        this.removeFilter(this.departmentsFilter)
      } else {
        this.isDepartmentsFilterOn = true
        this.filters.push(this.departmentsFilter)
      }
    },
    toggleSalaryFilter() {
      if (this.isSalaryFilterOn) {
        this.isSalaryFilterOn = false
        this.removeFilter(this.salaryFilter)
      } else {
        this.isSalaryFilterOn = true
        this.filters.push(this.salaryFilter)
      }
    },
    cleanFilters() {
      this.isDepartmentsFilterOn = false
      this.isSalaryFilterOn = false
      this.filters = []
    },
  }
}
</script>

<style scoped>
.box-width {
  width: 60%;
}
.salary-input-width {
  max-width: 60%;
}
.salary-filters-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

</style>
