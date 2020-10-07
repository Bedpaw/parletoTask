export const users = [
  {"imie": "Jan", "nazwisko": "Kowalski", "dzial": "IT", "wynagrodzenieKwota": "3000", "wynagrodzenieWaluta": "PLN"},
  {"imie": "Anna", "nazwisko": "Bąk", "dzial": "Administracja", "wynagrodzenieKwota": "2400.50", "wynagrodzenieWaluta": "PLN"},
  {"imie": "Paweł", "nazwisko": "Zabłocki", "dzial": "IT", "wynagrodzenieKwota": "3300", "wynagrodzenieWaluta": "PLN"},
  {"imie": "Tomasz", "nazwisko": "Osiecki", "dzial": "Administracja", "wynagrodzenieKwota": "2100", "wynagrodzenieWaluta": "PLN"},
  {"imie": "Iwona", "nazwisko": "Leihs-Gutowska", "dzial": "Handlowiec", "wynagrodzenieKwota": "3100", "wynagrodzenieWaluta": "PLN"},
]

export const tableHeaders = [
  {
    text: 'Imię',
    value: 'name',
    sortable: true,
    filterable: true
  },
  {
    text: 'Nazwisko',
    value: 'surname',
    sortable: true,
  },
  {
    text: 'Dział',
    value: 'department',
    sortable: true,
  },
  {
    text: 'Wynagrodzenie',
    value: 'salary',
    sortable: true,
  },
  {
    text: 'Waluta',
    value: 'currency',
    sortable: true
  },
]
