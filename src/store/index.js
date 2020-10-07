import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const initialState = {
  users: [
    {"imie": "Jan", "nazwisko": "Kowalski", "dzial": "IT", "wynagrodzenieKwota": "3000", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Anna", "nazwisko": "Bąk", "dzial": "Administracja", "wynagrodzenieKwota": "2400.50", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Paweł", "nazwisko": "Zabłocki", "dzial": "IT", "wynagrodzenieKwota": "3300", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Tomasz", "nazwisko": "Osiecki", "dzial": "Administracja", "wynagrodzenieKwota": "2100", "wynagrodzenieWaluta": "PLN"},
    {"imie": "Iwona", "nazwisko": "Leihs-Gutowska", "dzial": "Handlowiec", "wynagrodzenieKwota": "3100", "wynagrodzenieWaluta": "PLN"},
  ]
}

export default new Vuex.Store({
  state: initialState,
  getters: {
    getUsers: (state) => state.users,
    getAllDepartments: (state) => [...new Set(state.users.map(user => user.dzial))]
  },
  mutations: {
    "ADD_USER": ((state, payload) => state.users.push(payload)
      )
  },
  actions: {
  },
  modules: {
  }
})
