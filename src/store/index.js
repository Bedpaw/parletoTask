import Vue from 'vue'
import Vuex from 'vuex'
import {users} from "@/data/users";

Vue.use(Vuex)

const translatedUsers = users.map(user => {
  return {
    name: user.imie,
    surname: user.nazwisko,
    department: user.dzial,
    salary: user.wynagrodzenieKwota,
    concurrency: user.wynagrodzenieWaluta
  }
})
const initialState = {
  users: translatedUsers
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    getUsers: (state) => state.users,
    getAllDepartments: (state) => [...new Set(state.users.map(user => user.department))]
  },
  mutations: {
    "ADD_USER": ((state, payload) => state.users.push(payload)
    )
  },
})
