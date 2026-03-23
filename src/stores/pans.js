import { defineStore } from 'pinia'

const clone = (obj) => JSON.parse(JSON.stringify(obj))

const defaultPans = [
  {
    label: 'Kleine Form',
    diameter: 16.5,
    height: 8.0,
    active: true,
  },
  {
    label: 'Große Form',
    diameter: 24.5,
    height: 8.0,
    active: false,
  },
]

export const usePansStore = defineStore('pans', {
  state: () => ({
    pans: [],
    selected: 0,
  }),
  getters: {
    selectedPan: (state) => state.pans[state.selected] || {},
    activePans: (state) => state.pans.filter((pan) => pan.active),
  },
  actions: {
    initialize() {
      const storageState = window.localStorage.getItem('vuex/pans')
      if (storageState) {
        try {
          const parsed = JSON.parse(storageState)
          this.pans = parsed.pans || []
          this.selected = parsed.selected || 0
        } catch {
          this.pans = clone(defaultPans)
          this.selected = 0
        }
      } else {
        this.pans = clone(defaultPans)
        this.selected = 0
      }

      this.$subscribe((mutation, state) => {
        window.localStorage.setItem(
          'vuex/pans',
          JSON.stringify({
            pans: state.pans,
            selected: state.selected,
          }),
        )
      })
    },
    add() {
      this.pans.push({
        label: 'Neue Form',
        diameter: 20.0,
        height: 8.0,
        active: false,
      })
    },
    remove(index) {
      this.pans.splice(index, 1)

      if (index < this.selected) {
        this.selected--
      }
      this.selected = Math.max(Math.min(this.selected, this.pans.length - 1), 0)
    },
    select(index) {
      this.selected = index
    },
    update({ index, key, value }) {
      this.pans[index][key] = value
    },
    toggle(index) {
      this.pans[index].active = !this.pans[index].active
    },
    reset() {
      this.pans = clone(defaultPans)
      this.selected = 0
    },
  },
})
