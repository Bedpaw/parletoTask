<template>
  <v-card class="d-flex flex-column align-center">
    <v-card-title class="mb-8">
      Podsumowanie wynagrodzeń
    </v-card-title>

    <v-card-subtitle>
      Całkowite wynagrodzenia
    </v-card-subtitle>
    <v-card-text class="d-flex justify-center font-weight-bold">
      {{ salaryForAllDepartments | toFixed2 | currency }}
    </v-card-text>

    <v-card-subtitle>
      Wynagrodzenia z podziałem na działy
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column align-center">
      <p v-for="(department, index) in salaryByDepartments"
         :key="department.name + index">
        {{ department.name }} : {{ department.salary |toFixed2 | currency }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import {arrayUtils} from "@/utils/array-utils";

export default {
  name: "DepartmentsSalaryDetails",
  props: {
    users: {
      type: Array,
      required: true,
    }
  },
  filters: {
    currency: (value) => value + ' PLN',
    toFixed2: (value) => value.toFixed(2)
  },
  computed: {
    groupByDepartments() {
      return arrayUtils.groupBy(this.users, 'department')
    },
    salaryByDepartments() {
      const salaryByDepartments = []

      for (const [key, value] of Object.entries(this.groupByDepartments)) {
        salaryByDepartments.push({
          name: key,
          salary: arrayUtils.sumByKey(value, 'salary')
        })
      }
      return salaryByDepartments
    },
    salaryForAllDepartments() {
      return this.users
          .map(user => user.salary)
          .reduce((total, curr) => total + parseFloat(curr), 0)
    },
  }
}
</script>

<style scoped>

</style>
