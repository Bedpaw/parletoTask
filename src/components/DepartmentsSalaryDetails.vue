<template>
  <v-card class="d-flex flex-column align-center mt-8">
    <v-card-title class="mb-8">
      Podsumowanie wynagrodzeń
    </v-card-title>

    <v-card-subtitle>
      Całkowite wynagrodzenia
    </v-card-subtitle>
    <p>{{ salaryForAllDepartments | currency }}</p>

    <v-card-subtitle>
      Wynagrodzenia z podziałem na działy
    </v-card-subtitle>
    <v-card-text class="d-flex flex-column align-center">
      <p v-for="(department, index) in salaryByDepartments"
         :key="department.name + index">
        {{ department.name }} : {{ department.salary | currency }}
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
    currency: (value) => value + ' PLN'
  },
  computed: {
    groupByDepartments() {
      return arrayUtils.groupBy(this.users, 'dzial')
    },
    salaryByDepartments() {
      const salaryByDepartments = []

      for (const [key, value] of Object.entries(this.groupByDepartments)) {
        salaryByDepartments.push({
          name: key,
          salary: arrayUtils.sumByKey(value, 'wynagrodzenieKwota')
        })
      }
      return salaryByDepartments
    },
    salaryForAllDepartments() {
      return this.users
          .map(user => user.wynagrodzenieKwota)
          .reduce((total, curr) => total + parseFloat(curr), 0)
    },
  }
}
</script>

<style scoped>

</style>
